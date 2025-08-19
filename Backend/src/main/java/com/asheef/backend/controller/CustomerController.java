package com.asheef.backend.controller;

import com.asheef.backend.model.dto.CustomerDto;
import com.asheef.backend.model.dto.CustomerUpdateDto;
import com.asheef.backend.service.CustomerService;
import com.asheef.backend.utils.ResponseDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/add")
    public ResponseEntity<ResponseDto> addCustomer(@RequestBody @Valid CustomerDto dto) {
        return customerService.addCustomer(dto);
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDto> updateCustomer(@RequestBody @Valid CustomerUpdateDto dto) {
        return customerService.updateCustomer(dto);
    }

    @GetMapping("/view")
    public ResponseEntity<ResponseDto> viewCustomer(Integer customerId) {
        return customerService.viewCustomer(customerId);
    }

    @GetMapping("/search")
    public ResponseEntity<ResponseDto> searchCustomers(String regex) {
        return customerService.searchCustomers(regex);
    }
}
