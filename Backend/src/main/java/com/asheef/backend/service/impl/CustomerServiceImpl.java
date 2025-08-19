package com.asheef.backend.service.impl;

import com.asheef.backend.constants.Constants;
import com.asheef.backend.model.dto.CustomerDto;
import com.asheef.backend.model.dto.CustomerUpdateDto;
import com.asheef.backend.model.entity.Customer;
import com.asheef.backend.model.response.CustomerResponseEntity;
import com.asheef.backend.repository.CustomerRepository;
import com.asheef.backend.service.CustomerService;
import com.asheef.backend.utils.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public ResponseEntity<ResponseDto> addCustomer(CustomerDto dto) {
        ResponseDto response;
        HttpStatus httpStatus;
        try {


            Customer customer = new Customer();
            customer.setName(dto.getName());
            customer.setPhone(dto.getPhone());
            customer.setEmail(dto.getEmail());
            customer.setAddress(dto.getAddress());

            customerRepository.save(customer);

            response = new ResponseDto(Boolean.TRUE, HttpStatus.OK.value(), Constants.CUSTOMER_ADDED_SUCCESSFULLY);
            httpStatus = HttpStatus.OK;

        } catch (Exception e) {
            response = new ResponseDto(Boolean.FALSE, HttpStatus.UNPROCESSABLE_ENTITY.value(), Constants.UNABLE_TO_ADD_CUSTOMER);
            httpStatus = HttpStatus.UNPROCESSABLE_ENTITY;
        }
        return new ResponseEntity<>(response, httpStatus);
    }

    @Override
    public ResponseEntity<ResponseDto> updateCustomer(CustomerUpdateDto dto) {

        try {
            Customer customer = customerRepository.findById(Integer.valueOf(dto.getCustomerId()))
                    .orElseThrow(() -> new NoSuchElementException("Customer not found"));


            if (!customer.getName().equals(dto.getName())) {
                customer.setName(dto.getName());
            }

            if (!customer.getPhone().equals(dto.getPhone())) {
                customer.setPhone(dto.getPhone());
            }

            if (!customer.getEmail().equals(dto.getEmail())) {
                customer.setEmail(dto.getEmail());
            }

            if (!customer.getAddress().equals(dto.getAddress())) {
                customer.setAddress(dto.getAddress());
            }

            customerRepository.save(customer);

            return ResponseEntity.ok(
                    new ResponseDto(Boolean.TRUE, HttpStatus.OK.value(), Constants.CUSTOMER_UPDATED_SUCCESSFULLY)
            );

        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDto(Boolean.FALSE, HttpStatus.NOT_FOUND.value(), e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity().body(
                    new ResponseDto(Boolean.FALSE, HttpStatus.UNPROCESSABLE_ENTITY.value(), Constants.UNABLE_TO_UPDATE_CUSTOMER)
            );
        }
    }

    @Override
    public ResponseEntity<ResponseDto> viewCustomer(Integer customerId) {

        try {
            if (customerId == null || customerId <= 0)
                throw new IllegalArgumentException("Customer id is required");

            CustomerResponseEntity response = customerRepository.findCustomerById(customerId)
                    .orElseThrow(() -> new NoSuchElementException("Customer not found"));

            return ResponseEntity.ok(
                    new ResponseDto(Boolean.TRUE, HttpStatus.OK.value(), response)
            );

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseDto(Boolean.FALSE, HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDto(Boolean.FALSE, HttpStatus.NOT_FOUND.value(), e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity().body(
                    new ResponseDto(Boolean.FALSE, HttpStatus.UNPROCESSABLE_ENTITY.value(), Constants.ERROR_FETCHING_CUSTOMER)
            );
        }
    }

    @Override
    public ResponseEntity<ResponseDto> searchCustomers(String regex) {

        try {
            List<CustomerResponseEntity> customers = customerRepository.findCustomersBySearch(regex);

            if (!customers.isEmpty()) {
                return ResponseEntity.ok(
                        new ResponseDto(Boolean.TRUE, HttpStatus.OK.value(), customers)
                );
            } else {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ResponseDto(Boolean.TRUE, HttpStatus.OK.value(), List.of()));
            }
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity().body(
                    new ResponseDto(Boolean.FALSE, HttpStatus.UNPROCESSABLE_ENTITY.value(), Constants.ERROR_FETCHING_CUSTOMER)
            );
        }
    }
}
