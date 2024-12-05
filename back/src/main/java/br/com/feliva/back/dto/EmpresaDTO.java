package br.com.feliva.back.dto;

import br.com.feliva.back.models.Contato;
import br.com.feliva.back.models.Empresa;
import br.com.feliva.back.models.Endereco;
import br.com.feliva.sharedClass.db.Model;
import br.com.feliva.sharedClass.db.ModelDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Set;

//public record EmpresaDTO(Integer idEmpresa,
//                         String nomeFantasia,
//                         String email,
//                         String razaoSocial,
//                         String telefone,
//                         String inscricaoEstadual,
//                         Endereco endereco) {
//}

import br.com.feliva.sharedClass.db.Model;
import jakarta.persistence.*;
        import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

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
    private Set<Contato> setContatos;
    private Endereco endereco;

    public EmpresaDTO(Empresa empresa) {
        this.idEmpresa = empresa.getIdEmpresa();
        this.nomeFantasia = empresa.getNomeFantasia();
        this.email = empresa.getEmail();
        this.razaoSocial = empresa.getRazaoSocial();
        this.telefone = empresa.getTelefone();
        this.inscricaoEstadual = empresa.getInscricaoEstadual();
//        this.setContatos = ;
        this.endereco = empresa.getEndereco();
    }

    public Integer getMMId() {
        return this.idEmpresa;
    }
}


