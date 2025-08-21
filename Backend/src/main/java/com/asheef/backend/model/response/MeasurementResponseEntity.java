package com.asheef.backend.model.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MeasurementResponseEntity {
    private String measurementId;
    private String customerId;
    private String type;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Shirt fields
    private String length;
    private String chest;
    private String waist;
    private String shoulder;
    private String sleeves;
    private String cuffLength;
    private String collar;

    // Pant fields
    private String pantLength;
    private String pantTrunk;
    private String pantHip;
    private String pantLegs;
    private String pantKnee;
    private String pantBottom;

}
