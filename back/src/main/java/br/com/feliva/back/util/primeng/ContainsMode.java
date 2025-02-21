package br.com.feliva.back.util.primeng;


class ContainsMode implements Mode {

    @Override
    public Object converte(Object value) {
        return "%" + value + "%";
    }
}
