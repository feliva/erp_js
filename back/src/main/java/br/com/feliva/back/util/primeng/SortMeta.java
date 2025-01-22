package br.com.feliva.back.util.primeng;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SortMeta {
    String field;
    Integer order;


    public String getOrderDesc(){
        return (order > 0 ?" desc":" asc");
    }
}
