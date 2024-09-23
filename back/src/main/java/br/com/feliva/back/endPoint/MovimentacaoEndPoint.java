package br.com.feliva.back.endPoint;

import br.com.feliva.back.dao.MovimentacaoDAO;
import br.com.feliva.back.models.Movimentacao;
import br.com.feliva.back.models.Produto;
import br.com.feliva.back.models.Resposta;
import br.com.feliva.back.models.primeng.TableLazyLoadEvent;
import jakarta.inject.Inject;
import jakarta.transaction.RollbackException;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/movimentacao")
public class MovimentacaoEndPoint {

    @Inject
    private MovimentacaoDAO movimentacaoDAO;


//    http://localhost:8081/unidade/listAll
    @Path("/listAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listAll(){
        Resposta r = new Resposta();
        r.dados = this.movimentacaoDAO.listAll();
//        r.erro = 404;
        return Response.ok(r.dados).build();
    }

    @Path("/getEstoqueProduto/{idProduto}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response estoqueProduto(@PathParam("idProduto") Integer idProduto){
//        Resposta<Unidade> r = new Resposta<Unidade>();
//        r.dados = unidadeDAO.findById(idUnidade);
        return Response.ok(this.movimentacaoDAO.getTotalEstoqueProduto(idProduto)).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response post(List<Movimentacao> listaMovimentacao) throws RollbackException {

        System.out.println(listaMovimentacao);

        listaMovimentacao.forEach((movi)->{
            try {
                this.movimentacaoDAO.persistT(movi);
            } catch (RollbackException e) {
                throw new RuntimeException(e);
            }
        });
        return Response.ok(Response.Status.ACCEPTED).build();
    }

    @Path("/findById/{idMovimentacao}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findById(@PathParam("idMovimentacao") Integer idMovimentacao){
//        Resposta<Unidade> r = new Resposta<Unidade>();
//        r.dados = unidadeDAO.findById(idUnidade);
        return Response.ok(movimentacaoDAO.findById(idMovimentacao)).build();
    }

    @Path("/listByFilter")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response findByNome(TableLazyLoadEvent event){
        Resposta r = new Resposta();

//        if(termoBusca.trim().equals("*")){
            r.dados = movimentacaoDAO.listByFilter(event);
//        }else {
//            r.dados = produtoDAO.findByNome(termoBusca, event);
//        }
        return Response.ok(r.dados).build();
    }
}
