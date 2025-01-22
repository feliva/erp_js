package br.com.feliva.back.dao;

import br.com.feliva.back.models.Movimentacao;
import br.com.feliva.back.util.primeng.TableLazyLoadEvent;
import br.com.feliva.sharedClass.db.DAO;
import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.NoResultException;
import jakarta.persistence.Query;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestScoped
public class MovimentacaoDAO extends DAO<Movimentacao> {


    public List<Movimentacao> listAll(){
        try {
            return this.em.createQuery("""
                        select m from Movimentacao m order by m.dtMovimentacao asc
                    """).getResultList();
        }catch (NoResultException e){
            return null;
        }
    }

    public Long getTotalEstoqueProduto(Integer idProduto) {
        try {
            return (long)this.em.createNativeQuery("""
                    select 
                    (select sum(quantidade) from movimentacao m where id_produto = :idProduto and tipo_movimentacao = 'ENT')
                    -
                    (select sum(quantidade) from movimentacao m where id_produto = :idProduto and tipo_movimentacao = 'SAI')
                    """)
                    .setParameter("idProduto",idProduto)
                    .getSingleResult();
        }catch (NoResultException e){
            return 0L;
        }
    }

    public class FieldConfig{
        String where;

        FieldConfig(String where){
            this.where = where;
        }
    }

    public List<Movimentacao> listByFilter(TableLazyLoadEvent event){

        Map<String,String> filtersFilds = new HashMap<>();
        Map<String,Object> params = new HashMap<>();
        filtersFilds.put("produto.nome"," p.nome ");
        filtersFilds.put("dtMovimentacao"," m.dtMovimentacao ");
        String hql = """
                select m from Movimentacao m
                left join fetch m.produto p
                left join fetch m.armazenagem a
                left join fetch m.tipoJustificativaMovimentacao tjm
                """;

            StringBuffer where = new StringBuffer();

//        event.getFilters().forEach((var key, var value)->{
//            switch (key){
//                case "dtMovimentacao":
//                    Integer index = 0;
////                    for(FilterMetaData filter : value) {
////                        index++;
////                        where.append(filtersFilds.get(key) + filter.getMatchMode().getTypeOperador() + " :" + key + index);
////                        params.put(key + index,filter.geraValor());
////                    }
//
//            }
//        });

        if(where.length() >0){
            where.insert(0," where ");
        }

        Query q = this.em.createQuery(hql + where);
        params.forEach(q::setParameter);


        return q.getResultList();
    }

}