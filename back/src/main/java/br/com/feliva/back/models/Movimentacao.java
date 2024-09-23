package br.com.feliva.back.models;

import br.com.feliva.sharedClass.db.Model;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.json.bind.annotation.JsonbDateFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Locale;

@Getter
@Entity
@Table(name = "movimentacao")
public class Movimentacao extends Model<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_movimentacao")
    private Integer idMovimentacao;

    @Column(length = 200)
    private String descricao;

    @Column(name = "dt_movimentacao")
//    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") para localdate time
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", locale = "pt_br")
    private LocalDate dtMovimentacao;

    @NotNull(message = "Informe uma movimentação.")
    @Enumerated(EnumType.STRING)
    @Column(length = 3,name = "tipo_movimentacao")
    private TipoMovimentacao tipoMovimentacao;

    @ManyToOne
    @JoinColumn(name = "id_armazenagem")
    private Armazenagem armazenagem;

    @ManyToOne
    @JoinColumn(name = "id_tipo_justificativa_movimentacao")
    private TipoJustificativaMovimentacao tipoJustificativaMovimentacao;

    @ManyToOne
    @JoinColumn(name = "id_produto")
    private Produto produto;

    private Integer quantidade;

    @Override
    public Integer getMMId() {
        return this.idMovimentacao;
    }
}
