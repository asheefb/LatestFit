package com.asheef.backend.model.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ShirtResponse {

    private Integer id;

    private Integer customerId;

    private String length;

    private String chest;

    private String waist;

    private String shoulder;

    private String sleeves;

    private String cuffLength;

    private String collar;

    private String status;

    private LocalDate createdAt;

    private LocalDate updatedAt;

    private Integer updatedBy;

    private Integer createdBy;
}
