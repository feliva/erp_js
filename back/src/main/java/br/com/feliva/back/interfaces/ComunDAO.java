package br.com.feliva.back.interfaces;

import br.com.feliva.sharedClass.db.Model;
import jakarta.transaction.RollbackException;

import java.util.List;
import java.util.Map;

@SuppressWarnings("all")
public interface ComunDAO<M extends Model<?>> {

    public List<M> listAll();

    public List<M> listPaginado(Map<String, Object> filter);

    public Integer paginadoCount(Map<String, Object> filter);

    public M findById(Integer id);

    public <T> void mergeT(T entity) throws RollbackException;

    public void removeT (M entity)throws RollbackException;

}