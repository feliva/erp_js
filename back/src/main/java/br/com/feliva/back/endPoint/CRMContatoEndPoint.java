package br.com.feliva.back.endPoint;

import br.com.feliva.back.dao.ContatoDAO;
import br.com.feliva.back.interfaces.ComunDAO;
import br.com.feliva.back.models.Contato;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/crm/contato")
@SuppressWarnings("all")
public class CRMContatoEndPoint extends ComumEndPoint<ContatoDAO,Contato> {

    @Inject
    private ContatoDAO contatoDAO;

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
    public Response paginado(@QueryParam("nome") String nome){
        Map<String,Object> param = new HashMap<>();
        param.put("nome",nome);

        return Response.ok(this.getDao().listPaginado(param)).build();
    }

    @Path("/paginadoCount")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response paginadoCount(@QueryParam("nome") String nome){
        Map<String,Object> param = new HashMap<>();
        param.put("nome",nome);
        return Response.ok(this.getDao().paginadoCount(param)).build();
    }
}
