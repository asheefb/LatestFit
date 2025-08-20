package com.asheef.backend.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ErrorDto {

    private Integer value;

    private String error;

    private String param;

    private String message;

    private List<ErrorDto> errors;


    public ErrorDto(String error, String message, String param) {
        this.error = error;
        this.message = message;
        this.param = param;
    }
}
