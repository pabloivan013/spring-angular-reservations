package com.backend.reservations.business;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BusinessRepository extends JpaRepository<Business, Long> {
    Optional<Business> findFirstByNameIgnoreCase(String name);
  
    @Query("SELECT b FROM Business b WHERE UPPER(b.name) LIKE CONCAT('%',UPPER(:name),'%') ")
    List<Business> findByNameLike(@Param("name") String name, Pageable pageable);

    @Query("SELECT b FROM Business b JOIN b.user u WHERE u.sub = (:sub)")
    public Set<Business> FindByUserSub(@Param("sub") String sub);

    
    /** Out of service Queries**/

    List<Business> findByNameContaining(String name, Pageable pageable);

    Optional<Business> findByNameAndUser_Sub(String name, String sub);

    @Query("SELECT b FROM Business b LEFT JOIN b.reservations r  join fetch b.reservations " +
           "WHERE b.name = (:name) AND ( r.createdAt BETWEEN :startDate AND :endDate) ")
    public Optional<Business> findByNameAndReservationDate(
        @Param("name") String name,
        @Param("startDate")Date startDate,
        @Param("endDate")Date endDate
    );

}
