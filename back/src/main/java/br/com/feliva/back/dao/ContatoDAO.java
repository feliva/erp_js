package br.com.feliva.back.dao;

import br.com.feliva.back.interfaces.ComunDAO;
import br.com.feliva.back.models.Contato;
import br.com.feliva.back.util.primeng.FilterMetaData;
import br.com.feliva.back.util.primeng.LazyConsultConfig;
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
public class ContatoDAO extends DAO<Contato> implements ComunDAO<Contato> {

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

    public List<Contato> findByNome(String nome) {
        try {
            String hql = """
                    select c from Contato c where c.nome ilike :nome order by c.nome asc
                    """;
            Query query = this.em.createQuery(hql);
            query.setParameter("nome", "%" + nome + "%");
            return (List<Contato>) query.getResultList();
        }catch (Exception e){
            System.out.println(e.getMessage());
        }

        return null;
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

            hql.append(this.geraOrderBy(event,lCConfigs));

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
            List<Contato> l = query.getResultList();
            return l;
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

//    private Map<String, String> criaQueryPaginando(StringBuffer hql, Map<String, Object> filter) {
//        Map<String, String> paramMap = new HashMap<>();
//
//        StringBuffer join = new StringBuffer("");
//        StringBuffer whereClause = new StringBuffer("and ");
//        String w = "";
//
//        String string = (String) filter.get("nome");
//
//        if (string != null && !string.isEmpty()) {
//            whereClause.append("and c.nome like :nome ");
//            paramMap.put("nome", string + "%");
//        }
//        //proximo
//
//        if (!paramMap.isEmpty()) {
//            w = "where " + whereClause.delete(0, 3).toString();
//        }
//
//
//        hql.append(join).append(w).append(" order by c.nome");
//        return paramMap;
//    }
}