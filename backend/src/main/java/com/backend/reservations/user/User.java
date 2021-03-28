package com.backend.reservations.user;

import java.util.HashSet;
import java.util.Set;
import com.backend.reservations.business.*;
import com.backend.reservations.reservation.Reservation;
import com.backend.reservations.utils.AuditModel;
import com.backend.reservations.utils.View;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;

@JsonIgnoreProperties(
    ignoreUnknown = true,
    value = {"id","business"}
)
@Entity
@Table(name = "users")
public class User extends AuditModel {
    
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    private long id;

    @JsonView(View.Public.class)
    @Column(name = "name")
	private String name;

    @JsonView(View.Public.class)
	@Column(name = "nickname")
	private String nickname;

    @JsonView(View.Public.class)
    @Column(name = "username", unique = true)
	private String username;

    @JsonView(View.InternalUser.class)
    @Column(name = "email")
	private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "sub", unique = true, nullable = false)
	private String sub;

    @JsonView(View.Internal.class)
    @Column(name = "verified")
    private Boolean verified;
    
    @JsonView(View.InternalBusiness.class)
    @OneToMany(cascade = CascadeType.ALL,
                fetch = FetchType.LAZY,
                mappedBy = "user")
    private Set<Business> business = new HashSet<>();


    @JsonView(View.InternalReservation.class)
    @OneToMany(cascade = CascadeType.ALL,
                fetch = FetchType.LAZY,
                mappedBy = "user")
    private Set<Reservation> reservations = new HashSet<>();

    public User() {
    }

    public User(long id, String name, String nickname, String username, String email, String sub, Boolean verified, Set<Business> business, Set<Reservation> reservations) {
        this.id = id;
        this.name = name;
        this.nickname = nickname;
        this.username = username;
        this.email = email;
        this.sub = sub;
        this.verified = verified;
        this.business = business;
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

    public String getNickname() {
        return this.nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSub() {
        return this.sub;
    }

    public void setSub(String sub) {
        this.sub = sub;
    }

    public Boolean isVerified() {
        return this.verified;
    }

    public Boolean getVerified() {
        return this.verified;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public Set<Business> getBusiness() {
        return this.business;
    }

    public void setBusiness(Set<Business> business) {
        this.business = business;
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
            ", nickname='" + getNickname() + "'" +
            ", username='" + getUsername() + "'" +
            ", email='" + getEmail() + "'" +
            ", sub='" + getSub() + "'" +
            "}";
    }
	
}
