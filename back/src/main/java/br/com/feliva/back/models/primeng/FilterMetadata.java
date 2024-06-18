package br.com.feliva.back.models.primeng;

import lombok.Getter;

@Getter
public class FilterMetadata {

    String value;
    /**
     * The match mode for filtering.
     */
    String matchMode;
    /**
     * The operator for filtering.
     */
    String operator;
}
