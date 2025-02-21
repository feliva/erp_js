package br.com.feliva.back.util;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class FormFilter {

    Integer first;
    Integer rows;

    Map<String,String> listFilter;
    Map<String,String> listSort;

    @JsonIgnore
    Map<String,Object> listParans = new HashMap<>();

    //segurança
    public void setListParans(){}

}
