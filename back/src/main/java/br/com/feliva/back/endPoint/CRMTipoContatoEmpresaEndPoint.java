package br.com.feliva.back.endPoint;

import br.com.feliva.back.dao.TipoContatoEmpresaDAO;
import br.com.feliva.back.dto.DTOUtil;
import br.com.feliva.back.interfaces.ComunDAO;
import br.com.feliva.back.models.TipoContatoEmpresa;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/crm/tipoContatoEmpresa")
@SuppressWarnings("all")
public class CRMTipoContatoEmpresaEndPoint extends ComumEndPoint<TipoContatoEmpresaDAO, TipoContatoEmpresa> {

    @Inject
    private TipoContatoEmpresaDAO dao;

    //    http://localhost:8081/unidade/listAll
    @Path("/listAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listAll() {
        return Response.ok(this.dao.listAll()).build();
    }

    protected ComunDAO<TipoContatoEmpresa> getDao() {
        return (ComunDAO<TipoContatoEmpresa>) dao;
    }

    @Override
    public DTOUtil getDTOUtil() {
        return null;
    }

}
