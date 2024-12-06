package br.com.feliva.back.dao;

import br.com.feliva.back.interfaces.ComunDAO;
import br.com.feliva.back.models.Contato;
import br.com.feliva.back.models.Empresa;
import br.com.feliva.back.dto.EmpresaDTO;
import br.com.feliva.sharedClass.db.DAO;
import jakarta.enterprise.context.RequestScoped;
import jakarta.enterprise.inject.Default;
import jakarta.persistence.NoResultException;
import jakarta.persistence.Query;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SuppressWarnings("all")
@RequestScoped
@Default
public class EmpresasDAO extends DAO<Empresa> implements ComunDAO<Empresa> {

    public Empresa findById(Integer id) {
        String hql = """
                        select e from Empresa e
                        left join fetch e.endereco en
                         left join fetch en.cidade ci
                         left join fetch e.setContatos cont
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

    public List<Empresa> listPaginado(Integer first, Integer rows, Map<String, Object> filter){
        try {
            StringBuffer hql = new StringBuffer("select e from Empresa e ");
            Map<String,String> paramMap =  this.criaQueryPaginando(hql,filter);

            Query query = this.em.createQuery(hql.toString());
            if(first != null) {
                query.setFirstResult(first).setMaxResults(rows);
            }

            paramMap.forEach((s, s2) -> {
                query.setParameter(s, s2);
            });

            return query.getResultList();
        }catch (NoResultException e){
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    public Integer paginadoCount(Integer first, Integer rows,Map<String, Object> filter){
        try {
            return this.listPaginado(null,null,filter).size();
        }catch (NoResultException e){
        }catch (Exception e){
            e.printStackTrace();
        }
        return 0;
    }

}