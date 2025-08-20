package com.asheef.backend.service.impl;

import com.asheef.backend.constants.Constants;
import com.asheef.backend.model.dto.MeasurementDto;
import com.asheef.backend.model.entity.Pant;
import com.asheef.backend.model.entity.Shirt;
import com.asheef.backend.model.response.DashBoardItems;
import com.asheef.backend.repository.CustomerRepository;
import com.asheef.backend.repository.measurement.MeasurementRepository;
import com.asheef.backend.repository.measurement.PantRepository;
import com.asheef.backend.repository.measurement.ShirtRepository;
import com.asheef.backend.service.MeasurementService;
import com.asheef.backend.utils.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
public class MeasurementServiceImpl implements MeasurementService {

    private final CustomerRepository customerRepository;
    private final PantRepository pantRepository;
    private final ShirtRepository shirtRepository;
    private final MeasurementRepository measurementRepository;

    public MeasurementServiceImpl(CustomerRepository customerRepository,
                                  PantRepository pantRepository,
                                  ShirtRepository shirtRepository,
                                  MeasurementRepository measurementRepository) {
        this.customerRepository = customerRepository;
        this.pantRepository = pantRepository;
        this.shirtRepository = shirtRepository;
        this.measurementRepository = measurementRepository;
    }

    @Override
    public ResponseEntity<ResponseDto> addMeasurement(MeasurementDto dto) {
        try {
            if (dto.getType().equals(Constants.PANT)) {
                Pant pant = new Pant();
                pant.setCustomerId(Integer.valueOf(dto.getCustomerId()));
                pant.setLength(Double.valueOf(dto.getPantLength()));
                pant.setTrunk(Double.valueOf(dto.getPantTrunk()));
                pant.setHip(Double.valueOf(dto.getPantHip()));
                pant.setLegs(Double.valueOf(dto.getPantLegs()));
                pant.setKnee(Double.valueOf(dto.getPantKnee()));
                pant.setBottom(Double.valueOf(dto.getPantBottom()));
                pant.setCreatedAt(LocalDate.now());
                pantRepository.save(pant);

            } else if (dto.getType().equals(Constants.SHIRT)) {
                Shirt shirt = new Shirt();
                shirt.setCustomerId(Integer.valueOf(dto.getCustomerId()));
                shirt.setLength(Double.parseDouble(dto.getShirtLength()));
                shirt.setChest(Double.parseDouble(dto.getShirtChest()));
                shirt.setWaist(Double.parseDouble(dto.getShirtWaist()));
                shirt.setShoulder(Double.parseDouble(dto.getShirtShoulder()));
                shirt.setSleeves(Double.parseDouble(dto.getShirtSleeves()));
                shirt.setCollar(Double.parseDouble(dto.getShirtCollar()));
                shirt.setCuffLength(Double.parseDouble(dto.getShirtCoupLength()));
                shirt.setCreatedAt(LocalDate.now());
                shirtRepository.save(shirt);
            }

            return ResponseEntity.ok(
                    new ResponseDto(true, HttpStatus.OK.value(), Constants.MEASUREMENT_ADDED_SUCCESSFULLY)
            );

        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity().body(
                    new ResponseDto(false, HttpStatus.UNPROCESSABLE_ENTITY.value(), Constants.UNABLE_TO_ADD_MEASUREMENT)
            );
        }
    }

    @Override
    public ResponseEntity<ResponseDto> updateMeasurement(String id, MeasurementDto dto) {
        try {
            Integer measurementId = Integer.valueOf(id);

            if (dto.getType().equals(Constants.PANT)) {
                Pant pant = pantRepository.findById(measurementId)
                        .orElseThrow(() -> new NoSuchElementException("Pant not found"));

                if (dto.getPantLength() != null) pant.setLength(Double.valueOf(dto.getPantLength()));
                if (dto.getPantTrunk() != null) pant.setTrunk(Double.valueOf(dto.getPantTrunk()));
                if (dto.getPantHip() != null) pant.setHip(Double.valueOf(dto.getPantHip()));
                if (dto.getPantLegs() != null) pant.setLegs(Double.valueOf(dto.getPantLegs()));
                if (dto.getPantKnee() != null) pant.setKnee(Double.valueOf(dto.getPantKnee()));
                if (dto.getPantBottom() != null) pant.setBottom(Double.valueOf(dto.getPantBottom()));

                pant.setUpdatedAt(LocalDate.now());
                pantRepository.save(pant);

            } else if (dto.getType().equals(Constants.SHIRT)) {
                Shirt shirt = shirtRepository.findById(measurementId)
                        .orElseThrow(() -> new NoSuchElementException("Shirt not found"));

                if (dto.getShirtLength() != null) shirt.setLength(Double.valueOf(dto.getShirtLength()));
                if (dto.getShirtChest() != null) shirt.setChest(Double.valueOf(dto.getShirtChest()));
                if (dto.getShirtWaist() != null) shirt.setWaist(Double.valueOf(dto.getShirtWaist()));
                if (dto.getShirtShoulder() != null) shirt.setShoulder(Double.valueOf(dto.getShirtShoulder()));
                if (dto.getShirtSleeves() != null) shirt.setSleeves(Double.valueOf(dto.getShirtSleeves()));
                if (dto.getShirtCollar() != null) shirt.setCollar(Double.valueOf(dto.getShirtCollar()));
                if (dto.getShirtCoupLength() != null) shirt.setCuffLength(Double.valueOf(dto.getShirtCoupLength()));

                shirt.setUpdatedAt(LocalDate.now());
                shirtRepository.save(shirt);
            }

            return ResponseEntity.ok(
                    new ResponseDto(true, HttpStatus.OK.value(), Constants.MEASUREMENT_UPDATED_SUCCESSFULLY)
            );

        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDto(false, HttpStatus.NOT_FOUND.value(), e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity().body(
                    new ResponseDto(false, HttpStatus.UNPROCESSABLE_ENTITY.value(), Constants.UNABLE_TO_UPDATE_MEASUREMENT)
            );
        }
    }


    @Override
    public ResponseEntity<ResponseDto> viewAllMeasurementsOfCustomer(Integer customerId) {
        try {
            List<Pant> pants = pantRepository.findByCustomerId(customerId);
            List<Shirt> shirts = shirtRepository.findByCustomerId(customerId);

            // Combine both in one response DTO
            Map<String, Object> result = new HashMap<>();
            result.put("pants", pants);
            result.put("shirts", shirts);

            return ResponseEntity.ok(
                    new ResponseDto(true, HttpStatus.OK.value(), result)
            );

        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity().body(
                    new ResponseDto(false, HttpStatus.UNPROCESSABLE_ENTITY.value(), "Unable to fetch measurements")
            );
        }
    }


    @Override
    public ResponseEntity<ResponseDto> calculateDashboardItems(Integer userId) {
        try {
            DashBoardItems items = new DashBoardItems();
            LocalDate today = LocalDate.now();

            Integer measurementCount = measurementRepository.findByCreatedAt(today).size();

            Integer customerCount = customerRepository.findByCreatedAt(today).size();

            items.setMeasurementsToday(String.valueOf(measurementCount));
            items.setNewCustomers(String.valueOf(customerCount));

            return ResponseEntity.ok(
                    new ResponseDto(true, HttpStatus.OK.value(), items)
            );
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity().body(
                    new ResponseDto(false, HttpStatus.UNPROCESSABLE_ENTITY.value(), "Error calculating dashboard")
            );
        }
    }
}
