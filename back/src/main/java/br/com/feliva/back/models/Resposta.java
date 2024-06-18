package br.com.feliva.back.models;

import jakarta.transaction.RollbackException;
import jakarta.validation.ConstraintViolationException;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;
import java.util.List;

public class Resposta<T> {

    public T dados;
    public Error erro;
    public List<String> msgs;

    public Resposta() {
    }

    public Resposta(T dados, Error erro, List<String> msgs) {
        this.dados = dados;
        this.erro = erro;
        this.msgs = msgs;
    }


    public enum Error{
        VALIDACAO_ERRO(101,"Parametro com erros de validação."),
        FORMATO_ERRO(101,"Erro no formato dos dados.");

        private final int code;
        private final String reason;

        Error(int code, String reason) {
            this.code = code;
            this.reason = reason;
        }
    }

    public static class Builder<I>{
         public static <I> Response errorValidacao(I dados, List<String> msg){
             return Response.status(Response.Status.BAD_REQUEST).entity(new Resposta<I>(dados,Error.VALIDACAO_ERRO,msg)).build();
        }
    }
}
