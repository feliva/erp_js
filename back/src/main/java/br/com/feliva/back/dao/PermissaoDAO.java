package br.com.feliva.back.dao;

import br.com.feliva.models.Permissao;
import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.NoResultException;

import java.util.List;

@RequestScoped
public class PermissaoDAO extends Dao<Permissao>{

    public List<Permissao> listAll(){
        try {
            return this.em.createQuery("""
                    select p from Permissao p 
                """).getResultList();
        }catch (NoResultException e){}

        return null;
    }
}