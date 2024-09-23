package br.com.feliva.back.dao;

import br.com.feliva.back.models.Categoria;
import br.com.feliva.sharedClass.db.DAO;
import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.NoResultException;

import java.util.List;

@RequestScoped
public class MarcaDAO extends DAO<Categoria> {


    public List<Categoria> listAll(){
        try {
            return this.em.createQuery("""
                        select m from Marca m
                    """).getResultList();
        }catch (NoResultException e){
            return null;
        }
    }

}