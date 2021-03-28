package com.backend.reservations.business;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BusinessRepository extends JpaRepository<Business, Long> {
    Optional<Business> findFirstByName(String name);

    List<Business> findByNameContaining(String name);

    Optional<Business> findByNameAndUser_Sub(String name, String sub);
    
    @Query("SELECT b FROM Business b JOIN b.user u WHERE u.sub = (:sub)")
    public Set<Business> FindByUserSub(@Param("sub") String sub);

    @Query("SELECT b FROM Business b LEFT JOIN b.reservations r  join fetch b.reservations " +
           "WHERE b.name = (:name) AND ( r.createdAt BETWEEN :startDate AND :endDate) ")
    public Optional<Business> findByNameAndReservationDate(
        @Param("name") String name,
        @Param("startDate")Date startDate,
        @Param("endDate")Date endDate
    );

}
