package br.com.feliva.back;

import org.hibernate.context.spi.CurrentTenantIdentifierResolver;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class DatabaseTenantResolver extends MuiltitenancyResolver {

    private Map<String, String> userDatasourceMap;

    public DatabaseTenantResolver(){
        userDatasourceMap = new HashMap<>();
        userDatasourceMap.put("erp", "erpDS");
        userDatasourceMap.put("um", "erpUmDS");
        userDatasourceMap.put("dois", "erpDoisDS");
    }

    @Override
    public String resolveCurrentTenantIdentifier() {


        if(this.tenantIdentifier != null
                && userDatasourceMap.containsKey(this.tenantIdentifier)){
            return userDatasourceMap.get(this.tenantIdentifier);
        }

        return userDatasourceMap.get("erp");

    }


    public boolean validateExistingCurrentSessions() {
        return false;
    }

}