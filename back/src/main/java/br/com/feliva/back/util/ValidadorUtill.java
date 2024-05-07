package br.com.feliva.back.util;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@RequestScoped
public class ValidadorUtill {

    @Inject
    private Validator validator;

    public <T> List<String> validar(T obj ){
        Set<ConstraintViolation<T>> violations =  validator.validate(obj);
        if(!violations.isEmpty()) {
            List<String> erros = new ArrayList<>();
            violations.forEach(erro -> {
                erros.add(erro.getMessage());
            });
            return erros;
        }
        return Collections.emptyList();
    }
}
