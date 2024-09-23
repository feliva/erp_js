package br.com.feliva.back.models;

import br.com.feliva.sharedClass.db.Model;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.deser.std.EnumDeserializer;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "unidade")
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Unidade extends Model<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_unidade")
    public Integer idUnidade;

    @NotEmpty(message = "Informe uma descrição.")
    public String descricao;

    @NotEmpty(message = "Informe uma sigla.")
    @Size(min = 3,message = "Sigla deve ter no mínimo 3 caracteres.")
    public String sigla;

    public Integer quantidade;

    @NotNull(message = "Informe um status.")
    @Enumerated(EnumType.STRING)
    public Status status;


    @Override
    public Integer getMMId() {
        return this.idUnidade;
    }
}
