package br.com.feliva.back.interfaces;

import br.com.feliva.back.util.primeng.LazyConsultConfig;
import br.com.feliva.back.util.primeng.SortMeta;
import br.com.feliva.back.util.primeng.TableLazyLoadEvent;
import br.com.feliva.sharedClass.db.Model;
import jakarta.transaction.RollbackException;

import java.util.List;
import java.util.Map;

@SuppressWarnings("all")
public interface ComunDAO<M extends Model<?>> {

    public List<M> listAll();

    public M findById(Integer id);

    public <T> void mergeT(T entity) throws RollbackException;

    public void removeT (M entity)throws RollbackException;

    public List<M> tableLazyLoad(TableLazyLoadEvent filters);
    public Integer tableLazyLoadCount(TableLazyLoadEvent filters);

    default     public String geraOrderBy(TableLazyLoadEvent event, Map lCConfigs){
        StringBuffer orderBy = new StringBuffer(" order by ");

        if(event.getMultiSortMeta() == null){
            LazyConsultConfig lcc = (LazyConsultConfig) lCConfigs.get(event.getSortField());
            orderBy.append(lcc.getOrderBy());
            orderBy.append(event.getSortOrderDesc());
            return orderBy.toString();
        }

        for(SortMeta sort : event.getMultiSortMeta()){
            LazyConsultConfig lcc = (LazyConsultConfig) lCConfigs.get(sort.getField());

            if(lcc != null){
                orderBy.append(lcc.getOrderBy());
                orderBy.append(sort.getOrderDesc());
                orderBy.append(", ");
            }
        }

        return orderBy.toString().substring(0, orderBy.length()-2);
    }
}