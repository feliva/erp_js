package br.com.feliva.back.endPoint;

import br.com.feliva.back.dao.UnidadeDAO;
import br.com.feliva.back.dao.UsuarioDAO;
import br.com.feliva.back.models.Resposta;
import br.com.feliva.back.models.Unidade;
import br.com.feliva.back.models.Usuario;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.RollbackException;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/unidade")
public class UnidadeEndPoint {

    @Inject
    UnidadeDAO unidadeDAO;

//    http://localhost:8081/unidade/listAll
    @Path("/listAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listAll(){
        Resposta r = new Resposta();
        r.dados = unidadeDAO.listAll();
        r.erro = 404;
        return Response.ok(r.dados).build();
    }

    @Path("/findByDescriSigla/{termoBusca}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findByDescriSigla(@PathParam("termoBusca") String termoBusca){
        Resposta r = new Resposta();
        r.dados = unidadeDAO.findByDescriSigla(termoBusca);
        return Response.ok(r.dados).build();
    }

    @Path("/findById/{idUnidade}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findById(@PathParam("idUnidade") Integer idUnidade){
        Resposta r = new Resposta();
        r.dados = unidadeDAO.findById(idUnidade);
        return Response.ok(r.dados).build();
    }
}
