package br.com.feliva.back.interfaces;

import br.com.feliva.back.util.primeng.TableLazyLoadEvent;
import br.com.feliva.sharedClass.db.Model;
import jakarta.transaction.RollbackException;

import java.util.List;

@SuppressWarnings("all")
public interface ComunDAO<M extends Model<?>> {

    public List<M> listAll();

    public M findById(Integer id);

    public <T> void mergeT(T entity) throws RollbackException;

    public void removeT (M entity)throws RollbackException;

    public List<M> tableLazyLoad(TableLazyLoadEvent filters);
    public Integer tableLazyLoadCount(TableLazyLoadEvent filters);
}