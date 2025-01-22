package br.com.feliva.back.endPoint;

import br.com.feliva.back.dao.ContatoDAO;
import br.com.feliva.back.interfaces.ComunDAO;
import br.com.feliva.back.models.Contato;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;

import java.util.HashMap;
import java.util.Map;

@Path("/crm/contato")
@SuppressWarnings("all")
public class CRMContatoEndPoint extends ComumEndPoint<ContatoDAO,Contato> {

    @Inject
    private ContatoDAO contatoDAO;

    @Context UriInfo uriInfo;

    //    http://localhost:8081/unidade/listAll
    @Path("/listAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listAll(){
        return Response.ok(this.contatoDAO.listAll()).build();
    }

    protected ComunDAO<Contato> getDao() {
        return (ComunDAO<Contato>) contatoDAO;
    }

    @Path("/paginado")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response paginado(@QueryParam("first") Integer first,
                             @QueryParam("rows") Integer rows,
                             @QueryParam("nome") String nome,
                             @QueryParam("filter") String filter){
        Map<String,Object> param = new HashMap<>();
        param.put("nome",nome);

        return Response.ok(this.contatoDAO.listPaginado(first, rows, param)).build();
    }

    @Path("/paginadoCount")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response paginadoCount(@QueryParam("first") Integer first,
                                  @QueryParam("rows") Integer rows,
                                  @QueryParam("nome") String nome){
        Map<String,Object> param = new HashMap<>();
        param.put("nome",nome);
        return Response.ok(this.contatoDAO.paginadoCount(first,rows,param)).build();
    }
}
