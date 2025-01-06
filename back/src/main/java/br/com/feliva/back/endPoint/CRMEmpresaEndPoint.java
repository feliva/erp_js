package br.com.feliva.back.endPoint;

import br.com.feliva.back.dao.EmpresasDAO;
import br.com.feliva.back.dto.DTOUtil;
import br.com.feliva.back.dto.EmpresaDTO;
import br.com.feliva.back.interfaces.ComunDAO;
import br.com.feliva.back.models.Empresa;
import br.com.feliva.back.models.Resposta;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/crm/empresa")
@SuppressWarnings("all")
public class CRMEmpresaEndPoint extends ComumEndPoint<EmpresasDAO, Empresa> {

    private DTOUtil dtoUtil = new DTOUtil(Empresa.class,EmpresaDTO.class);

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
                             @QueryParam("nomeFantasia") String nome){
        Map<String,Object> param = new HashMap<>();
        param.put("nome",nome);

        List<Empresa> listEmpresa = this.empresasDAO.listPaginado(first, rows, param);


        List<EmpresaDTO> listEmpresaDTO = (List<EmpresaDTO>) this.dtoUtil.toDTO(listEmpresa);

        return Response.ok(listEmpresaDTO).build();
    }

    @Path("/paginadoCount")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response paginadoCount(@QueryParam("first") Integer first,
                                  @QueryParam("rows") Integer rows,
                                  @QueryParam("nomeFantasia") String nome){
        Map<String,Object> param = new HashMap<>();
        param.put("nomeFantasia",nome);
        return Response.ok(this.empresasDAO.paginadoCount(first, rows, param)).build();
    }


    @Path("/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findById(@PathParam("id") Integer id){
        try {
            Empresa entity = this.getDao().findById(id);
            if(entity == null){
                return Resposta.buildResponse(id, Resposta.Error.ENTIDADE_NAO_ENCONTRADA);
            }
            EmpresaDTO dto = new EmpresaDTO(entity);
            dto.processaListEmpresaContado(entity);

            return Response.ok(dto).build();
        }catch (Exception e){
            System.out.println(e.getMessage());
            return Resposta.buildResponse(id, Resposta.Error.INTERNAL_SERVER_ERROR);
        }
    }
}
