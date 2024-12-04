package br.com.feliva.back.endPoint;

import br.com.feliva.back.dao.CategoriaDAO;
import br.com.feliva.back.dao.CidadeDAO;
import br.com.feliva.back.models.Resposta;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/cidade")
public class CidadeEndPoint {

    @Inject
    private CidadeDAO cidadeDAO;


    //    http://localhost:8081/unidade/listAll
    @Path("/listAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listAll() {
        Resposta r = new Resposta();
        r.dados = cidadeDAO.listAll();
//        r.erro = 404;
        return Response.ok(r.dados).build();
    }

    @Path("/listAllByEstado/{idEstado}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listAllByEstado(@PathParam("idEstado") Integer idEstado) {
        return Response.ok(this.cidadeDAO.listAllByEstado(idEstado)).build();
    }

    @Path("/listAllEstados")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listAllEstados() {
        Resposta r = new Resposta();
        r.dados = cidadeDAO.listAllEstados();
//        r.erro = 404;
        return Response.ok(r.dados).build();
    }
}
