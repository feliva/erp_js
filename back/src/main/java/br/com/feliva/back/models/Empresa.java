package br.com.feliva.back.models;

import br.com.feliva.sharedClass.db.Model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "empresa")
public class Empresa extends Model<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_empresa")
    private Integer idEmpresa;

    @Column(length = 100,name = "nome_fantasia")
    @NotNull(message = "Informe um nome fantasia.")
    private String nomeFantasia;

    @NotNull(message = "Informe um e-mail.")
    @Column(length = 100)
    private String email;

    @NotNull(message = "Informe a razão social.")
    @Column(length = 100, name = "razao_social")
    private String razaoSocial;

    @Column(length = 100)
    private String telefone;//Comercial

    @Column(length = 100,name = "inscricao_estadual")
    private String inscricaoEstadual;

    @ManyToMany(fetch = FetchType.LAZY,cascade = {CascadeType.REMOVE,CascadeType.PERSIST})
    @JoinTable(name="empresa_contato", joinColumns={@JoinColumn(name="id_empresa")},
            inverseJoinColumns= {@JoinColumn(name="id_contato")})
    private Set<Contato> listContatos;

    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "id_endereco")
    private Endereco endereco;

    @Override
    public Integer getMMId() {
        return this.idEmpresa;
    }
}


