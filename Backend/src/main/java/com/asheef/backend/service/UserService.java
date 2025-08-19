package com.asheef.backend.service;

import com.asheef.backend.model.dto.LoginDto;
import com.asheef.backend.model.response.LoginResponse;
import org.springframework.http.ResponseEntity;

public interface UserService {


    ResponseEntity<LoginResponse> login(LoginDto dto);
}
