package br.com.feliva.back.models;

import br.com.feliva.sharedClass.db.Model;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

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
    @JoinColumn(name = "id_pessoa")
    @Valid
    private Pessoa pessoa;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_endereco")
    @Valid
    private Endereco endereco;

//    @NotNull(message = "Informe um status.")
    @Enumerated(EnumType.STRING)
    @Column(length = 3)
    private Status status;

    @Column(name = "dt_contratacao")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", locale = "pt_br")
    private LocalDate dtContratacao;

    private String telefone;
    private String celular;

    @Override
    public Integer getMMId() {
        return this.idFuncionario;
    }
}
