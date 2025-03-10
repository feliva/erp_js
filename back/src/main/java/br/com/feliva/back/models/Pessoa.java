package br.com.feliva.back.models;

import br.com.feliva.sharedClass.db.Model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "pessoa")
public class Pessoa extends Model<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pessoa")
    private Integer idPessoa;

    @Column(length = 100)
    @NotNull(message = "Informe um contato.")
    private String nome;

    @NotNull(message = "Informe um e-mail.")
    @Column(length = 100)
    private String email;

    private String cpf;

    @Column(name = "dt_nascimento")
    private LocalDate dtNascimento;

    @Override
    public Integer getMMId() {
        return this.idPessoa;
    }
}


