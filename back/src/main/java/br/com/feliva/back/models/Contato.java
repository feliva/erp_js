package br.com.feliva.back.models;

import br.com.feliva.sharedClass.db.Model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "contato")
public class Contato extends Model<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_contato")
    private Integer idContato;

    @Column(length = 100)
    @NotNull(message = "Informe um contato.")
    private String nome;

    @NotNull(message = "Informe um e-mail.")
    @Column(length = 100)
    private String email;

    @NotNull(message = "Informe um celular.")
    @Column(length = 100)
    private String celular;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cidade")
    private Cidade cidade;

    @Override
    public Integer getMMId() {
        return this.idContato;
    }
}


