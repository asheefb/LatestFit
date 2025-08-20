package com.asheef.backend.service.impl;

import com.asheef.backend.constants.Constants;
import com.asheef.backend.model.dto.MeasurementDto;
import com.asheef.backend.model.entity.Pant;
import com.asheef.backend.model.entity.Shirt;
import com.asheef.backend.repository.CustomerRepository;
import com.asheef.backend.repository.measurement.PantRepository;
import com.asheef.backend.repository.measurement.ShirtRepository;
import com.asheef.backend.service.MeasurementService;
import com.asheef.backend.utils.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class MeasurementServiceImpl implements MeasurementService {

    private final CustomerRepository customerRepository;

    private final PantRepository pantRepository;

    private final ShirtRepository shirtRepository;

    public MeasurementServiceImpl(CustomerRepository customerRepository, PantRepository pantRepository, ShirtRepository shirtRepository) {
        this.customerRepository = customerRepository;
        this.pantRepository = pantRepository;
        this.shirtRepository = shirtRepository;
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
                pant.setCustomerId(Integer.valueOf(dto.getCustomerId()));
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
                shirtRepository.save(shirt);
            }
            return ResponseEntity.ok(
                    new ResponseDto(Boolean.TRUE, HttpStatus.OK.value(), Constants.MEASUREMENT_ADDED_SUCCESSFULLY)
            );
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity().body(
                    new ResponseDto(Boolean.FALSE, HttpStatus.UNPROCESSABLE_ENTITY.value(), Constants.UNABLE_TO_ADD_MEASUREMENT)
            );
        }
    }

    @Override
    public ResponseEntity<ResponseDto> updateMeasurement(String id, MeasurementDto dto) {

        try {
            if (dto.getType().equals(Constants.PANT)) {
                Pant pant = pantRepository.findById(Integer.valueOf(id))
                        .orElseThrow(() -> new NoSuchElementException("Pant not found"));

                if (!pant.getBottom().equals(Double.valueOf(dto.getPantBottom())))
                    pant.setBottom(Double.valueOf(dto.getPantBottom()));

                if (!pant.getHip().equals(Double.valueOf(dto.getPantHip())))
                    pant.setHip(Double.valueOf(dto.getPantHip()));

                if (!pant.getKnee().equals(Double.valueOf(dto.getPantKnee())))
                    pant.setKnee(Double.valueOf(dto.getPantKnee()));

                if (!pant.getLegs().equals(Double.valueOf(dto.getPantLegs())))
                    pant.setLegs(Double.valueOf(dto.getPantLegs()));

                if (!pant.getLength().equals(Double.valueOf(dto.getPantLength())))
                    pant.setLength(Double.valueOf(dto.getPantLength()));

                if (!pant.getTrunk().equals(Double.valueOf(dto.getPantTrunk())))
                    pant.setTrunk(Double.valueOf(dto.getPantTrunk()));
            } else if (dto.getType().equals(Constants.SHIRT)) {
                Shirt shirt = shirtRepository.findById(Integer.valueOf(id))
                        .orElseThrow(() -> new NoSuchElementException("Shirt not found"));

                if (!shirt.getLength().equals(Double.valueOf(dto.getShirtLength())))
                    shirt.setLength(Double.valueOf(dto.getShirtLength()));

                if (!shirt.getChest().equals(Double.valueOf(dto.getShirtChest())))
                    shirt.setChest(Double.valueOf(dto.getShirtChest()));

                if (!shirt.getWaist().equals(Double.valueOf(dto.getShirtWaist())))
                    shirt.setWaist(Double.valueOf(dto.getShirtWaist()));

                if (!shirt.getShoulder().equals(Double.valueOf(dto.getShirtShoulder())))
                    shirt.setShoulder(Double.valueOf(dto.getShirtShoulder()));

                if (!shirt.getSleeves().equals(Double.valueOf(dto.getShirtSleeves())))
                    shirt.setSleeves(Double.valueOf(dto.getShirtSleeves()));

                if (!shirt.getCollar().equals(Double.valueOf(dto.getShirtCollar())))
                    shirt.setCollar(Double.valueOf(dto.getShirtCollar()));

                if (shirt.getCuffLength().equals(Double.valueOf(dto.getShirtCoupLength())))
                    shirt.setCuffLength(Double.valueOf(dto.getShirtCoupLength()));

                shirtRepository.save(shirt);
            }

            return ResponseEntity.ok(
                    new ResponseDto(Boolean.TRUE, HttpStatus.OK.value(), Constants.MEASUREMENT_UPDATED_SUCCESSFULLY)
            );
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDto(Boolean.FALSE, HttpStatus.NOT_FOUND.value(), e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity().body(
                    new ResponseDto(Boolean.FALSE, HttpStatus.UNPROCESSABLE_ENTITY.value(), Constants.UNABLE_TO_UPDATE_MEASUREMENT)
            );
        }
    }
}
