package com.asheef.backend.service;

import com.asheef.backend.model.dto.CustomerDto;
import com.asheef.backend.model.dto.CustomerUpdateDto;
import com.asheef.backend.utils.ResponseDto;
import org.springframework.http.ResponseEntity;

public interface CustomerService {
    ResponseEntity<ResponseDto> addCustomer(CustomerDto dto);

    ResponseEntity<ResponseDto> updateCustomer(CustomerUpdateDto dto);

    ResponseEntity<ResponseDto> viewCustomer(Integer customerId);

    ResponseEntity<ResponseDto> searchCustomers(String regex);

    ResponseEntity<ResponseDto> deleteCustomer(Integer customerId);
}
