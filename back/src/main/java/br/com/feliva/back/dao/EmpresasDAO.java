package br.com.feliva.back.dao;

import br.com.feliva.back.dto.EmpresaDTO;
import br.com.feliva.back.interfaces.ComunDAO;
import br.com.feliva.back.models.Empresa;
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
public class EmpresasDAO extends DAO<Empresa> implements ComunDAO<Empresa> {

    static final Map<String, LazyConsultConfig> lCConfigs = new HashMap<String, LazyConsultConfig>();

    static{
        lCConfigs.put("nomeFantasia",new LazyConsultConfig("","e.nomeFantasia","e.nomeFantasia"));
        lCConfigs.put("email",new LazyConsultConfig("","e.email","e.email"));
    }


    public Empresa findById(Integer id) {
        String hql = """
                        select e from Empresa e
                        left join fetch e.endereco en
                         left join fetch en.cidade ci
                         left join fetch e.listContatosEmpresa lce
                         left join fetch lce.contato c
                         left join fetch lce.tipoContatoEmpresa tce
                         where e.idEmpresa =:idEmpresa
                        """;

        return (Empresa)  this.em.createQuery(hql).setParameter("idEmpresa", id).getSingleResult();
    }

    public List<Empresa> listAll(){
        try {
            return this.em.createQuery("""
                        select e from Empresa e order by e.nome
                    """).getResultList();
        }catch (NoResultException e){
            return null;
        }
    }

    public List<EmpresaDTO> listAllDTO(){
        try {
            return this.em.createQuery("""
                select new br.com.feliva.back.dto.EmpresaDTO(e) from Empresa e 
                left join fetch e.endereco en            
                left join fetch en.cidade ci
                left join fetch ci.estado es
                order by e.nomeFantasia
            """, EmpresaDTO.class).getResultList();
        }catch (NoResultException e){
            return null;
        }
    }

    private Map<String,String>  criaQueryPaginando(StringBuffer hql, Map<String, Object> filter){
        Map<String,String> paramMap = new HashMap<>();

        StringBuffer join = new StringBuffer("");
        StringBuffer whereClause = new StringBuffer("and ");
        String w = "";

        String string = (String) filter.get("nomeFantasia");

        if(string != null && !string.isEmpty()){
            whereClause.append("and e.nomeFantasia like :nomeFantasia ");
            paramMap.put("nomeFantasia", string+"%");
        }
        //proximo

        if(!paramMap.isEmpty()){
            w = "where " + whereClause.delete(0, 3).toString();
        }

        join.append("left join fetch e.endereco en ")
            .append("left join fetch en.cidade ci ")
            .append("left join fetch ci.estado es ");

        hql.append(join).append(w).append(" order by e.nomeFantasia ");
        return paramMap;
    }




    @Override
    public List<Empresa> tableLazyLoad(TableLazyLoadEvent event) {
        try {
            final StringBuffer hql = new StringBuffer("select e from Empresa e ");
            hql.append("left join fetch e.endereco en ")
                    .append("left join fetch en.cidade ci ")
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


}