package br.com.feliva.back.endPoint;

import br.com.feliva.back.dao.TipoJustificativaMovimentacaoDAO;
import br.com.feliva.back.models.Resposta;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/tipoJustificativaMovimentacao")
public class TipoJustificativaMovimentacaoEndPoint {

    @Inject
    private TipoJustificativaMovimentacaoDAO tjmDAO;


//    http://localhost:8081/unidade/listAll
    @Path("/listAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listAll(){
        Resposta r = new Resposta();
        r.dados = this.tjmDAO.listAll();
//        r.erro = 404;
        return Response.ok(r.dados).build();
    }
}
