package br.com.feliva.back.util.primeng;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.BeanProperty;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.deser.ContextualDeserializer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class WrapperDeserializer extends JsonDeserializer<Map<?,?>> implements ContextualDeserializer {

    private JavaType type;

    private Map<String, List<FilterMetaData>> map;
    private List<FilterMetaData> currentList = null;
    private String currentKey = null;

    public WrapperDeserializer() {
        // Default constructor
    }

    private WrapperDeserializer(JavaType type) {
        this.type = type;
    }

    @Override
    public JsonDeserializer<?> createContextual(DeserializationContext ctxt, BeanProperty property) {
        JavaType wrapperType = property.getType().containedType(0);
        return new WrapperDeserializer(wrapperType);
    }

    @Override
    public Map<?,?> deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        this.currentKey = null;
        this.currentList = null;
        map =  new HashMap<>();
        this.startObject(jsonParser,deserializationContext);
        return this.map;
    }

    void print(JsonParser jsonParser) throws IOException {
        System.out.println(jsonParser.currentToken());
        System.out.println(jsonParser.currentName());
        System.out.println(jsonParser.currentValue());
        System.out.println("----");
    }

    public void startObject(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        while (true) {
            jsonParser.nextToken();
            switch (jsonParser.currentToken()) {
                case FIELD_NAME:
                    if (!jsonParser.currentName().equals(currentKey)) {
                        this.currentKey = jsonParser.currentName();
                        this.currentList = new ArrayList<>();
                        this.map.put(this.currentKey, currentList);
                    }
                    break;
                case START_ARRAY:
                    this.array(jsonParser, deserializationContext);
                    break;
                case START_OBJECT:
                    readFilter(jsonParser, deserializationContext);
                    break;
                case END_OBJECT:
                    return;
            }
        }
    }

    public void array(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        while (true) {
            jsonParser.nextToken();
            switch (jsonParser.currentToken()) {
                case START_OBJECT:
                    readFilter(jsonParser, deserializationContext);
                    break;
                case END_ARRAY:
                    this.currentKey = null;
                    this.currentList = null;
                    return;
            }
        }
    }

    public void readFilter(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        FilterMetaData fmd = deserializationContext.readValue(jsonParser, FilterMetaData.class);
        if(fmd.getValue() != null) {
            this.currentList.add(fmd);
        }
    }
}