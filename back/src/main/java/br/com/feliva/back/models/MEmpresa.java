package br.com.feliva.back.models;

import br.com.feliva.sharedClass.db.Model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "m_empresa")
public class MEmpresa extends Model<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_m_empresa")
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

    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "id_endereco")
    private Endereco endereco;

    @ManyToOne
    @JoinColumn(name = "id_funcionario")
    private Funcionario funcionario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_matriz")
    private MEmpresa matriz;

    @Override
    public Integer getMMId() {
        return this.idEmpresa;
    }
}


