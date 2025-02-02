package br.com.feliva.back.models;

import br.com.feliva.sharedClass.db.Model;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Post {
    List<? extends Model> listUpdate;
    List<? extends Model> listInsert;
    List<? extends Model> listDelite;
}
