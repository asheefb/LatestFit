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
public class ResponseDto {

    private Boolean success;

    private Integer statusCode;

    private Object data;
    
    private List<Object> datas;

    private String message;

    public ResponseDto(Boolean success, Integer statusCode, String message) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
    }
}
