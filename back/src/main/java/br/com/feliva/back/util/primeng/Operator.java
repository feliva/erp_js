package br.com.feliva.back.util.primeng;

import lombok.Getter;

@Getter
public enum Operator{
    and(" and "),
    or(" or ");

    public String operador;

    Operator(String operador){
        this.operador = operador;
    }

}