package com.asheef.backend.repository.measurement;

import com.asheef.backend.model.entity.Shirt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShirtRepository extends JpaRepository<Shirt, Integer> {
}
