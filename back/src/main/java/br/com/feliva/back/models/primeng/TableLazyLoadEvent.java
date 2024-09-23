package br.com.feliva.back.models.primeng;

import lombok.Getter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Getter
public class TableLazyLoadEvent {

//    Number first;
//    Number last;

//LazyLoadMeta
    int first;
    int rows;
    List<String> sortField;
    int sortOrder;
//    String filters;
    Map<String,FilterMetadata[]> filters = new HashMap<>();
//        [s: string]: FilterMetadata | FilterMetadata[] | undefined;
//    };
    List<String> globalFilter;
//    multiSortMeta?: SortMeta[] | undefined | null;
    String forceUpdate;
    int last;

    public int getRows(){
        if(this.rows > 1000){
            return 1000;
        }
        return this.rows;
    }

}
