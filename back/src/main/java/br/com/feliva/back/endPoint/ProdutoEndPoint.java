package br.com.feliva.back.endPoint;

import br.com.feliva.back.dao.ProdutoDAO;
import br.com.feliva.back.dao.UnidadeDAO;
import br.com.feliva.back.models.Produto;
import br.com.feliva.back.models.Resposta;
import br.com.feliva.back.models.Unidade;
import br.com.feliva.back.models.primeng.TableLazyLoadEvent;
import br.com.feliva.back.util.ValidadorUtill;
import jakarta.inject.Inject;
import jakarta.transaction.RollbackException;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/produto")
public class ProdutoEndPoint {

    @Inject
    ProdutoDAO produtoDAO;

    @Inject
    ValidadorUtill validadorUtill;

//    http://localhost:8081/unidade/listAll
//    @Path("/listAll")
//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response listAll(){
//        Resposta r = new Resposta();
//        r.dados = produtoDAO.listAll();
//        return Response.ok(r.dados).build();
//    }

    @Path("/findByNome/{termoBusca}")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response findByNome(@PathParam("termoBusca") String termoBusca, TableLazyLoadEvent event){
        Resposta r = new Resposta();

        if(termoBusca.trim().equals("*")){
            r.dados = produtoDAO.findAll(event);
        }else {
            r.dados = produtoDAO.findByNome(termoBusca, event);
        }
        return Response.ok(r.dados).build();
    }

    @Path("/findById/{idProduto}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findById(@PathParam("idProduto") Integer idProduto){
//        Resposta<Unidade> r = new Resposta<Unidade>();
//        r.dados = unidadeDAO.findById(idUnidade);
        return Response.ok(produtoDAO.findById(idProduto)).build();
    }


    @Path("/{idProduto}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@PathParam("idProduto") String idProduto){
        try {
            Produto p = produtoDAO.findById(Integer.parseInt(idProduto));
            this.produtoDAO.removeT(p);
            return Response.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return  Response.serverError().build();
        }
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response post(Produto produto) throws RollbackException {
        List<String> erros = this.validadorUtill.validar(produto);
        if(!erros.isEmpty()){
            return Resposta.Builder.<Produto>errorValidacao(produto,erros);

        }
        this.produtoDAO.mergeT(produto);
        return Response.ok(Response.Status.ACCEPTED).build();
    }
}
