package br.com.feliva.back.models;

import br.com.feliva.sharedClass.db.Model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
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

//    @NotNull(message = "Informe um telefone.")
//    @Column(length = 100)
//    private String telefone;


    @Override
    public Integer getMMId() {
        return this.idContato;
    }
}


