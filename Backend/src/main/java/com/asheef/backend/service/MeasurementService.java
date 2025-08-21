package com.asheef.backend.service;

import com.asheef.backend.model.dto.MeasurementDto;
import com.asheef.backend.model.dto.ViewAllMeasurementDto;
import com.asheef.backend.utils.ResponseDto;
import org.springframework.http.ResponseEntity;

public interface MeasurementService {

    public ResponseEntity<ResponseDto> addMeasurement(MeasurementDto dto);

    public ResponseEntity<ResponseDto> updateMeasurement(String id, MeasurementDto dto);

    public ResponseEntity<ResponseDto> viewAllMeasurementsOfCustomer(Integer customerId);

    public ResponseEntity<ResponseDto> calculateDashboardItems(Integer userId);

    ResponseEntity<ResponseDto> viewAllMeasurements(ViewAllMeasurementDto dto);
}
