package br.com.feliva.back.models;

import br.com.feliva.sharedClass.db.Model;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "tipo_justificativa_motivacao")
public class TipoJustificativaMovimentacao extends Model<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_tipo_justificativa_motivacao")
    private Integer idTipoJustificativaMovimentacao;

    @Column(length = 200)
    private String descricao;

    @Override
    public Integer getMMId() {
        return this.idTipoJustificativaMovimentacao;
    }
}
