package br.com.feliva.back.dto;

import br.com.feliva.back.models.Contato;
import br.com.feliva.back.models.ContatoEmpresa;
import br.com.feliva.back.models.Empresa;
import br.com.feliva.back.models.Endereco;
import br.com.feliva.sharedClass.db.ModelDTO;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmpresaDTO extends ModelDTO<Integer> {

    private Integer idEmpresa;
    private String nomeFantasia;
    private String email;
    private String razaoSocial;
    private String telefone;//Comercial
    private String inscricaoEstadual;
    List<ContatoEmpresaDTO> listContatosEmpresa = new ArrayList<>();
    private Endereco endereco;

    public EmpresaDTO(Empresa empresa) {
        this.idEmpresa = empresa.getIdEmpresa();
        this.nomeFantasia = empresa.getNomeFantasia();
        this.email = empresa.getEmail();
        this.razaoSocial = empresa.getRazaoSocial();
        this.telefone = empresa.getTelefone();
        this.inscricaoEstadual = empresa.getInscricaoEstadual();
        this.endereco = empresa.getEndereco();
    }

    public EmpresaDTO(Integer IdEmpresa) {
        this.idEmpresa = IdEmpresa;
    }

    public void processaListEmpresaContado(Empresa empresa) {
        empresa.getListContatosEmpresa().forEach(contatoEmpresa -> {
            ContatoEmpresaDTO contatoEmpresaDTO = new ContatoEmpresaDTO(contatoEmpresa.getIdContatoEmpresa(),
                    new EmpresaDTO(this.idEmpresa),
                    contatoEmpresa.getContato(),
                    contatoEmpresa.getTipoContatoEmpresa());
            this.listContatosEmpresa.add(contatoEmpresaDTO);
        });
    }

    public Integer getMMId() {
        return this.idEmpresa;
    }
}


