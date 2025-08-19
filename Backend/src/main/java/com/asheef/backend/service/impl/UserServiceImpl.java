package com.asheef.backend.service.impl;

import com.asheef.backend.model.dto.LoginDto;
import com.asheef.backend.model.response.LoginResponse;
import com.asheef.backend.security.JwtUtils;
import com.asheef.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final AuthenticationManager authManager;

    private final JwtUtils jwtUtils;

    public UserServiceImpl(AuthenticationManager authManager, JwtUtils jwtUtils) {
        this.authManager = authManager;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public ResponseEntity<LoginResponse> login(LoginDto dto) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtUtils.generateTocken(authentication.getName());

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        var roles = userDetails.getAuthorities()
                .stream()
                .map(auth -> auth.getAuthority())
                .collect(Collectors.toList());

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setJwt(token);
        loginResponse.setRoles(roles);

        return ResponseEntity.ok(loginResponse);
    }
}
