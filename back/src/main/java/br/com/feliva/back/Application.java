package br.com.feliva.back;

import jakarta.annotation.security.DeclareRoles;
import jakarta.ws.rs.ApplicationPath;
import org.eclipse.microprofile.auth.LoginConfig;

@ApplicationPath("/")
@LoginConfig(authMethod = "MP-JWT",realmName = "feliva")
@DeclareRoles({ "manager" })
public class Application extends jakarta.ws.rs.core.Application {

}