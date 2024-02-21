package br.com.feliva.back.dao;

import br.com.feliva.back.models.Permissao;
import br.com.feliva.sharedClass.db.DAO;
import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.NoResultException;

import java.util.List;

@RequestScoped
public class PermissaoDAO extends DAO<Permissao> {

    public List<Permissao> listAll(){
        try {
            return this.em.createQuery("""
                    select p from Permissao p 
                """).getResultList();
        }catch (NoResultException e){}

        return null;
    }
}