package br.com.feliva.back.dao;

import br.com.feliva.back.models.Produto;
import br.com.feliva.back.models.Unidade;
import br.com.feliva.back.models.Usuario;
import br.com.feliva.back.models.primeng.TableLazyLoadEvent;
import br.com.feliva.sharedClass.db.DAO;
import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.NoResultException;
import jakarta.persistence.Query;

import java.util.List;

@RequestScoped
public class ProdutoDAO extends DAO<Produto> {

    public List<Produto> findByNome(String termoBusca, TableLazyLoadEvent event){
        Query q = this.em.createQuery("""
            from  Produto p 
            where p.nome ilike :termoBusca
            order by p.nome
        """).setParameter("termoBusca","%" + termoBusca + "%");
        q.setFirstResult(event.getFirst());
        q.setMaxResults(event.getRows());
        return q.getResultList();
    }

    public List<Produto> findAll(){
        return this.em.createQuery("""
            from  Produto p 
            order by p.nome
        """).getResultList();
    }

    public List<Produto> findAll(TableLazyLoadEvent event){
        Query q = this.em.createQuery("""
            from  Produto p 
            order by p.nome
        """);
        q.setFirstResult(event.getFirst());
        q.setMaxResults(event.getRows());
        return  q.getResultList();
    }

    public Produto findById(Integer idProduto){
        try {
            return (Produto) this.em.createQuery("from  Produto u where u.idProduto = :idProduto")
                    .setParameter("idProduto",idProduto)
                    .getSingleResult();
        }catch (NoResultException e){

        }
        return null;
    }


}