package com.asheef.backend.repository.measurement;

import com.asheef.backend.model.entity.Measurement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface MeasurementRepository extends JpaRepository<Measurement, Integer> {
    List<Measurement> findByCreatedAt(LocalDate date);
}
