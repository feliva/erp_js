package br.com.feliva.back.endPoint;

import br.com.feliva.back.dao.UsuarioDAO;
import br.com.feliva.back.models.Resposta;
import br.com.feliva.back.models.Usuario;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.RollbackException;
import jakarta.validation.constraints.Min;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/usuario")
public class UsuarioEndPoint {

    @Inject
    UsuarioDAO usuarioDAO;

//    http://localhost:8081/usuario/listAll
    @Path("/listAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"manager"})
    public Response listAll(){
        Resposta r = new Resposta();
        r.dados = usuarioDAO.listAll();
        return Response.ok(r).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response post(Usuario user){
        System.out.println("Post");
        System.out.println(user);

        try {
            usuarioDAO.merge(user);
        } catch (RollbackException e) {
            e.printStackTrace();
        }
        return Response.ok().build();
    }

    @POST
    @Path("/findByName")
    @Produces(MediaType.APPLICATION_JSON)
//    @Consumes(MediaType.APPLICATION_FORM_URLENCODED) não precisa desse
    public Response findByName(@FormParam("nome") String nome){

        System.out.println("findByName + " + nome);
        List<Usuario> l = usuarioDAO.findByName(nome);
        return Response.ok(l).build();
    }

    @GET
    @Path("/findById/{idUsuario}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findById(@PathParam("idUsuario") Integer idUsuario){
        Usuario u = usuarioDAO.findById(idUsuario);
        return Response.ok(u).build();
    }
}
