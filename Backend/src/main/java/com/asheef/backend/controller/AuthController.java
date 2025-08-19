package com.asheef.backend.controller;

import com.asheef.backend.model.dto.LoginDto;
import com.asheef.backend.model.dto.RegisterDto;
import com.asheef.backend.model.response.LoginResponse;
import com.asheef.backend.service.UserService;
import com.asheef.backend.utils.ResponseDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginDto dto) {
        return userService.login(dto);
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseDto> register(@RequestBody @Valid RegisterDto dto) {
        return userService.register(dto);
    }
}
