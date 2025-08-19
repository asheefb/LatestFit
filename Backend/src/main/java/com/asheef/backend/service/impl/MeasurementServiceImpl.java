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
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    @Override
    public ResponseEntity<ResponseDto> updateMeasurement(MeasurementDto dto) {
        return null;
    }
}
