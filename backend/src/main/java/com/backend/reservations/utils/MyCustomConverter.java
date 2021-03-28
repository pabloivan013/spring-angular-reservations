package com.backend.reservations.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import javax.persistence.AttributeConverter;

import com.backend.reservations.utils.models.Schedule;
import com.fasterxml.jackson.databind.ObjectMapper;


import org.springframework.lang.NonNull;

@javax.persistence.Converter
public class MyCustomConverter implements AttributeConverter<Schedule, String> {

    private final static DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

    ObjectMapper objectMapper;

    MyCustomConverter(ObjectMapper objectMapper) {
        objectMapper.setDateFormat(df);
        this.objectMapper = objectMapper;
    }

    // private final static ObjectMapper objectMapper = new ObjectMapper()
    //     .registerModule(new ParameterNamesModule())
    //     .registerModule(new Jdk8Module())
    //     .registerModule(new JavaTimeModule()) // new module, NOT JSR310Module
    //     .setDateFormat(df); 

    @Override
    @NonNull
    public String convertToDatabaseColumn(@NonNull Schedule myCustomObject) {
        try {
            return objectMapper.writeValueAsString(myCustomObject);
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    @NonNull
    public Schedule convertToEntityAttribute(@NonNull String databaseDataAsJSONString) {
        try {
            return objectMapper.readValue(databaseDataAsJSONString, Schedule.class);
        } catch (Exception ex) {
            return null;
        }
    }
    
}
