package com.backend.reservations.user;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

import com.backend.reservations.business.Business;
import com.backend.reservations.business.BusinessService;
import com.backend.reservations.reservation.Reservation;
import com.backend.reservations.reservation.ReservationService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Component
@Transactional
public class UserService {

    static final int USERNAME_MIN_LENGTH = 5;
    static final int USERNAME_MAX_LENGTH = 20;

    @Autowired
	UserRepository userRepository;

    @Autowired
	ObjectMapper objectMapper;

    @Autowired
    BusinessService businessService;

    @Autowired
    ReservationService reservationService;

    public UserService() {
    }
    
    /**
     * Returns a User by his sub or throw exception if not found
     * @param user
     * @return User
     */
    public User getUser(User user)  {
        return userRepository.findBySub(user.getSub()).map( u -> {
            return u;
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    /**
     * Creates or updates a user by his sub
     * @param user
     * @return User
     */
    public User createUpdateUser(User user) {
        Optional<User> userSub = userRepository.findBySub(user.getSub());
        if (userSub.isPresent()) 
            user.setId(userSub.get().getId());
        return userRepository.save(user);
    }


    /** BUSINESS **/

    /**
     * Creates a new user business
     * @param user
     * @param business
     * @return Business
     */
    public Business addUserBusiness(User user, Business business) {
        User _user = this.getUser(user); 
        business.setUser(_user);
        return this.businessService.addBusiness(business);
    }

    public Business updateUserBusiness(User user, Business business) {
        // TODO
        return null;
    }

    /**
     * Returns all the businesses of a user
     * @param user
     * @return Set<Business>
     */
    @Transactional(readOnly = true)
    public Set<Business> getUserBusiness(User user) {
        return businessService.getBusinessByUserSub(user.getSub());
        //return this.getUser(user).getBusiness();
    }

    /**
     * Returns the business reservations
     * The business belongs to the user passed
     * @param user
     * @param business
     * @return Set<Reservation>
     */
    @Transactional(readOnly = true)
    public Set<Reservation> getUserBusinessReservations(
        User user, 
        String business, 
        LocalDateTime start, 
        LocalDateTime end
    ) {
        return reservationService.
                getReservationsByBusinessNameFromUserSub(user.getSub(), business, start, end);
    }


    /** RESERVATIONS **/

    /**
     * Creates a reservation from a user to a business
     * @param user
     * @param reservation
     * @param business
     * @return Reservation
     */
    public Reservation addUserReservation(User user, Reservation reservation, Business business) {
        User _user = this.getUser(user);
        Business _business = businessService.getBusiness(business);
        reservation.setUser(_user);
        reservation.setBusiness(_business);
        return reservationService.addReservation(reservation);
    }

    /**
     * Returns the user personal reservations
     * @param user
     * @return Set<Reservation>
     */
    @Transactional(readOnly = true)
    public Set<Reservation> getUserReservations(User user) {
        return reservationService.getReservationsByUserSub(user.getSub());
    }


    /** Out of service Methods **/

    /**
     * Validates the user data to be created
     * @param username
     */
    public void validateUsername(String username) {
        if (username == null) 
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "username not provided");
        
        if (username.length() < USERNAME_MIN_LENGTH || username.length() > USERNAME_MAX_LENGTH ) 
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, String.format(
                                        "username length should be between %d and %d characters"
                                        ,USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)
                                        );
    }

    /**
     * Creates or updates a user by his username, throw exception if is already taked
     * @param user
     * @return User
     */
    public User createUpdateUserByName(User user) {
        String username = user.getUsername();
        this.validateUsername(username);

        // Verify if username already exists
        Optional<User> userData = userRepository.findByUsername(username);
        if (userData.isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already taked");
        
        Optional<User> userSub = userRepository.findBySub(user.getSub());
        if (userSub.isPresent()) 
            user.setId(userSub.get().getId());
    
        return userRepository.save(user);
    }

}
