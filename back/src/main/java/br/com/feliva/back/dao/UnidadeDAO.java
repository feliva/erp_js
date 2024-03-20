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

    public List<Usuario> findByName(String nome){
        return this.em.createQuery("""
            from  Usuario u where u.nome ilike :nome
        """).setParameter("nome","%" + nome + "%").getResultList();
    }

    public Usuario findById(Integer idUsuario){
        try {
            return (Usuario) this.em.createQuery("from  Usuario u where u.idUsuario = :idUsuario")
                    .setParameter("idUsuario",idUsuario)
                    .getSingleResult();
        }catch (NoResultException e){

        }
        return null;
    }
}