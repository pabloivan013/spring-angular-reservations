package com.backend.reservations.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findBySub(String sub);

    /** Out of service queries **/

    User findByEmail(String email);

    Optional<User> findByUsername(String username);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.reservations r LEFT JOIN FETCH r.business WHERE u.sub = (:sub)")
    public User findBySubAndFetchReservationsEagerly(@Param("sub") String sub);

}
