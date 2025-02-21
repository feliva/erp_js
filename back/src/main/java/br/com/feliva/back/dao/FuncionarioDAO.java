package br.com.feliva.back.dao;

import br.com.feliva.back.interfaces.ComunDAO;
import br.com.feliva.back.models.Contato;
import br.com.feliva.back.models.Funcionario;
import br.com.feliva.back.util.FormFilter;
import br.com.feliva.back.util.primeng.FilterMetaData;
import br.com.feliva.back.util.primeng.LazyConsultConfig;
import br.com.feliva.back.util.primeng.MatchMode;
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
public class FuncionarioDAO extends DAO<Funcionario> implements ComunDAO<Funcionario> {

    static final Map<String, LazyConsultConfig> lCConfigs = new HashMap<String, LazyConsultConfig>();

    static {
        lCConfigs.put("email", new LazyConsultConfig("", "f.email","f.nome"));
        lCConfigs.put("id", new LazyConsultConfig("", "f.idFuncionario","fidFuncionario", MatchMode.idInteger));
        lCConfigs.put("nome", new LazyConsultConfig("", "p.nome","p.nome", MatchMode.contains));
        lCConfigs.put("cidade", new LazyConsultConfig("", "ci.idCidade","ci.idCidade", MatchMode.idInteger));
    }


    public Funcionario findById(Integer id) {
        try {
            String hql = """
                    select f from Funcionario f
                    left join fetch f.pessoa p
                     where f.idFuncionario = :id
                    """;

            return (Funcionario) this.em.createQuery(hql).setParameter("id", id).getSingleResult();
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
    public List<Funcionario> tableLazyLoad(TableLazyLoadEvent event) {
        try {
            final StringBuffer hql = new StringBuffer("select f from Funcionario f ");
//            hql.append("left join fetch f.endereco e ")
//                    .append("left join fetch e.cidade ci ")
//                    .append("left join fetch ci.estado es ");
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


    public List<Funcionario> listAll() {
        try {
            return this.em.createQuery("""
                        select f from Funcionario f 
                    """).getResultList();
        } catch (NoResultException e) {
            return null;
        }
    }

    public List<Funcionario> formFilter(FormFilter formFilter){
        final StringBuffer hql = new StringBuffer("""
                select f from Funcionario f 
                left join fetch f.pessoa p """);
        final StringBuffer where = new StringBuffer();


        formFilter.getListFilter().forEach((k,v)->{
            if(v != null && !v.isEmpty()) {
                LazyConsultConfig filter = this.lCConfigs.get(k);
                if (filter != null) {
                    where.append(filter.getWhere());
                    where.append(filter.getMatchMode().getTypeOperador());
                    where.append(" :" + k);
                    where.append(" and ");
                    formFilter.getListParans().put(k , filter.getMatchMode().converte(v));
                }
            }
        });
        if(!where.isEmpty()) {
            where.delete(where.length() - 5, where.length());//retira o ultimo and
            hql.append(" where ").append(where);
        }

        Query query = this.em.createQuery(hql.toString());

        formFilter.getListParans().forEach((k, v) -> {
            query.setParameter(k, v);
        });

        if (formFilter.getFirst() != null) {
            query.setFirstResult(formFilter.getFirst()).setMaxResults(formFilter.getRows());
        }

        return query.getResultList();
    }
}