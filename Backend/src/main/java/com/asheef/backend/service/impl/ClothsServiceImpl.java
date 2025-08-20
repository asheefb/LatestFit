package com.asheef.backend.service.impl;

import com.asheef.backend.constants.Constants;
import com.asheef.backend.model.entity.Pant;
import com.asheef.backend.model.entity.Shirt;
import com.asheef.backend.model.response.CustomerClothes;
import com.asheef.backend.repository.measurement.PantRepository;
import com.asheef.backend.repository.measurement.ShirtRepository;
import com.asheef.backend.service.ClothsService;
import com.asheef.backend.utils.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ClothsServiceImpl implements ClothsService {

    private final ShirtRepository shirtRepository;

    private final PantRepository pantRepository;

    public ClothsServiceImpl(ShirtRepository shirtRepository, PantRepository pantRepository) {
        this.shirtRepository = shirtRepository;
        this.pantRepository = pantRepository;
    }

    @Override
    public ResponseEntity<ResponseDto> getClothsByCustomerId(Integer customerId) {
        try {
            CustomerClothes customerClothes = new CustomerClothes();

            List<Shirt> shirts = shirtRepository.findByCustomerId(customerId);
            List<Pant> pants = pantRepository.findByCustomerId(customerId);

            customerClothes.setShirts(shirts);
            customerClothes.setPants(pants);
            return ResponseEntity.ok(new ResponseDto(Boolean.TRUE, HttpStatus.OK.value(), customerClothes));
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity()
                    .body(new ResponseDto(Boolean.FALSE, HttpStatus.UNPROCESSABLE_ENTITY.value(), Constants.ERROR_FETCHING_CUSTOMER));
        }
    }
}
