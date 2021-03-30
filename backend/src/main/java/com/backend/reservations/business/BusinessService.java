package com.backend.reservations.business;

import java.util.Date;
import java.util.List;
import java.util.Set;

import com.backend.reservations.utils.ResponseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class BusinessService {

    @Autowired
    BusinessRepository businessRepository;

    /**
     * Returns a business by his name
     * @param business
     * @return Business
     * @throws ResponseException
     */
    public Business getBusiness(Business business) throws ResponseException {
        return businessRepository.findFirstByName(business.getName()).map(b -> {
            return b;
        }).orElseThrow(() -> new ResponseException("Business name not found", HttpStatus.NOT_FOUND));
    }

    /**
     * Returns a list of business containing in his name the parameter passed
     * @param name
     * @return List<Business>
     */
    public List<Business> getBusinessByNameContaining(String name) {
        Pageable  topFive = PageRequest.of(0, 5);
        return businessRepository.findByNameLike(name, topFive);
    }
    
    /**
     * Returns a business given by a name with his reservations in a specific date
     * @param name
     * @param start
     * @param end
     * @return Business
     * @throws ResponseException
     */
    public Business getBusinessByNameWithReservations(String name, Date start, Date end) throws ResponseException {
        return businessRepository.findByNameAndReservationDate(name, start, end).map(b -> {
            return b;
        }).orElseThrow(()-> new ResponseException("Bussines not found"));
    }

    /**
     * Returns the bussines created by a user
     * @param sub
     * @return Set<Business>
     */
    public Set<Business> getBusinessByUserSub(String sub) {
        return businessRepository.FindByUserSub(sub);
    }

    /**
     * Returns a business by his name belonging to a user
     * @param name
     * @param sub
     * @return Business
     * @throws ResponseException
     */
    public Business getBusinessByNameAndUserSub(String name, String sub) throws ResponseException {
        return this.businessRepository.findByNameAndUser_Sub(name, sub).map(b -> {
            return b;
        }).orElseThrow(()-> new ResponseException("Bussines not found"));
    }

    
    /**
     * Validates the business creation data
     * @param business
     * @throws ResponseException
     */
    public void validateBusiness(Business business) throws ResponseException {
        if (business.getName() == null)
            throw new ResponseException("Business name is required");

        if (business.getName().length() < 5 || business.getName().length() > 20)
            throw new ResponseException("The business name should be between 5 and 20 characters");
            
        if (businessRepository.findFirstByName(business.getName()).isPresent())
            throw new ResponseException("Business name taked");

        // Schedule validation
        business.getSchedule().validate();
        
    }

    /**
     * Creates or updates a new business
     * @param business
     * @return Business
     * @throws ResponseException
     */
    public Business addBusiness(Business business) throws ResponseException{
        this.validateBusiness(business);
        return this.businessRepository.save(business);
    }

}
