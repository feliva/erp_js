//package br.com.feliva.back.util;
//
//import br.com.feliva.back.models.Resposta;
//import br.com.feliva.back.models.Unidade;
//import jakarta.transaction.RollbackException;
//import jakarta.ws.rs.Produces;
//import jakarta.ws.rs.core.Response;
//import jakarta.ws.rs.ext.ExceptionMapper;
//import jakarta.ws.rs.ext.Provider;
//
//@Provider
//public class HandleRollbackExeption  implements ExceptionMapper<RollbackException> {
//        @Override
//        public Response toResponse(RollbackException exception) {
//            Resposta<Unidade> resposta = new Resposta<>();
////            Resposta.addErros(exception, resposta);
//            return Response.status(Response.Status.BAD_REQUEST).entity(resposta).build();
//        }
//    }
