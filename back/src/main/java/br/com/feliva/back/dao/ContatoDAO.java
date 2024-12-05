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
        try {
            String hql = """
                        select c from Contato c
                         left join fetch c.cidade ci
                         left join fetch ci.estado e
                         where c.idContato = :idContato
                        """;

            return (Contato)  this.em.createQuery(hql).setParameter("idContato", id).getSingleResult();
        }catch (NoResultException e) {
            return null;
        }
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

    private Map<String,String>  criaQueryPaginando(StringBuffer hql, Map<String, Object> filter){
        Map<String,String> paramMap = new HashMap<>();

        StringBuffer join = new StringBuffer("");
        StringBuffer whereClause = new StringBuffer("and ");
        String w = "";

        String string = (String) filter.get("nome");

        if(string != null && !string.isEmpty()){
            whereClause.append("and c.nome like :nome ");
            paramMap.put("nome", string+"%");
        }
        //proximo

        if(!paramMap.isEmpty()){
            w = "where " + whereClause.delete(0, 3).toString();
        }

        join.append("left join fetch c.cidade ci ")
            .append("left join fetch ci.estado e ");

        hql.append(join).append(w).append(" order by c.nome");
        return paramMap;
    }

    public List<Contato> listPaginado(Integer first, Integer rows, Map<String, Object> filter){
        try {
            StringBuffer hql = new StringBuffer("select c from Contato c ");
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