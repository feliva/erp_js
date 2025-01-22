package br.com.feliva.back.interfaces;

import br.com.feliva.sharedClass.db.Model;

import java.util.List;
import java.util.Map;

@SuppressWarnings("all")
public interface PaginadoDAO<M extends Model<?>> {

    public List<M> listPaginado(Integer first, Integer rows, Map<String, Object> filter);

    public Integer paginadoCount(Integer first, Integer rows, Map<String, Object> filter);

}