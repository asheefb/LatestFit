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
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
        name = "customer",
        uniqueConstraints = @UniqueConstraint(columnNames = "phone")
)
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String phone;

    private String email;

    private String address;

    private LocalDate createdAt;

    private LocalDate updatedAt;

    private Integer updatedBy;

    private Integer createdBy;
}
