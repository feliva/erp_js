package br.com.feliva.back.models;

import br.com.feliva.back.endPoint.StatusEndPoint;
import br.com.feliva.sharedClass.db.Model;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;

//@Getter
//@Entity
//@Table(name = "status")
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum Status {
    ATV("Ativo"),INT("Inativo");

    private String descricao;

    Status(String descricao){
        this.descricao = descricao;
    }


    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getNome(){
        return this.name();
    }

    @JsonCreator
    public static Status fromJson(@JsonProperty("nome") String name) {
        return valueOf(name);
    }
}
