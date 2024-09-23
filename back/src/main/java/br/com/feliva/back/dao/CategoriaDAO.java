package br.com.feliva.back.dao;

import br.com.feliva.back.models.Categoria;
import br.com.feliva.back.models.Unidade;
import br.com.feliva.back.models.Usuario;
import br.com.feliva.sharedClass.db.DAO;
import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.NoResultException;

import java.util.List;

@RequestScoped
public class CategoriaDAO extends DAO<Categoria> {


    public List<Categoria> listAll(){
        try {
            return this.em.createQuery("""
                        select c from Categoria c
                    """).getResultList();
        }catch (NoResultException e){
            return null;
        }
    }

}