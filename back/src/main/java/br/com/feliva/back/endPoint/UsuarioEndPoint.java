package br.com.feliva.back.endPoint;

import br.com.feliva.dao.UsuarioDAO;
import br.com.feliva.models.Resposta;
import br.com.feliva.models.Usuario;
import jakarta.inject.Inject;
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

        usuarioDAO.merge(user);
        return Response.ok().build();
    }

    @POST
    @Path("/findByName")
    @Produces(MediaType.APPLICATION_JSON)
//    @Consumes(MediaType.APPLICATION_FORM_URLENCODED) não precisa desse
    public Response findByName(@FormParam("nome") String nome){
        List<Usuario> l = usuarioDAO.findByName(nome);
        return Response.ok(l).build();
    }

    @GET
    @Path("/findById/{idUsuario}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findById(@PathParam("idUsuario") Long idUsuario){
        Usuario u = usuarioDAO.findById(idUsuario);
        return Response.ok(u).build();
    }
}
