package br.com.feliva.back.dao;

import br.com.feliva.back.models.Usuario;
import br.com.feliva.sharedClass.db.DAO;
import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.NoResultException;

import java.util.List;

@RequestScoped
public class UsuarioDAO extends DAO<Usuario> {

    public Usuario findUsuarioByUsername(String username){
        try {
            return (Usuario) this.em.createQuery("""
                    select u from Usuario u where u.username = :username
                """).setParameter("username",username)
                    .getSingleResult();
        }catch (NoResultException e){
            return null;
        }
    }

    public List<Usuario> listAll(){
        try {
            return this.em.createQuery("""
                        select u from Usuario u
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