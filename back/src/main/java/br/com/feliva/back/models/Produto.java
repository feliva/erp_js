package br.com.feliva.back.models;

import br.com.feliva.sharedClass.db.Model;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.persistence.*;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.Set;

@Getter
@Entity
@Table(name = "produto")
public class Produto extends Model<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_produto")
    private Integer idProduto;

    private String nome;

    @JsonDeserialize()
    private BigDecimal valorVenda;
    private BigDecimal valor;

    @ManyToOne
    private Unidade unidade;

    public Integer getMMId() {
        return this.idProduto;
    }
}
