package br.com.feliva.back.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;
import java.util.List;

public class Resposta<T> {

    public T dados;
    public Status erro;
    public List<String> mensagenErros;

    public Resposta() {
    }

    public Resposta(T dados, Status erro, List<String> mensagenErros) {
        this.dados = dados;
        this.erro = erro;
        this.mensagenErros = mensagenErros;
    }


    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum Status{
        ok(Response.Status.OK,"ok."),
        VALIDACAO_ERRO(Response.Status.NOT_ACCEPTABLE,"Existem erros de validação."),
        ENTIDADE_NAO_ENCONTRADA(Response.Status.NOT_FOUND,"Entidade não foi encontrada."),
        INTERNAL_SERVER_ERROR(Response.Status.INTERNAL_SERVER_ERROR,"Internal Server Error."),
        GENERIC_ERROR(Response.Status.INTERNAL_SERVER_ERROR,"Ocorreu um erro inesperado."),
        ;

        private final Response.Status status;
        private final String msg;

        Status(Response.Status status, String msg) {
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

    static public <T> Response buildResponse(Status status) {
        return Response.status(status.status).entity(new Resposta<T>(null,status,null)).build();
    }

    static public <T> Response buildResponse(T dados, Status status) {
        return Response.status(status.status).entity(new Resposta<T>(dados,status,null)).build();
    }

    static public <T> Response buildResponse(T dados, Status status, List<String> mensagenErros) {
        return Response.status(status.status).entity(new Resposta<>(dados, status, mensagenErros)).build();
    }

    static public <T> Response buildResponse(T dados, Status status, String mensagen) {
        List<String> mensagenErros = new ArrayList<>();
        mensagenErros.add(mensagen);
        return Response.status(status.status).entity(new Resposta<T>(dados,status,mensagenErros)).build();
    }

    public static class Builder<I>{
        public static <I> Response errorValidacao(I dados, List<String> msg){
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(new Resposta<I>(dados, Status.VALIDACAO_ERRO,msg)).build();
        }
    }
}
