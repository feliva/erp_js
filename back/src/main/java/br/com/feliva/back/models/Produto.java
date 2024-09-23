package br.com.feliva.back.models;

import br.com.feliva.sharedClass.db.Model;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;
import java.util.Set;

@Getter
@Entity
@Table(name = "produto")
public class Produto extends Model<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_produto")
    private Integer idProduto;

    @Column(length = 100)
    private String nome;

    @JsonDeserialize()
    @Column(name = "valor_venda")
    private BigDecimal valorVenda;

    @Column(name = "valor_custo")
    private BigDecimal valorCusto;

    @ManyToOne
    @JoinColumn(name = "id_unidade_venda")
    private Unidade unidadeVenda;

    @ManyToOne
    @JoinColumn(name = "id_unidade_compra")
    private Unidade unidadeCompra;

    @ManyToOne
    @JoinColumn(name = "id_marca")
    private Marca marca;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "produtos_tags",
            joinColumns = @JoinColumn(name = "id_produto"),
            inverseJoinColumns = @JoinColumn(name = "id_tag")
    )
    private List<Tags> listaTags;

    @Column(name = "codigo_barras")
    private Long codigoBarras;

    @Size(max = 500)
    private String descricao;

    @NotNull(message = "Informe um status.")
    @Enumerated(EnumType.STRING)
    @Column(length = 3)
    private Status status;

    public Integer getMMId() {
        return this.idProduto;
    }
}
