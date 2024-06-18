package br.com.feliva.back.util;//package br.com.feliva.back.util;

import br.com.feliva.back.models.Resposta;
import br.com.feliva.back.models.Unidade;
import br.com.feliva.sharedClass.db.Model;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import jakarta.transaction.RollbackException;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class HandleInvalidFormatException implements ExceptionMapper<InvalidFormatException> {
        @Override
        public Response toResponse(InvalidFormatException exception) {
            exception.printStackTrace();
            Resposta<Model> resposta = new Resposta<>();
//            Resposta.addErros(exception, resposta);
            return Response.status(Response.Status.BAD_REQUEST).entity(resposta).build();
        }
    }
