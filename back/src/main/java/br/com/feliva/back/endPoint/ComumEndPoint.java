package br.com.feliva.back.endPoint;

import br.com.feliva.back.interfaces.ComunDAO;
import br.com.feliva.back.models.Resposta;
import br.com.feliva.back.util.ValidadorUtill;
import br.com.feliva.sharedClass.db.DAO;
import br.com.feliva.sharedClass.db.Model;
import jakarta.inject.Inject;
import jakarta.transaction.RollbackException;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

public abstract class ComumEndPoint<I extends DAO<M>, M extends Model<?>> {

    @Inject
    ValidadorUtill validadorUtill;

    protected abstract ComunDAO<M> getDao();

    @Path("/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findById(@PathParam("id") Integer id){
        try {
            M entity = (M) this.getDao().findById(id);
            if(entity == null){
                return Resposta.buildResponse(id, Resposta.Error.ENTIDADE_NAO_ENCONTRADA);
            }
            return Response.ok(entity).build();
        }catch (Exception e){
            System.out.println(e.getMessage());
            return Resposta.buildResponse(id, Resposta.Error.INTERNAL_SERVER_ERROR);
        }
    }

    @Path("/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@PathParam("id") Integer id){
        try {
            M p = (M) this.getDao().findById(id);
            if(p == null){
                return Resposta.buildResponse(id, Resposta.Error.ENTIDADE_NAO_ENCONTRADA);
            }
            this.getDao().removeT(p);
            return Response.ok().build();
        } catch (Exception e) {
            return Resposta.buildResponse(id, Resposta.Error.INTERNAL_SERVER_ERROR);
        }
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public  Response  post(M obj) throws RollbackException {
        List<String> erros = this.validadorUtill.validar(obj);
        if(!erros.isEmpty()){
            return Resposta.Builder.errorValidacao( obj,erros);

        }
        this.getDao().mergeT(obj);
        return Response.ok(Response.Status.ACCEPTED).build();
    }

}
