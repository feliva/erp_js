package br.com.feliva.back.models;

import br.com.feliva.sharedClass.db.Model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tipo_contato_empresa")
@Deprecated
public class TipoContatoEmpresa extends Model<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo_contato_empresa")
    private Integer idTipoContatoEmpresa;

    @Column(length = 50,name = "descrisao")
    private String descrisao;

    @Override
    public Integer getMMId() {
        return this.idTipoContatoEmpresa;
    }
}


