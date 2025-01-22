package br.com.feliva.back.util.primeng;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LazyConsultConfig {

    String join;

    String where;
    String orderBy;

    public LazyConsultConfig(String join, String where, String orderBy) {
        this.join = join;
        this.where = where;
        this.orderBy = orderBy;
    }
}
