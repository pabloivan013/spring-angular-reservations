package com.backend.reservations.user;

import java.time.LocalDateTime;

import java.util.Set;

import com.backend.reservations.business.Business;
import com.backend.reservations.reservation.Reservation;

import com.backend.reservations.utils.View;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/private")
public class UserController {

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserService userService;

	@Autowired
	ObjectMapper objectMapper;

	// Endpoints

	// Public
	// GET /business/:name - Get business (return taked reservations)
	// GET /business/:name?queryParams - Get business with query parameters

	// Private
	// GET /users/business - get user business (only names)
	// GET /users/business/:name/reservations get user business with reservations
	// POST /users/business - create user business
	// POST /users/reservations?business=<business-name> - create users reservation
	// GET /users/reservations - get user reservations (with business name)

	// ** USER SECTION **/

	@GetMapping("/users")
	public ResponseEntity<User> getUser(JwtAuthenticationToken jwt) {
		User userToken = objectMapper.convertValue(jwt.getTokenAttributes(), User.class);
		User _user = userService.getUser(userToken);
		return new ResponseEntity<>(_user, HttpStatus.OK);
	}

	@PostMapping("/users")
	@JsonView(View.ExtendedPublic.class)
	public ResponseEntity<User> createUser(@RequestBody User userBody, JwtAuthenticationToken jwt) {
		User userToken = objectMapper.convertValue(jwt.getTokenAttributes(), User.class);
		userBody.setSub(userToken.getSub());
		User _user = this.userService.createUpdateUser(userBody);
		return new ResponseEntity<>(_user, HttpStatus.CREATED);
	}

	@PostMapping("/users-name")
	@JsonView(View.ExtendedPublic.class)
	public ResponseEntity<User> createUserByName(@RequestBody User userBody, JwtAuthenticationToken jwt) {
		User userToken = objectMapper.convertValue(jwt.getTokenAttributes(), User.class);
		userToken.setUsername(userBody.getUsername());
		User _user = this.userService.createUpdateUserByName(userToken);

		return new ResponseEntity<>(_user, HttpStatus.CREATED);
	}

	// ** BUSINESS SECTION **/

	@PostMapping("/users/business")
	@JsonView(View.ExtendedPublic.class)
	public ResponseEntity<Business> createUserBusiness(@RequestBody Business business, JwtAuthenticationToken jwt) {
		User userToken = objectMapper.convertValue(jwt.getTokenAttributes(), User.class);
		//throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"bar reqq");
		Business _business = this.userService.addUserBusiness(userToken, business);
		return new ResponseEntity<>(_business, HttpStatus.CREATED);
	}

	@GetMapping("/users/business")
	@JsonView(View.Public.class)
	public ResponseEntity<Set<Business>> getUserBusiness(JwtAuthenticationToken jwt) {
		User userToken = objectMapper.convertValue(jwt.getTokenAttributes(), User.class);
		Set<Business> _business = this.userService.getUserBusiness(userToken);
		return new ResponseEntity<>(_business, HttpStatus.OK);
	}

	/**
	 * Returns the business reservations reserved in a specific date range
	 * If the business name its not provided, gets all reservations from all business
	 * 
	 * @param business
	 * @param start
	 * @param end
	 * @param jwt
	 * @return
	 */
	@GetMapping("/users/business/reservations")
	@JsonView(View.InternalUserAndBusiness.class) // Returns user data
	public ResponseEntity<Set<Reservation>> getBusinessReservations(@RequestParam String business,
			@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") LocalDateTime start,
			@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") LocalDateTime end,
			JwtAuthenticationToken jwt) {
		User userToken = objectMapper.convertValue(jwt.getTokenAttributes(), User.class);
		Set<Reservation> _reservations = this.userService.getUserBusinessReservations(userToken, business, start,
				end);
		return new ResponseEntity<>(_reservations, HttpStatus.OK);
	}

	// ** RESERVATION SECTION **/

	// POST /users/reservations?business=<business-name> - create users reservation
	// GET /users/reservations - get user reservations

	@PostMapping("/users/reservations")
	@JsonView({ View.InternalBusiness.class }) // Returns Business data
	public ResponseEntity<Reservation> createUserReservation(@RequestBody Reservation reservation,
			@RequestParam String business, JwtAuthenticationToken jwt) {
			Business _business = new Business();
			_business.setName(business);
			User userToken = objectMapper.convertValue(jwt.getTokenAttributes(), User.class);
			Reservation _reservation = this.userService.addUserReservation(userToken, reservation, _business);
			return new ResponseEntity<>(_reservation, HttpStatus.CREATED);
	}

	@GetMapping("/users/reservations")
	@JsonView(View.InternalBusiness.class) // Returns Business data
	public ResponseEntity<Set<Reservation>> getUserReservations(JwtAuthenticationToken jwt) {
			User userToken = objectMapper.convertValue(jwt.getTokenAttributes(), User.class);
			Set<Reservation> _reservations = this.userService.getUserReservations(userToken);
			return new ResponseEntity<>(_reservations, HttpStatus.OK);
	}

}
