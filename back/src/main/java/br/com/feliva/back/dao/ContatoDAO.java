package br.com.feliva.back.dao;

import br.com.feliva.back.interfaces.ComunDAO;
import br.com.feliva.back.interfaces.PaginadoDAO;
import br.com.feliva.back.models.Contato;
import br.com.feliva.back.util.primeng.FilterMetaData;
import br.com.feliva.back.util.primeng.LazyConsultConfig;
import br.com.feliva.back.util.primeng.SortMeta;
import br.com.feliva.back.util.primeng.TableLazyLoadEvent;
import br.com.feliva.sharedClass.db.DAO;
import jakarta.enterprise.context.RequestScoped;
import jakarta.enterprise.inject.Default;
import jakarta.persistence.NoResultException;
import jakarta.persistence.Query;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

@SuppressWarnings("all")
@RequestScoped
@Default
public class ContatoDAO extends DAO<Contato> implements ComunDAO<Contato>, PaginadoDAO<Contato> {

    static final Map<String, LazyConsultConfig> lCConfigs = new HashMap<String, LazyConsultConfig>();

    static {
        lCConfigs.put("email", new LazyConsultConfig("", "c.email","c.nome"));
        lCConfigs.put("id", new LazyConsultConfig("", "c.idContato","c.idContato"));
        lCConfigs.put("nome", new LazyConsultConfig("", "c.nome","c.nome"));
        lCConfigs.put("cidade", new LazyConsultConfig("", "ci.nome","ci.nome"));

    }


    public Contato findById(Integer id) {
        try {
            String hql = """
                    select c from Contato c
                    left join fetch c.endereco e
                     left join fetch e.cidade ci
                     left join fetch ci.estado es
                     where c.idContato = :idContato
                    """;

            return (Contato) this.em.createQuery(hql).setParameter("idContato", id).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    public String geraOrderBy(TableLazyLoadEvent event){
        StringBuffer orderBy = new StringBuffer(" order by ");

        if(event.getMultiSortMeta() == null){
            LazyConsultConfig lcc = lCConfigs.get(event.getSortField());
            orderBy.append(lcc.getOrderBy());
            orderBy.append(event.getSortOrderDesc());
            return orderBy.toString();
        }

        for(SortMeta sort : event.getMultiSortMeta()){
            LazyConsultConfig lcc = lCConfigs.get(sort.getField());

            if(lcc != null){
                orderBy.append(lcc.getOrderBy());
                orderBy.append(sort.getOrderDesc());
                orderBy.append(", ");
            }
        }

        return orderBy.toString().substring(0, orderBy.length()-2);
    }

    @Override
    public List<Contato> tableLazyLoad(TableLazyLoadEvent event) {
        try {
            final StringBuffer hql = new StringBuffer("select c from Contato c ");
            hql.append("left join fetch c.endereco e ")
                    .append("left join fetch e.cidade ci ")
                    .append("left join fetch ci.estado es ");
            final StringBuffer where = new StringBuffer();

            final AtomicInteger seq = new AtomicInteger();

            event.getFilters().forEach((String key, List list) -> {
                LazyConsultConfig tj = lCConfigs.get(key);
                if (tj != null) {
                    list.forEach(o -> {
                        FilterMetaData fd = (FilterMetaData) o;
                        if (!where.isEmpty()) {
                            where.append(fd.getOperator().getOperador());
                        }

                        fd.geraPSName(seq.get());
                        where.append(tj.getWhere() + fd.getMatchMode().getTypeOperador() + ":" + fd.getPsName());
                    });
                }
            });

            if (!where.isEmpty()) {
                hql.append(" where ");
                hql.append(where);
            }

            hql.append(this.geraOrderBy(event));

            Query query = this.em.createQuery(hql.toString());

            event.getFilters().forEach((String key, List value) -> {
                LazyConsultConfig tj = lCConfigs.get(key);
                if (tj != null) {
                    value.forEach(o -> {
                        FilterMetaData fd = (FilterMetaData) o;
                        query.setParameter(fd.getPsName(), fd.geraValor());
                    });
                }
            });

            if (event.getFirst() != null) {
                query.setFirstResult(event.getFirst()).setMaxResults(event.getRows());
            }

            return query.getResultList();
        } catch (NoResultException e) {
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Integer tableLazyLoadCount(TableLazyLoadEvent filters) {
        return this.tableLazyLoad(filters).size();
    }


    public List<Contato> listAll() {
        try {
            return this.em.createQuery("""
                        select c from Contato c order by c.nome
                    """).getResultList();
        } catch (NoResultException e) {
            return null;
        }
    }

    private Map<String, String> criaQueryPaginando(StringBuffer hql, Map<String, Object> filter) {
        Map<String, String> paramMap = new HashMap<>();

        StringBuffer join = new StringBuffer("");
        StringBuffer whereClause = new StringBuffer("and ");
        String w = "";

        String string = (String) filter.get("nome");

        if (string != null && !string.isEmpty()) {
            whereClause.append("and c.nome like :nome ");
            paramMap.put("nome", string + "%");
        }
        //proximo

        if (!paramMap.isEmpty()) {
            w = "where " + whereClause.delete(0, 3).toString();
        }


        hql.append(join).append(w).append(" order by c.nome");
        return paramMap;
    }

    public List<Contato> listPaginado(Integer first, Integer rows, Map<String, Object> filter) {
        try {
            StringBuffer hql = new StringBuffer("select c from Contato c ");
            Map<String, String> paramMap = this.criaQueryPaginando(hql, filter);

            Query query = this.em.createQuery(hql.toString());
            if (first != null) {
                query.setFirstResult(first).setMaxResults(rows);
            }

            paramMap.forEach((s, s2) -> {
                query.setParameter(s, s2);
            });

            return query.getResultList();
        } catch (NoResultException e) {
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public Integer paginadoCount(Integer first, Integer rows, Map<String, Object> filter) {
        try {
            return this.listPaginado(null, null, filter).size();
        } catch (NoResultException e) {
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

}