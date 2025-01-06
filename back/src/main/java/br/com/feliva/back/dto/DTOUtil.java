package br.com.feliva.back.dto;

import br.com.feliva.back.models.Empresa;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class DTOUtil<M,D> {

    Class<D> dtoClass;
    Class<M> modelClass;

    public DTOUtil(Class<M> modelClass, Class<D> dtoClass) {
        this.modelClass = modelClass;
        this.dtoClass = dtoClass;
    }

    public Collection<D> toDTO(Collection<M> entities) {
        List<D> dtos = new ArrayList<D>();
        try {
            for (M entity : entities) {
                dtos.add(this.dtoClass.getDeclaredConstructor(modelClass).newInstance(entity));
            }
        } catch (InstantiationException e) {
            throw new RuntimeException(e);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        } catch (InvocationTargetException e) {
            throw new RuntimeException(e);
        } catch (NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
        return dtos;
    }

    public D toDTO(M entity) {
        try {
            return this.dtoClass.getDeclaredConstructor(modelClass).newInstance(entity);
        } catch (InstantiationException e) {
            throw new RuntimeException(e);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        } catch (InvocationTargetException e) {
            throw new RuntimeException(e);
        } catch (NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }

}
