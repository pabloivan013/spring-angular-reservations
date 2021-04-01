package com.backend.reservations.utils.models;

import java.util.HashMap;
import java.util.Map;

import com.backend.reservations.utils.View;
import com.fasterxml.jackson.annotation.JsonView;

@JsonView(View.Public.class)
public enum WeekDay {
    SUNDAY(0) ,
    MONDAY(1) ,
    TUESDAY(2),
    WEDNESDAY(3),
    THURSDAY(4),
    FRIDAY(5), 
    SATURDAY(6);  

    private int value;
    private static Map<Integer, WeekDay> map = new HashMap<>();
    
    private WeekDay(int value) {
        this.value = value;
    }

    static {
        for (WeekDay weekDay : WeekDay.values()) {
            map.put(weekDay.value, weekDay);
        }
    }

    public static WeekDay valueOf(int weekDay) {
        return map.get(weekDay);
    }

    public int getValue() {
        return this.value;
    }


}

