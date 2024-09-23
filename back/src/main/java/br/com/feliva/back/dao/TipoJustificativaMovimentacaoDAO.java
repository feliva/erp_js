package br.com.feliva.back.dao;

import br.com.feliva.back.models.TipoJustificativaMovimentacao;
import br.com.feliva.sharedClass.db.DAO;
import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.NoResultException;

import java.util.List;

@RequestScoped
public class TipoJustificativaMovimentacaoDAO extends DAO<TipoJustificativaMovimentacao> {


    public List<TipoJustificativaMovimentacao> listAll(){
        try {
            return this.em.createQuery("""
                        select t from TipoJustificativaMovimentacao t order by t.descricao asc
                    """).getResultList();
        }catch (NoResultException e){
            return null;
        }
    }

}