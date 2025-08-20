package com.asheef.backend.repository.measurement;

import com.asheef.backend.model.entity.Shirt;
import com.asheef.backend.model.response.ShirtResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ShirtRepository extends JpaRepository<Shirt, Integer> {

    List<Shirt> findByCustomerId(Integer customerId);

}
