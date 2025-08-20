package com.asheef.backend.service;

import com.asheef.backend.utils.ResponseDto;
import org.springframework.http.ResponseEntity;

public interface ClothsService {

    public ResponseEntity<ResponseDto> getClothsByCustomerId(Integer customerId);
}
