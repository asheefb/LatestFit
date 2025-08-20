package com.asheef.backend.exception;

import com.asheef.backend.utils.ErrorDto;
import com.asheef.backend.utils.ResponseDto;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseDto> handleInvalidArgumentException(MethodArgumentNotValidException e) {
        var errors = new ArrayList<>();

        for (FieldError error : e.getBindingResult().getFieldErrors()) {
            ErrorDto dto = new ErrorDto(
                    String.valueOf(error.getRejectedValue()),
                    error.getDefaultMessage(),
                    error.getField()
            );
            errors.add(dto);
        }

        return ResponseEntity.badRequest().body(
                new ResponseDto(Boolean.FALSE, HttpStatus.BAD_REQUEST.value(), errors)
        );
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> handleConstraintViolation(ConstraintViolationException ex) {
        var errors = new ArrayList<ErrorDto>();
        ex.getConstraintViolations().forEach(violation -> {
            ErrorDto errorStructure = new ErrorDto(
                    String.valueOf(violation.getInvalidValue()),
                    violation.getMessage(),
                    violation.getPropertyPath().toString()
            );
            errors.add(errorStructure);
        });

        ResponseDto response = new ResponseDto(Boolean.FALSE, HttpStatus.BAD_REQUEST.value(), errors);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
