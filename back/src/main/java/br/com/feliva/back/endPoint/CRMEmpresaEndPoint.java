package br.com.feliva.back.endPoint;

import br.com.feliva.back.dao.EmpresasDAO;
import br.com.feliva.back.dto.DTOUtil;
import br.com.feliva.back.dto.EmpresaDTO;
import br.com.feliva.back.interfaces.ComunDAO;
import br.com.feliva.back.models.Empresa;
import br.com.feliva.back.models.Resposta;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

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


    @Path("/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findById(@PathParam("id") Integer id){
        try {
            Empresa entity = this.getDao().findById(id);
            if(entity == null){
                return Resposta.buildResponse(id, Resposta.Status.ENTIDADE_NAO_ENCONTRADA);
            }
            EmpresaDTO dto = new EmpresaDTO(entity);
            dto.processaListEmpresaContado(entity);

            return Response.ok(dto).build();
        }catch (Exception e){
            System.out.println(e.getMessage());
            return Resposta.buildResponse(id, Resposta.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public DTOUtil getDTOUtil() {
        return this.dtoUtil;
    }
}
