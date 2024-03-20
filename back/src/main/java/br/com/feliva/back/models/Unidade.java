package br.com.feliva.back.models;

import br.com.feliva.sharedClass.db.Model;
import jakarta.persistence.*;
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
    public String descricao;

    public String sigla;
    public String status;


    @Override
    public Integer getMMId() {
        return this.idUnidade;
    }
}
