package com.asheef.backend.controller;

import com.asheef.backend.model.dto.MeasurementDto;
import com.asheef.backend.model.dto.ViewAllMeasurementDto;
import com.asheef.backend.service.MeasurementService;
import com.asheef.backend.utils.ResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/measurement")
public class MeasurementController {

    private final MeasurementService measurementService;

    public MeasurementController(MeasurementService measurementService) {
        this.measurementService = measurementService;
    }

    @PostMapping("/add")
    public ResponseEntity<ResponseDto> addMeasurement(@RequestBody MeasurementDto dto) {
        return measurementService.addMeasurement(dto);
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDto> updateMeasurement(String id, MeasurementDto dto) {
        return measurementService.updateMeasurement(id, dto);
    }

    @GetMapping("/view")
    public ResponseEntity<ResponseDto> viewAllMeasurementsOfCustomer(Integer customerId) {
        return measurementService.viewAllMeasurementsOfCustomer(customerId);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ResponseDto> calculateDashboardItems(Integer userId) {
        return measurementService.calculateDashboardItems(userId);
    }

    @GetMapping("/viewAll")
    public ResponseEntity<ResponseDto> viewAllMeasurements(ViewAllMeasurementDto dto) {
        return measurementService.viewAllMeasurements(dto);
    }


}
