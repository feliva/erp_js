package br.com.feliva.back.dao;

import br.com.feliva.back.interfaces.ComunDAO;
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
                         left join fetch e.cidade ci
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

    public List<Empresa> listPaginado(Integer first, Integer rows,Map<String, Object> filter){
        try {
            Map<String,String> paramMap = new HashMap<>();

            String whereClause = "",w = "";
            String param = (String) filter.get("nome");
            if(param != null && !param.isEmpty()){
                whereClause += "and c.nome like :nome ";
                paramMap.put("nome", param+"%");
            }


            if(!whereClause.isEmpty()){
                w = "where " + whereClause.substring(3);
            }
            String hql = """
                        select c from Contato c
                         left join fetch c.cidade ci
                         left join fetch ci.estado e 
                        """ + w + " order by c.nome";

            Query query = this.em.createQuery(hql);

            paramMap.forEach((s, s2) -> {
                query.setParameter(s, s2);
                System.out.println(s + s2);
            });

            return query.getResultList();
        }catch (NoResultException e){
            return null;
        }
    }

    public Integer paginadoCount(Integer first, Integer rows,Map<String, Object> filter){
        try {
            return this.em.createQuery("""
                        select c from Contato c order by c.nome
                    """).getResultList().size();
        }catch (NoResultException e){
            return null;
        }
    }

}