package com.asheef.backend.repository.measurement;

import com.asheef.backend.constants.Constants;
import com.asheef.backend.constants.Queries;
import com.asheef.backend.model.entity.Measurement;
import com.asheef.backend.model.response.MeasurementResponseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface MeasurementRepository extends JpaRepository<Measurement, Integer> {
    List<Measurement> findByCreatedAt(LocalDate date);

    @Query(value = Queries.FIND_ALL_MEASUREMENTS,nativeQuery = true)
    List<MeasurementResponseEntity> findAllMeasurements();
}
