package com.asheef.backend.utils;

import com.asheef.backend.model.response.CustomerResponseEntity;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseDto {

    private Boolean success;

    private Integer statusCode;

    private Object data;

    private List<Object> datas;

    private String message;

    private List<ErrorDto> errors;

    public ResponseDto(Boolean success, Integer statusCode, String message) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
    }

    public ResponseDto(Boolean success, Integer statusCode, Object data) {
        this.success = success;
        this.statusCode = statusCode;
        this.data = data;
    }
}
