package br.com.feliva.back.util.primeng;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Setter
public class FilterMetaData {

    private String value;
    private MatchMode matchMode;
    private Operator operator;

    @JsonIgnore
    private String psName;

    public void geraPSName(Integer seq){
        this.psName = "ps_"+seq;
    }

    public Object geraValor(){
        return this.matchMode.getMode().converte(this.value);
    }
}
