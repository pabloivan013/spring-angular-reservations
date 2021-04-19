package com.backend.reservations.utils.models;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import com.backend.reservations.utils.DateUtils;
import com.backend.reservations.utils.View;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

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

    /**
     * 
     * @param offset The business offset
     */
    public void validate(int offset) {
        // Subtracts business offset to take it to 00:00 - 23:59
        // And make them to be on the same day
        LocalDateTime _start = this.start.minusMinutes(offset);
        LocalDateTime _end   = this.end.minusMinutes(offset);


        // Verifies if the dates are not the same
        if (!_start.truncatedTo(ChronoUnit.DAYS).equals(_end.truncatedTo(ChronoUnit.DAYS)))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "START and END dates must be the same day");
        
        int _startMinutes = DateUtils.calculateMinutes(_start);
        int _endMinutes   = DateUtils.calculateMinutes(_end);

        if (_startMinutes >= _endMinutes)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The open time should be less than the close time");

        long diff = Math.abs(_endMinutes - _startMinutes);
        
        if (this.intervalTime <= 0 || this.intervalTime > diff)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The interval time should be between the open and close time.");

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
