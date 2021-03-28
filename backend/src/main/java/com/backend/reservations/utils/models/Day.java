package com.backend.reservations.utils.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.backend.reservations.utils.View;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;

public class Day {
    
    @JsonView(View.Public.class)
    @JsonProperty("day")
    WeekDay day;

    @JsonView(View.Public.class)
    @JsonProperty("open")
    Boolean open;

    @JsonView(View.Public.class)
    @JsonProperty("operationTimes")
    List<OperationTime> operationTimes = new ArrayList<>();


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Day)) {
            return false;
        }
        Day day = (Day) o;
        return Objects.equals(this.day, day.day);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.day);
    }

    public Day() {
    }

    public Day(WeekDay day, Boolean open, List<OperationTime> operationTimes) {
        this.day = day;
        this.open = open;
        this.operationTimes = operationTimes;
    }

    public WeekDay getDay() {
        return this.day;
    }

    public void setDay(WeekDay day) {
        this.day = day;
    }

    public Boolean isOpen() {
        return this.open;
    }

    public Boolean getOpen() {
        return this.open;
    }

    public void setOpen(Boolean open) {
        this.open = open;
    }

    public List<OperationTime> getOperationTimes() {
        return this.operationTimes;
    }

    public void setOperationTimes(List<OperationTime> operationTimes) {
        this.operationTimes = operationTimes;
    }

    @Override
    public String toString() {
        return "{" +
            " day='" + getDay() + "'" +
            ", open='" + isOpen() + "'" +
            ", operationTimes='" + getOperationTimes() + "'" +
            "}";
    }


}
