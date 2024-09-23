package br.com.feliva.back.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

//@Getter
//@Entity
//@Table(name = "status")
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum TipoMovimentacao {
    ENT("Entrada"),
    SAI("Saída"),
    ALL("Todos");

    private String descricao;

    TipoMovimentacao(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getNome() {
        return this.name();
    }

    @JsonCreator
    public static TipoMovimentacao fromJson(@JsonProperty("nome") String name) {
        return valueOf(name);
    }
}
