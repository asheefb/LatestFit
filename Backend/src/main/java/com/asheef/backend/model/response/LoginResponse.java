package com.asheef.backend.model.response;

import lombok.Data;

import java.util.List;

@Data
public class LoginResponse {
    private String jwt;
    private List<String> roles;
}
