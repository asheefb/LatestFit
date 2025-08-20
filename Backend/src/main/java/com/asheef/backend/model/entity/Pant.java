package com.asheef.backend.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Pant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer customerId;

    private Double length;

    private Double trunk;

    private Double hip;

    private Double legs;

    private Double knee;

    private Double bottom;

    private String status;

    private LocalDate createdAt;

    private LocalDate updatedAt;

    private Integer updatedBy;

    private Integer createdBy;
}
