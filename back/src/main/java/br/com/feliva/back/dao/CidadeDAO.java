package br.com.feliva.back.dao;

import br.com.feliva.back.models.Categoria;
import br.com.feliva.back.models.Cidade;
import br.com.feliva.back.models.Estado;
import br.com.feliva.sharedClass.db.DAO;
import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.NoResultException;

import java.util.List;

@RequestScoped
@SuppressWarnings("all")
public class CidadeDAO extends DAO<Cidade> {

    public List<Cidade> listAll(){
        try {
            return this.em.createQuery("""
                        select c from Cidade c order by c.nome asc
                    """).getResultList();
        }catch (NoResultException e){
            return null;
        }
    }

    public List<Cidade> listAllByEstado(Integer idEstado){
        try {
            return this.em.createQuery("""
                        select c from Cidade c
                        left join c.estado e
                        where e.idEstado = :idEstado
                        order by c.nome asc
                    """)
                    .setParameter("idEstado", idEstado)
                    .getResultList();
        }catch (NoResultException e){
            return null;
        }
    }

    public List<Estado> listAllEstados(){
        try {
            return this.em.createQuery("""
                        select e from Estado e order by e.nome asc
                    """).getResultList();
        }catch (NoResultException e){
            return null;
        }
    }

}