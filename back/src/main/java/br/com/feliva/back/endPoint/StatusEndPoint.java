package br.com.feliva.back.endPoint;

import br.com.feliva.back.dao.UnidadeDAO;
import br.com.feliva.back.models.Resposta;
import br.com.feliva.back.models.Status;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/status")
public class StatusEndPoint {

//    http://localhost:8081/unidade/listAll
    @Path("/listAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listAll(){
        Resposta r = new Resposta();
        r.dados = Status.values();
//        r.erro = 404;
        return Response.ok(r.dados).build();
    }
}
