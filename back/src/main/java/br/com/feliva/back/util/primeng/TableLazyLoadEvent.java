package br.com.feliva.back.util.primeng;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class TableLazyLoadEvent {

    private Integer first;
    private Integer rows;
    private String sortField;
    private Integer sortOrder;

    @JsonDeserialize(using = WrapperDeserializer.class)
    private Map<String, List<FilterMetaData>> filters = new HashMap<>();

    private String globalFilter;
    private List<SortMeta> multiSortMeta;
    private Integer last;


    public String getSortOrderDesc(){
        return (sortOrder > 0 ?" desc":" asc");
    }
}
