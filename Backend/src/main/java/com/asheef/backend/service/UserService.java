package com.asheef.backend.service;

import com.asheef.backend.model.dto.LoginDto;
import com.asheef.backend.model.dto.RegisterDto;
import com.asheef.backend.model.response.LoginResponse;
import com.asheef.backend.utils.ResponseDto;
import org.springframework.http.ResponseEntity;

public interface UserService {


    ResponseEntity<LoginResponse> login(LoginDto dto);

    ResponseEntity<ResponseDto> register(RegisterDto dto);
}
