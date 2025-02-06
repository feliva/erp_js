package br.com.feliva.back.models;

import br.com.feliva.sharedClass.db.Model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="funcionario")
public class Funcionario extends Model<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_funcionario")
    private Integer idFuncionario;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Pessoa pessoa;

    private Status status;

    @Override
    public Integer getMMId() {
        return this.idFuncionario;
    }
}
