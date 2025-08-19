package com.asheef.backend.service.impl;

import com.asheef.backend.constants.Constants;
import com.asheef.backend.model.dto.LoginDto;
import com.asheef.backend.model.dto.RegisterDto;
import com.asheef.backend.model.entity.Role;
import com.asheef.backend.model.entity.User;
import com.asheef.backend.model.response.LoginResponse;
import com.asheef.backend.repository.RoleRepository;
import com.asheef.backend.repository.UserRepository;
import com.asheef.backend.security.JwtUtils;
import com.asheef.backend.service.UserService;
import com.asheef.backend.utils.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final AuthenticationManager authManager;

    private final JwtUtils jwtUtils;

    private final RoleRepository roleRepository;

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final PasswordEncoder passwordEncoder;

//    private final

    public UserServiceImpl(AuthenticationManager authManager, JwtUtils jwtUtils, RoleRepository roleRepository, UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, PasswordEncoder passwordEncoder) {
        this.authManager = authManager;
        this.jwtUtils = jwtUtils;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.passwordEncoder = passwordEncoder;
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

    @Override
    public ResponseEntity<ResponseDto> register(RegisterDto dto) {

        try {
            User user = new User();
            user.setName(dto.getName());
            user.setEmail(dto.getEmail());

            user.setPassword(passwordEncoder.encode(dto.getPassword()));
            user.setMobile(dto.getMobile());

            Set<Role> roles = new HashSet<>();

            dto.getRoles().forEach(roleName -> {
                Role roleNotFound = roleRepository.findByName(roleName)
                        .orElseThrow(() -> new NoSuchElementException("Role not found"));
                roles.add(roleNotFound);
            });

            user.setRoles(roles);

            userRepository.save(user);

            return ResponseEntity.ok(
                    new ResponseDto(Boolean.TRUE, HttpStatus.OK.value(), Constants.USER_REGISTERED_SUCCESSFULLY)
            );
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDto(Boolean.FALSE, HttpStatus.NOT_FOUND.value(), e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity().body(
                    new ResponseDto(Boolean.FALSE, HttpStatus.UNPROCESSABLE_ENTITY.value(), Constants.UNABLE_TO_REGISTER_USER)
            );
        }
    }
}
