package com.asheef.backend.model.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;
@Data
public class RegisterDto {

    @Size(min = 3, message = "Name must be at least 3 characters long")
    private String name;

    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Invalid email format")
    private String email;
    private String password;

    @Pattern(regexp = "\\d{10}", message = "Phone number must be 10 digits long")
    private String mobile;
    private List<String> roles;
}
