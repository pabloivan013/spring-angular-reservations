package com.backend.reservations.utils;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class DateUtils {
    
    public static final LocalDateTime truncateDate(LocalDateTime date){
        return date.truncatedTo(ChronoUnit.MINUTES);
    }
    
    public static final int minutesBetweenDates(LocalDateTime from, LocalDateTime to) {
        return Math.toIntExact(from.until(to, ChronoUnit.MINUTES));
    }

    public static final int calculateMinutes(LocalDateTime date) {
        return date.getHour() * 60 + date.getMinute();
    }

}
