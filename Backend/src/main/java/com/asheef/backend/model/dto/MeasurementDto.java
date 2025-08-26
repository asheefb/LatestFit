package com.asheef.backend.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MeasurementDto {

    @NotNull(message = "Customer id is required")
    private String customerId;

    @NotNull(message = "Type is required")
    private String type;

    private String pantLength;
    private String pantTrunk;
    private String pantHip;
    private String pantLegs;
    private String pantKnee;
    private String pantBottom;

    private String shirtLength;
    private String shirtChest;
    private String shirtWaist;
    private String shirtShoulder;
    private String shirtSleeves;
    private String shirtCoupLength;
    private String shirtCollar;

    private String status;
    private String additionalComments;
}
