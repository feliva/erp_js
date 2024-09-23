package br.com.feliva.back.dao;

import br.com.feliva.back.models.Armazenagem;
import br.com.feliva.sharedClass.db.DAO;
import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.NoResultException;

import java.util.List;

@RequestScoped
public class ArmazenagemDAO extends DAO<Armazenagem> {


    public List<Armazenagem> listAll(){
        try {
            return this.em.createQuery("""
                        select a from Armazenagem a order by a.nome asc
                    """).getResultList();
        }catch (NoResultException e){
            return null;
        }
    }

}