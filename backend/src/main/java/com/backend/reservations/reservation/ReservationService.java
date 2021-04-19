package com.backend.reservations.reservation;

import java.time.LocalDateTime;
import java.util.Set;

import com.backend.reservations.utils.models.Schedule;
import com.backend.reservations.utils.models.WeekDay;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Component
@Transactional
public class ReservationService {
    
    @Autowired
    ReservationRepository reservationRepository;

    public void validateReservation(Reservation reservation) {
       
        if (reservation.getReservedAt() == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The reservation date should not be null");

        if (reservation.getDay() == null) 
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The day should not be null");

        Schedule schedule = reservation.business.getSchedule();
        LocalDateTime reservedAt = reservation.truncateReservedAt();

        // Substract offset
        String dayOfReservation = reservedAt.minusMinutes(reservation.getBusiness().getSchedule().getOffset())
                                  .getDayOfWeek().toString();
        WeekDay _weekDay = WeekDay.valueOf(dayOfReservation);

        if (reservation.getDay().getValue() != _weekDay.getValue())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The weekday provided and the date does not match");

        if (!reservation.isValid(schedule))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Reservation date not valid");
        
        if (!this.reservationRepository.FindByDateAndBusinessName(
                                        reservation.business.getName(),
                                        reservedAt, 
                                        reservedAt
                                        ).isEmpty()
            ) 
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Reservation already taked");
        
    }

    /**
     * Creates a new reservation
     * @param reservation
     * @return Reservation
     */
    public Reservation addReservation(Reservation reservation) {
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
    
        if (business != null  && business.length() > 0)
            return this.reservationRepository.FindByBusinessNameFromUserSubRangeDate(sub, business, start, end);
        else
            return this.reservationRepository.FindByUserSubOnRangeDate(sub, start, end);
    }


    /** Public **/

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
