package producers;


import br.com.feliva.back.MuiltitenancyResolver;
import jakarta.annotation.Resource;
import jakarta.enterprise.context.RequestScoped;
import jakarta.enterprise.inject.Default;
import jakarta.enterprise.inject.Disposes;
import jakarta.enterprise.inject.Produces;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceUnit;
import org.hibernate.engine.spi.SessionFactoryImplementor;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.io.Serializable;
import java.sql.Connection;
import java.sql.SQLException;


//@Eager
@RequestScoped
public class ProducerConnect implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@PersistenceUnit(name = "erpUnit")
	private static EntityManagerFactory emERP;

//	@PersistenceContext(unitName = "authUnit")
//    @Produces
//	@Default
//	private static EntityManager em;
	
//	@Resource(mappedName = "java:jboss/datasources/authDS") // same JNDI used by Hibernate Persistence Unit
//	private static DataSource dss;

	@Produces
	protected EntityManager getEntityManager(){

		final MuiltitenancyResolver tenantResolver = (MuiltitenancyResolver) ((SessionFactoryImplementor) emERP).getCurrentTenantIdentifierResolver();
		tenantResolver.setTenantIdentifier("erp");

		return emERP.createEntityManager();
	}
	

//	public void close(@Disposes Connection com) {
//		try {
//			if(!com.isClosed()) {
//				com.close();
//			}
//		} catch (SQLException e) {
//			e.printStackTrace();
//		}
//	}

//	@Produces
//	public static Connection getConnection() throws SQLException {
//		if(dss == null) {
//	        try {
//	            Context ctx = new InitialContext();
//	            dss = (DataSource) ctx.lookup("java:jboss/datasources/baseDS");
//	        }catch (NamingException e) {
//	            e.printStackTrace();
//	        }
//	    }
//
//
//		return dss.getConnection();
//	}
}