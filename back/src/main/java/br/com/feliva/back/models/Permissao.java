package br.com.feliva.back.models;

import br.com.feliva.sharedClass.db.Model;
import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.Set;

@Getter
@Entity
@Table(name = "permissao")
public class Permissao extends Model<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_permissao")
    private Integer idPermissao;
    private String nome;

    @JsonbTransient
    @ManyToMany(mappedBy = "listPermissoes")
    private Set<Usuario> listUsuarios;

    @JsonbTransient
    public Integer getId() {
        return this.idPermissao;
   }

    public void setIdPermissao(Integer idPrmissao) {
        this.idPermissao = idPrmissao;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setListUsuarios(Set<Usuario> listUsuarios) {
        this.listUsuarios = listUsuarios;
    }

    @Override
    public Integer getMMId() {
        return this.idPermissao;
    }
}
