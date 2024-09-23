package br.com.feliva.back.models;

import br.com.feliva.sharedClass.db.Model;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "marca")
public class Marca extends Model<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_marca")
    private Integer idMarca;

    @Column(length = 100)
    private String nome;

    @ManyToOne
    @JoinColumn(name = "id_fabricante")
    private Fabricante fabricante;

    @Override
    public Integer getMMId() {
        return this.idMarca;
    }
}
