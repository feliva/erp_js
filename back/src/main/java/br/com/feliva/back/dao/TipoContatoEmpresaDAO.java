package br.com.feliva.back.dao;

import br.com.feliva.back.models.TipoContatoEmpresa;
import br.com.feliva.sharedClass.db.DAO;
import jakarta.enterprise.context.RequestScoped;
import jakarta.enterprise.inject.Default;
import jakarta.persistence.NoResultException;

import java.util.List;

@SuppressWarnings("all")
@RequestScoped
@Default
public class TipoContatoEmpresaDAO extends DAO<TipoContatoEmpresa> {

    public TipoContatoEmpresa findById(Integer id) {
        try {
            String hql = """
                        select tce from TipoContatoEmpresa tce
                        left join fetch tce.endereco e
                         left join fetch tce.contato c
                         where tce.idTipoContatoEmpresa = :id
                        """;

            return (TipoContatoEmpresa)  this.em.createQuery(hql).setParameter("id", id).getSingleResult();
        }catch (NoResultException e) {
            return null;
        }
    }

    public List<TipoContatoEmpresa> listAll(){
        try {
            return this.em.createQuery("""
                        select t from TipoContatoEmpresa t order by t.descrisao
                    """).getResultList();
        }catch (NoResultException e){
            return null;
        }
    }

}