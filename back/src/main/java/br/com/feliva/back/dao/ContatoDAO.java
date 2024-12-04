package br.com.feliva.back.dao;

import br.com.feliva.back.interfaces.ComunDAO;
import br.com.feliva.back.models.Contato;
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
public class ContatoDAO extends DAO<Contato> implements ComunDAO<Contato> {

    public Contato findById(Integer id) {
        String hql = """
                        select c from Contato c
                         left join fetch c.cidade ci
                         left join fetch ci.estado e
                         where c.idContato = :idContato
                        """;

        return (Contato)  this.em.createQuery(hql).setParameter("idContato", id).getSingleResult();
    }

    public List<Contato> listAll(){
        try {
            return this.em.createQuery("""
                        select c from Contato c order by c.nome
                    """).getResultList();
        }catch (NoResultException e){
            return null;
        }
    }

    public List<Contato> listPaginado(Map<String, Object> filter){
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

    public Integer paginadoCount(Map<String, Object> filter){
        try {
            return this.em.createQuery("""
                        select c from Contato c order by c.nome
                    """).getResultList().size();
        }catch (NoResultException e){
            return null;
        }
    }

}