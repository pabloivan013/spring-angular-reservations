package com.backend.reservations.business;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import com.backend.reservations.reservation.Reservation;
import com.backend.reservations.reservation.ReservationService;
import com.backend.reservations.utils.ResponseException;
import com.backend.reservations.utils.View;
import com.fasterxml.jackson.annotation.JsonView;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/public")
public class BusinessController {
    
    // GET /business/:name - Get business (return taked reservations)
	// GET /business/:name?queryParams - Get business with query parameters

    @Autowired
    BusinessService businessService;

    @Autowired
    ReservationService reservationService;

    /**
     * Retunrs a business by his name, or throw exception if not found.
     * @param name
     * @return ResponseEntity<Business>
     */
    @GetMapping("/business/{name}")
    @JsonView(View.Public.class)
	public ResponseEntity<Business> getBusiness(@PathVariable String name) {
        try {
            Business _business = new Business();
            _business.setName(name);
            _business = this.businessService.getBusiness(_business);
            return new ResponseEntity<>(_business, HttpStatus.OK);
        } catch (Exception e) {
            String error = "ERROR getBusiness";
			HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
			if (e instanceof ResponseException) {
                error = e.getMessage();
                httpStatus = ((ResponseException) e).getCode();
            }	
			throw new ResponseStatusException(httpStatus, error);
        }
    }

    /**
     * Returns a list of bussines containing in his name the request parameter
     * @param name
     * @return ResponseEntity<List<Business>>
     */
    @GetMapping("/business")
    @JsonView(View.Public.class)
	public ResponseEntity<List<Business>> getBusinessContainingName(@RequestParam String name) {
        try {
            List<Business> _business = businessService.getBusinessByNameContaining(name);
            return new ResponseEntity<>(_business, HttpStatus.OK);
        } catch (Exception e) {
            String error = "ERROR getUser";
			HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
			if (e instanceof ResponseException)
				error = e.getMessage();
			throw new ResponseStatusException(httpStatus, error);
        }
    }

    /**
     * returns the business reservations given by his name
     * @param name
     * @return ResponseEntity<Set<Reservation>>
     */
    @GetMapping("/business/{name}/reservations")
    @JsonView(View.InternalReservation.class)
	public ResponseEntity<Set<Reservation>> getBusinessReservations(
        @PathVariable String name,
        @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") LocalDateTime start,
        @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") LocalDateTime end
    ) {
        try {
            Set<Reservation> _reservations = reservationService
                                             .getReservationsByDateAndBusinessName(name, start, end);
            return new ResponseEntity<>(_reservations, HttpStatus.OK);
        } catch (Exception e) {
            String error = "ERROR getUser";
			HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
			if (e instanceof ResponseException)
				error = e.getMessage();
			throw new ResponseStatusException(httpStatus, error);
        }
    }

}
