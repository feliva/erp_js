package br.com.feliva.back.util.primeng;

import lombok.Getter;

@Getter
public enum MatchMode{

    dateBefore(new ConverterToDate()," < "),
    dateIs(new ConverterToDate()," = "),
    startsWith(new StartWithMode()," ilike "),
    equals(new TextMode()," = "),
    contains(new ContainsMode()," ilike ");

    private Mode<?> mode;
    private String typeOperador;

    MatchMode(Mode<?> mode,String typeOperador) {
        this.mode = mode;
        this.typeOperador = typeOperador;
    }
}
