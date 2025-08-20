package com.asheef.backend.repository.measurement;

import com.asheef.backend.model.entity.Pant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface PantRepository extends JpaRepository<Pant, Integer> {

    List<Pant> findByCustomerId(Integer customerId);

}
