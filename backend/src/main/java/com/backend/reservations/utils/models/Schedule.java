package com.backend.reservations.utils.models;

import java.util.*;

import com.backend.reservations.utils.ResponseException;
import com.backend.reservations.utils.View;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;


public class Schedule {

    @JsonView(View.Public.class)
    @JsonProperty("days")
    Set<Day> days = new HashSet<Day>();

    @JsonView(View.Public.class)
    @JsonProperty("offset")
    int offset;

    public Schedule() {
    }

    public void validate() throws ResponseException{
        
        Set<WeekDay> _weekDays = new HashSet<>();

        for(Day d : this.days) {
            _weekDays.add(d.day);
            if (d.open) {
                for(OperationTime ot : d.operationTimes) {
                    ot.truncateStartEndDates();
                    ot.validate();
                }
            }
        }

        for(WeekDay wk: WeekDay.values()){
            if (!_weekDays.contains(wk)) 
                throw new ResponseException("The schedule is not containing the " + wk + " day");
        }

    }

    public Schedule(Set<Day> days, int offset) {
        this.days = days;
        this.offset = offset;
    }

    public Set<Day> getDays() {
        return this.days;
    }

    public void setDays(Set<Day> days) {
        this.days = days;
    }


    public int getOffset() {
        return this.offset;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    @Override
    public String toString() {
        return "{" +
            " days='" + getDays() + "'" +
            ", offset='" + getOffset() + "'" +
            "}";
    }

}