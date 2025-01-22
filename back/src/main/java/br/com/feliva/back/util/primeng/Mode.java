package br.com.feliva.back.util.primeng;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;

interface Mode<T> {
    public T converte(String value);
}

class ConverterToDate implements Mode<LocalDate> {

    @Override
    public LocalDate converte(String value) {
        return LocalDate.ofInstant(Instant.parse(value), ZoneOffset.UTC);
    }
}

class StartWithMode implements Mode<String> {

    @Override
    public String converte(String value) {
        return value + "%";
    }
}

class ContainsMode implements Mode<String> {

    @Override
    public String converte(String value) {
        return "%" + value + "%";
    }
}

class TextMode implements Mode<String> {

    @Override
    public String converte(String value) {
        return value;
    }
}
