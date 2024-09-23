package br.com.feliva.back.dao;

import br.com.feliva.back.models.Produto;
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
            order by p.nome asc
        """).setParameter("termoBusca","%" + termoBusca + "%");
        q.setFirstResult(event.getFirst());
        q.setMaxResults(event.getRows());
        return q.getResultList();
    }

    public List findAll(){
        return this.em.createQuery("""
            from  Produto p 
            order by p.nome asc
        """).getResultList();
    }

    public List<Produto> findAll(TableLazyLoadEvent event){
        Query q = this.em.createQuery("""
            from  Produto p 
            order by p.nome asc
        """);
        q.setFirstResult(event.getFirst());
        q.setMaxResults(event.getRows());
        return  q.getResultList();
    }

    public List<Produto> findbyIdOrName(String termoBusca){
        return this.em.createQuery("""
            from  Produto p 
            where p.nome ilike :termoBusca 
            or cast(p.idProduto as text) like :termoBusca
            order by p.nome
        """)
                .setParameter("termoBusca","%"+termoBusca+"%")
                .getResultList();
    }

    public Produto findById(Integer idProduto){
        try {
            return (Produto) this.em.createQuery("from  Produto p where p.idProduto = :idProduto order by p.nome asc")
                    .setParameter("idProduto",idProduto)
                    .getSingleResult();
        }catch (NoResultException e){

        }
        return null;
    }


}