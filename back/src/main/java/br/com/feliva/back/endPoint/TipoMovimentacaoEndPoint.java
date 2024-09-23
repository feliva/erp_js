package br.com.feliva.back.endPoint;

import br.com.feliva.back.models.Resposta;
import br.com.feliva.back.models.Status;
import br.com.feliva.back.models.TipoMovimentacao;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/tipo_movimentacao")
public class TipoMovimentacaoEndPoint {

//    http://localhost:8081/unidade/listAll
    @Path("/listAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listAll(){
        Resposta r = new Resposta();
        r.dados = TipoMovimentacao.values();
//        r.erro = 404;
        return Response.ok(r.dados).build();
    }
}
