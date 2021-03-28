package com.backend.reservations.utils.models;

//import java.sql.LocalDateTime;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import com.backend.reservations.utils.DateUtils;
import com.backend.reservations.utils.ResponseException;
import com.backend.reservations.utils.View;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;

public class OperationTime {

    @JsonView(View.Public.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    @JsonProperty("start")
    LocalDateTime start;

    @JsonView(View.Public.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    @JsonProperty("end")
    LocalDateTime end;

    // Interval minutes
    @JsonView(View.Public.class)
    @JsonProperty("intervalTime")
    int intervalTime;

    public OperationTime() {
    }

    public OperationTime(LocalDateTime start, LocalDateTime end, int intervalTime) {
        this.start = start;
        this.end = end;
        this.intervalTime = intervalTime;
    }

    public void truncateStartEndDates() {
        this.start = DateUtils.truncateDate(this.start);
        this.end   = DateUtils.truncateDate(this.end);
    }

    public void validate() throws ResponseException {
        
        if (this.start.isAfter(this.end) || this.start.isEqual(this.end))
            throw new ResponseException("The open time should be less than the close time");
        
        long diff = ChronoUnit.MINUTES.between(this.start, this.end);
        System.out.println("DIFF: " + diff);
        
        if (this.intervalTime <= 0 || this.intervalTime > diff)
            throw new ResponseException("The interval time should be between the open and close time.");

    }

    // Serialize (from object to json)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:00.000'Z'")
    public LocalDateTime getStart() {
        return this.start;
    }

    // Deserialize (from json to object)
    public void setStart(LocalDateTime start) {
        this.start = start;
    }

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:00.000'Z'")
    public LocalDateTime getEnd() {
        return this.end;
    }

    public void setEnd(LocalDateTime end) {
        this.end = end;
    }

    public int getIntervalTime() {
        return this.intervalTime;
    }

    public void setIntervalTime(int intervalTime) {
        this.intervalTime = intervalTime;
    }

    @Override
    public String toString() {
        return "{" +
            " start='" + getStart() + "'" +
            ", end='" + getEnd() + "'" +
            "}";
    }

}
