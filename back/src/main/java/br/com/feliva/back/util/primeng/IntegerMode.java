package br.com.feliva.back.util.primeng;

class IntegerMode implements Mode {

    @Override
    public Object converte(Object value) {
        return Integer.parseInt((String) value);
    }
}
