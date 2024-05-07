package br.com.feliva.back.endPoint;

import br.com.feliva.back.dao.UnidadeDAO;
import br.com.feliva.back.models.Resposta;
import br.com.feliva.back.models.Unidade;
import br.com.feliva.back.util.ValidadorUtill;
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

    @Inject
    ValidadorUtill validadorUtill;

//    http://localhost:8081/unidade/listAll
    @Path("/listAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listAll(){
        Resposta r = new Resposta();
        r.dados = unidadeDAO.listAll();
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
//        Resposta<Unidade> r = new Resposta<Unidade>();
//        r.dados = unidadeDAO.findById(idUnidade);
        return Response.ok(unidadeDAO.findById(idUnidade)).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response post(Unidade unidade) throws RollbackException {
        List<String> erros = this.validadorUtill.validar(unidade);
        if(!erros.isEmpty()){
            return Resposta.Builder.<Unidade>errorValidacao(unidade,erros);

        }
        this.unidadeDAO.mergeT(unidade);
        return Response.ok(Response.Status.ACCEPTED).build();
    }
}
