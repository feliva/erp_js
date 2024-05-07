package br.com.feliva.back.dao;

import br.com.feliva.back.models.Unidade;
import br.com.feliva.back.models.Usuario;
import br.com.feliva.sharedClass.db.DAO;
import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.NoResultException;

import java.util.List;

@RequestScoped
public class UnidadeDAO extends DAO<Unidade> {


    public List<Unidade> listAll(){
        try {
            return this.em.createQuery("""
                        select u from Unidade u
                    """).getResultList();
        }catch (NoResultException e){
            return null;
        }
    }

    public List<Usuario> findByDescriSigla(String termoBusca){
        return this.em.createQuery("""
            from  Unidade u 
            where u.descricao ilike :termoBusca 
            or u.sigla ilike :termoBusca
        """).setParameter("termoBusca","%" + termoBusca + "%").getResultList();
    }

//    public Unidade findById(Integer idUnidade){
//        try {
//            return (Unidade) this.em.createQuery("from  Unidade u where u.idUnidade = :idUnidade")
//                    .setParameter("idUnidade",idUnidade)
//                    .getSingleResult();
//        }catch (NoResultException e){
//
//        }
//        return null;
//    }
}