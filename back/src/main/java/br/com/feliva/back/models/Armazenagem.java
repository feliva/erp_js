package br.com.feliva.back.models;

import br.com.feliva.sharedClass.db.Model;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "armazenagem")
public class Armazenagem extends Model<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_armazenagem")
    private Integer idArmazenagem;

    @Column(length = 100)
    private String nome;

    @Column(length = 200)
    private String descricao;

    @Override
    public Integer getMMId() {
        return this.idArmazenagem;
    }
}
