package com.backend.reservations.reservation;

import java.time.LocalDateTime;
import javax.persistence.*;

import com.backend.reservations.business.Business;
import com.backend.reservations.user.User;
import com.backend.reservations.utils.AuditModel;
import com.backend.reservations.utils.DateUtils;
import com.backend.reservations.utils.View;
import com.backend.reservations.utils.models.Day;
import com.backend.reservations.utils.models.OperationTime;
import com.backend.reservations.utils.models.Schedule;
import com.backend.reservations.utils.models.WeekDay;
import com.fasterxml.jackson.annotation.*;


@JsonIgnoreProperties(
    ignoreUnknown = true,
    value = {"id"}
)
@Entity
@Table(name = "reservations")
public class Reservation extends AuditModel {
    
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    private long id;

    @JsonView(View.InternalUser.class)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    User user;

    @JsonView(View.InternalBusiness.class)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_id")
    Business business;

    @JsonView(View.Public.class)
    @Column(name = "reservedAt")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	private LocalDateTime reservedAt;

    @JsonView(View.Public.class)
    @Column(name= "day")
    private WeekDay day;
    
    public Reservation() {
    }

    public Reservation(long id, User user, Business business, LocalDateTime reservedAt, WeekDay day) {
        this.id = id;
        this.user = user;
        this.business = business;
        this.reservedAt = reservedAt;
        this.day = day;
    }

    public LocalDateTime truncateReservedAt() {
        this.reservedAt = DateUtils.truncateDate(this.reservedAt);
        return this.reservedAt;
    }

    public Boolean isValid(Schedule schedule) {
        System.out.println("DAT RES: " + this.day);
        for(Day d : schedule.getDays()) {
            if (d.getDay() == this.getDay() && d.isOpen()) {
                for (OperationTime ot: d.getOperationTimes()) {
                    // Subtracts business offset to take it to 00:00 - 23:59
                    LocalDateTime _start = ot.getStart().minusMinutes(schedule.getOffset());
                    LocalDateTime _end   = ot.getEnd().minusMinutes(schedule.getOffset());
                    LocalDateTime _reservedAt = reservedAt.minusMinutes(schedule.getOffset());
                    // System.out.println("_start: " + _start);
                    // System.out.println("_end: " + _end);
                    // System.out.println("_reservedAt: " + _reservedAt);
                    int _startMinutes = DateUtils.calculateMinutes(_start);
                    int _endMinutes   = DateUtils.calculateMinutes(_end);
                    int _reservedAtMinutes = DateUtils.calculateMinutes(_reservedAt);
                    // System.out.println("_startMinutes: " + _startMinutes);
                    // System.out.println("_endMinutes: " + _endMinutes);
                    // System.out.println("_reservedAtMinutes: " + _reservedAtMinutes);

                    if (_reservedAtMinutes >= _startMinutes
                        && _reservedAtMinutes < _endMinutes
                        && (_reservedAtMinutes - _startMinutes) % ot.getIntervalTime() == 0    
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Business getBusiness() {
        return this.business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    public LocalDateTime getReservedAt() {
        return this.reservedAt;
    }

    public void setReservedAt(LocalDateTime reservedAt) {
        this.reservedAt = reservedAt;
    }

    public WeekDay getDay() {
        return this.day;
    }

    public void setDay(WeekDay day) {
        this.day = day;
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", reservedAt='" + getReservedAt() + "'" +
            ", day='" + getDay() + "'" +
            "}";
    }
    
}
