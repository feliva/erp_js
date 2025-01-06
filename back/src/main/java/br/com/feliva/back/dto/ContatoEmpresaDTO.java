package br.com.feliva.back.dto;

import br.com.feliva.back.models.Contato;
import br.com.feliva.back.models.ContatoEmpresa;
import br.com.feliva.back.models.Empresa;
import br.com.feliva.back.models.TipoContatoEmpresa;
import br.com.feliva.sharedClass.db.Model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ContatoEmpresaDTO extends Model<Integer> {

    private Integer idContatoEmpresa;
    private EmpresaDTO empresa;
    private Contato contato;
    private TipoContatoEmpresa tipoContatoEmpresa;

    public ContatoEmpresaDTO(Integer idContatoEmpresa, EmpresaDTO empresa, Contato contato, TipoContatoEmpresa tipoContatoEmpresa) {
        this.idContatoEmpresa = idContatoEmpresa;
        this.empresa = empresa;
        this.contato = contato;
        this.tipoContatoEmpresa = tipoContatoEmpresa;
    }

    public Integer getMMId() {
        return this.idContatoEmpresa;
    }

}


