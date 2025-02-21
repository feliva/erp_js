package br.com.feliva.back.util.primeng;

interface Mode {
    public Object converte(Object value);
}

//class ConverterToDate implements Mode<LocalDate> {
//
//    @Override
//    public LocalDate converte(String value) {
//        return LocalDate.ofInstant(Instant.parse(value), ZoneOffset.UTC);
//    }
//}
//
//class StartWithMode implements Mode<String> {
//
//    @Override
//    public String converte(String value) {
//        return value + "%";
//    }
//}


