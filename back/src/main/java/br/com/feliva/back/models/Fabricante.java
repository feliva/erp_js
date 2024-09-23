package br.com.feliva.back.models;

import br.com.feliva.sharedClass.db.Model;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "fabricante")
public class Fabricante extends Model<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_fabricante")
    private Integer idFabricante;

    @Column(length = 100)
    private String nome;

    @Override
    public Integer getMMId() {
        return this.idFabricante;
    }
}
