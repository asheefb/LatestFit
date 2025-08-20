package com.asheef.backend.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Shirt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer customerId;

    private Double length;

    private Double chest;

    private Double waist;

    private Double shoulder;

    private Double sleeves;

    private Double cuffLength;

    private Double collar;

    private String status;

    private LocalDate createdAt;

    private LocalDate updatedAt;

    private Integer updatedBy;

    private Integer createdBy;
}
