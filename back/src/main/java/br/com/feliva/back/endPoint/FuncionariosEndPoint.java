package br.com.feliva.back.endPoint;

import br.com.feliva.back.dao.FuncionarioDAO;
import br.com.feliva.back.interfaces.ComunDAO;
import br.com.feliva.back.models.Funcionario;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;

@Path("/funcionarios")
@SuppressWarnings("all")
public class FuncionariosEndPoint extends ComumEndPoint<FuncionarioDAO,Funcionario> {

    @Inject
    private FuncionarioDAO funcionarioDAO;

    @Context UriInfo uriInfo;

    //    http://localhost:8081/unidade/listAll
    @Path("/listAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listAll(){
        return Response.ok(this.funcionarioDAO.listAll()).build();
    }

    protected ComunDAO<Funcionario> getDao() {
        return (ComunDAO<Funcionario>) funcionarioDAO;
    }

    @Path("/listByNome/{param}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listAll(@PathParam("param") String param){
        return Response.ok(this.funcionarioDAO.findByNome(param)).build();
    }

    public boolean tableLazyReturnModel(){
        return true;
    }
}
