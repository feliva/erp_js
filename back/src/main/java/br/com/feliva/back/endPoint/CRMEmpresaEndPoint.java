package br.com.feliva.back.endPoint;

import br.com.feliva.back.dao.EmpresasDAO;
import br.com.feliva.back.interfaces.ComunDAO;
import br.com.feliva.back.models.Empresa;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.HashMap;
import java.util.Map;

@Path("/crm/empresa")
@SuppressWarnings("all")
public class CRMEmpresaEndPoint extends ComumEndPoint<EmpresasDAO, Empresa> {

    @Inject
    private EmpresasDAO empresasDAO;

    //    http://localhost:8081/unidade/listAll
    @Path("/listAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listAll(){
        return Response.ok(this.empresasDAO.listAll()).build();
    }

    @Path("/listAllDTO")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listAllDTO(){
        return Response.ok(this.empresasDAO.listAllDTO()).build();
    }


    protected ComunDAO<Empresa> getDao() {
        return (ComunDAO<Empresa>) empresasDAO;
    }

    @Path("/paginado")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response paginado(@QueryParam("first") Integer first,
                             @QueryParam("rows") Integer rows,
                             @QueryParam("nome") String nome){
        Map<String,Object> param = new HashMap<>();
        param.put("nome",nome);

        return Response.ok(this.getDao().listPaginado(first, rows, param)).build();
    }

    @Path("/paginadoCount")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response paginadoCount(@QueryParam("first") Integer first,
                                  @QueryParam("rows") Integer rows,
                                  @QueryParam("nome") String nome){
        Map<String,Object> param = new HashMap<>();
        param.put("nome",nome);
        return Response.ok(this.getDao().paginadoCount(first, rows, param)).build();
    }
}
