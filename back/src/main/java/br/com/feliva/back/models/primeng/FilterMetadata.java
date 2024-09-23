package br.com.feliva.back.models.primeng;

import lombok.Getter;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.chrono.IsoChronology;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.format.ResolverStyle;

import static java.time.temporal.ChronoField.*;

@Getter
public class FilterMetadata {

    interface ConverteValue<T>{
        public T converte(String value);
    }

    static class ConverterToDate implements ConverteValue<LocalDate>{

        @Override
        public LocalDate converte(String value) {
            return LocalDate.ofInstant(Instant.parse(value), ZoneOffset.UTC);
        }
    }

    @Getter
    public enum MatchMode{

        dateBefore(new ConverterToDate()," < "),
        dateIs(new ConverterToDate()," = "),
        startsWith(null," ");

        ConverteValue converter;
        String typeOperador;

        MatchMode(ConverterToDate converterToDate,String typeOperador) {
            this.converter = converterToDate;
            this.typeOperador = typeOperador;
        }


    public static String STARTS_WITH = "startsWith";
        public static String CONTAINS = "contains";
        public static String NOT_CONTAINS = "notContains";
        public static String ENDS_WITH = "endsWith";
        public static String EQUALS = "equals";
        public static String NOT_EQUALS = "notEquals";
        public static String IN = "in";
        public static String LESS_THAN = "lt";
        public static String LESS_THAN_OR_EQUAL_TO = "lte";
        public static String GREATER_THAN = "gt";
        public static String GREATER_THAN_OR_EQUAL_TO = "gte";
        public static String BETWEEN = "between";
        public static String IS = "is";
        public static String IS_NOT = "isNot";
        public static String BEFORE = "before";
        public static String AFTER = "after";
        public static String DATE_IS = "dateIs";
        public static String DATE_IS_NOT = "dateIsNot";
        public static String DATE_BEFORE = "dateBefore";
        public static String DATE_AFTER = "dateAfter";
    }

    public enum Operator{
        and(" and "),or(" or ");
        
        public String operador;

        Operator(String operador){
            this.operador = operador;
        }

        public String getOperador() {
            return operador;
        }
    }

    String value;
    /**
     * The match mode for filtering.
     */
    MatchMode matchMode;
    /**
     * The operator for filtering.
     */
    Operator operator;

    public Object geraValor(){
        return this.matchMode.converter.converte(this.value);
    }
}
