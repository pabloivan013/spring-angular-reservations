package com.backend.reservations.business;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import com.backend.reservations.user.User;
import com.backend.reservations.utils.AuditModel;
import com.backend.reservations.utils.MyCustomConverter;
import com.backend.reservations.utils.View;
import com.backend.reservations.utils.models.Schedule;
import com.backend.reservations.reservation.Reservation;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;


@JsonIgnoreProperties(
    ignoreUnknown = true,
    value = {"id"}
)
@Entity
@Table(name = "business")
public class Business extends AuditModel {
    
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    private long id;
    
    @JsonView(View.Public.class)
    @Column(name = "name", unique = true, nullable = false)
	private String name;

    @JsonView(View.Public.class)
    @Column(name = "description")
	private String description;

    @JsonView(View.Public.class)
    @Column(name = "address")
	private String address;

    @JsonView(View.Public.class)
    @Column(name = "location")
	private String location;

    @JsonView(View.Public.class)
    @Column(columnDefinition = "json")
    @Convert(converter = MyCustomConverter.class)
    private Schedule schedule;

    @JsonView(View.InternalUser.class)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonView(View.InternalReservation.class)
    @OneToMany(cascade = CascadeType.ALL,
                fetch = FetchType.LAZY,
                mappedBy = "business")
    private Set<Reservation> reservations = new HashSet<>();

    
    public Business() {
    }

    public Business(long id, String name, String description, String address, String location, Schedule schedule, User user, Set<Reservation> reservations) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.address = address;
        this.location = location;
        this.schedule = schedule;
        this.user = user;
        this.reservations = reservations;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Schedule getSchedule() {
        return this.schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Reservation> getReservations() {
        return this.reservations;
    }

    public void setReservations(Set<Reservation> reservations) {
        this.reservations = reservations;
    }



    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", address='" + getAddress() + "'" +
            ", location='" + getLocation() + "'" +
            ", schedule='" + getSchedule() + "'" +
            ", user='" + getUser() + "'" +
            ", reservations='" + getReservations() + "'" +
            "}";
    }
   

}
