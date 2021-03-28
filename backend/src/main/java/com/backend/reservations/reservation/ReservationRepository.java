package com.backend.reservations.reservation;

import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    
    /** PRIVATE **/

    // USER PROFILE
    // Fetch personal reservations from a user, with business information
    @Query("SELECT r FROM Reservation r LEFT JOIN FETCH r.business b "+ 
           "JOIN r.user u WHERE u.sub = (:sub) ORDER BY r.reservedAt")
    public Set<Reservation> FindByUserSubAndFetchBusinessEagerly(@Param("sub") String sub);


    // BUSINESS MANAGER
    // Fetch reservations with user information on a range date,
    // given by a business name and a user sub who created the business             
    String query = "SELECT r FROM Reservation r JOIN FETCH r.user " +
                    "JOIN r.business b JOIN b.user u " +
                    "WHERE u.sub = (:sub) AND b.name = (:business)";
                        
    @Query(query + " AND ( r.reservedAt BETWEEN :start AND :end) " +
                   "ORDER BY r.reservedAt ")
    public Set<Reservation> FindByBusinessNameFromUserSubRangeDate(
        @Param("sub") String sub, 
        @Param("business") String business,
        @Param("start") LocalDateTime start,
        @Param("end") LocalDateTime end
    );

    // Fetch all business reservations between two dates
    @Query("SELECT r FROM Reservation r JOIN FETCH r.user " +
           "JOIN FETCH r.business b JOIN b.user u " +
           "WHERE u.sub = (:sub) AND ( r.reservedAt BETWEEN :start AND :end) " +
           "ORDER BY r.reservedAt ")
    public Set<Reservation> FindByUserSubOnRangeDate(
        @Param("sub") String sub, 
        @Param("start") LocalDateTime start,
        @Param("end") LocalDateTime end
    );


    /** PUBLIC **/                                                     
                                                           
    @Query("SELECT r FROM Reservation r JOIN r.business b " +
        "WHERE b.name = (:name) AND ( r.reservedAt BETWEEN :start AND :end)")
    public Set<Reservation> FindByDateAndBusinessName(
        @Param("name") String name,
        @Param("start")LocalDateTime start,
        @Param("end")LocalDateTime end
    );

}
