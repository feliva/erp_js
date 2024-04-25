package br.com.feliva.back;


import org.hibernate.context.spi.CurrentTenantIdentifierResolver;

public abstract class MuiltitenancyResolver implements CurrentTenantIdentifierResolver<String> {

    protected String tenantIdentifier;


    public void setTenantIdentifier(String tenantIdentifier) {
        this.tenantIdentifier = tenantIdentifier;
    }
}