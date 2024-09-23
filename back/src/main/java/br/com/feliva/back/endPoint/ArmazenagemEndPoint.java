package br.com.feliva.back.endPoint;

import br.com.feliva.back.dao.ArmazenagemDAO;
import br.com.feliva.back.models.Resposta;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/armazenagem")
public class ArmazenagemEndPoint {

    @Inject
    private ArmazenagemDAO armazenagemDAO;


//    http://localhost:8081/unidade/listAll
    @Path("/listAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listAll(){
        Resposta r = new Resposta();
        r.dados = this.armazenagemDAO.listAll();
//        r.erro = 404;
        return Response.ok(r.dados).build();
    }
}
