package br.com.feliva.back.models;

import br.com.feliva.sharedClass.db.Model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "endereco")
public class Endereco extends Model<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_endereco")
    private Integer idEndereco;

    @Column(length = 9)
    @NotNull(message = "Informe um cep.")
    private String cep;

    @NotNull(message = "Informe uma cidade.")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cidade")
    private Cidade cidade;

    @NotNull(message = "Informe um bairro.")
    @Column(length = 50)
    private String bairro;

    @NotNull(message = "Informe um logradouro.")
    @Column(length = 50)
    private String logradouro;

    @NotNull(message = "Informe o numero do endereço.")
    @Column(length = 30)
    private String numero;

    @Column(length = 50)
    private String complemento;

    @Override
    public Integer getMMId() {
        return this.idEndereco;
    }
}


