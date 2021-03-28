package com.backend.reservations.reservation;

import java.time.LocalDateTime;
import java.util.Set;

import com.backend.reservations.utils.ResponseException;
import com.backend.reservations.utils.models.Schedule;
import com.backend.reservations.utils.models.WeekDay;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReservationService {
    
    @Autowired
    ReservationRepository reservationRepository;

    public void validateReservation(Reservation reservation) throws ResponseException {
       
        if (reservation.getReservedAt() == null)
            throw new ResponseException("The reservation date should not be null");

        if (reservation.getDay() == null) 
            throw new ResponseException("The day should not be null");

        Schedule schedule = reservation.business.getSchedule();
        LocalDateTime reservedAt = reservation.truncateReservedAt();

        // Substract offset
        String dayOfReservation = reservedAt.minusMinutes(reservation.getBusiness().getSchedule().getOffset())
                                  .getDayOfWeek().toString();
        WeekDay _weekDay = WeekDay.valueOf(dayOfReservation);

        if (reservation.getDay().getValue() != _weekDay.getValue())
            throw new ResponseException("The weekday provided and the date does not match");

        if (!reservation.isValid(schedule))
            throw new ResponseException("Reservation date not valid");
        
        if (!this.reservationRepository.FindByDateAndBusinessName(
                                        reservation.business.getName(),
                                        reservedAt, 
                                        reservedAt
                                        ).isEmpty()
            ) 
            throw new ResponseException("Reservation already taked");
        
    }

    /**
     * Creates a new reservation
     * @param reservation
     * @return Reservation
     * @throws ResponseException
     */
    public Reservation addReservation(Reservation reservation) throws ResponseException {
        this.validateReservation(reservation);
        return reservationRepository.save(reservation);
    }

    /**
     * Returns the reservations of a user
     * @param sub
     * @return Set<Reservation>
     */
    public Set<Reservation> getReservationsByUserSub(String sub) {
        return reservationRepository.FindByUserSubAndFetchBusinessEagerly(sub);
    }

    /**
     * Returns all the reservations made to a business belonging to a user, in a specific range date
     * @param sub
     * @param business
     * @return Set<Reservation>
     */
    public Set<Reservation> getReservationsByBusinessNameFromUserSub(
        String sub, 
        String business, 
        LocalDateTime start, 
        LocalDateTime end
        ) {
        
        if (start == null)
            start = LocalDateTime.of(1, 1, 1, 0, 0);
        
        if ( end == null)
            end = LocalDateTime.of(99999, 1, 1, 0, 0);

        System.out.println("start1: " + start);
        System.out.println("end1: " + end);
        
        if (business != null  && business.length() > 0)
            return this.reservationRepository.FindByBusinessNameFromUserSubRangeDate(sub, business, start, end);
        else
            return this.reservationRepository.FindByUserSubOnRangeDate(sub, start, end);
    }

    /**
     * Returns the reservations of a business in a specific range date
     * @param name
     * @param start
     * @param end
     * @return
     */
    public Set<Reservation> getReservationsByDateAndBusinessName(String name, LocalDateTime start, LocalDateTime end) {
        if (start == null)
            start = LocalDateTime.of(1, 1, 1, 0, 0);
        
        if ( end == null)
            end = LocalDateTime.of(99999, 1, 1, 0, 0);
        return this.reservationRepository.FindByDateAndBusinessName(name, start, end);
    }

}
