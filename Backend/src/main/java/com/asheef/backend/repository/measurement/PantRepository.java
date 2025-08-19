package com.asheef.backend.repository.measurement;

import com.asheef.backend.model.entity.Pant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PantRepository extends JpaRepository<Pant, Integer> {
}
