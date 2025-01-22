package br.com.feliva.back.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;
import java.util.List;

public class Resposta<T> {

    public T dados;
    public Error erro;
    public List<String> mensagenErros;

    public Resposta() {
    }

    public Resposta(T dados, Error erro, List<String> mensagenErros) {
        this.dados = dados;
        this.erro = erro;
        this.mensagenErros = mensagenErros;
    }


    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum Error{
        VALIDACAO_ERRO(Response.Status.NOT_ACCEPTABLE,"Existem erros de validação."),
        ENTIDADE_NAO_ENCONTRADA(Response.Status.NOT_FOUND,"Entidade não foi encontrada."),
        INTERNAL_SERVER_ERROR(Response.Status.INTERNAL_SERVER_ERROR,"Internal Server Error."),
        GENERIC_ERROR(Response.Status.INTERNAL_SERVER_ERROR,"Ocorreu um erro inesperado."),
        ;

        private final Response.Status status;
        private final String msg;

        Error(Response.Status status, String msg) {
            this.status = status;
            this.msg = msg;
        }

        public Response.Status getStatus() {
            return status;
        }

        public String getMsg() {
            return msg;
        }
    }

    static public <T> Response buildResponse(Error erro) {
        return Response.status(erro.status).entity(new Resposta<T>(null,erro,null)).build();
    }

    static public <T> Response buildResponse(T dados,Error erro) {
        return Response.status(erro.status).entity(new Resposta<T>(dados,erro,null)).build();
    }

    static public <T> Response buildResponse(T dados,Error erro, List<String> mensagenErros) {
        return Response.status(erro.status).entity(new Resposta<>(dados, erro, mensagenErros)).build();
    }

    static public <T> Response buildResponse(T dados,Error erro,String mensagen) {
        List<String> mensagenErros = new ArrayList<>();
        mensagenErros.add(mensagen);
        return Response.status(erro.status).entity(new Resposta<T>(dados,erro,mensagenErros)).build();
    }

    public static class Builder<I>{
        public static <I> Response errorValidacao(I dados, List<String> msg){
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(new Resposta<I>(dados,Error.VALIDACAO_ERRO,msg)).build();
        }
    }
}
