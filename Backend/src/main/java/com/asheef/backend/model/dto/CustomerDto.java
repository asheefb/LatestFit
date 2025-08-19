package com.asheef.backend.model.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CustomerDto {

    @Size(min = 3, message = "Name must be at least 3 characters long")
    private String name;

    @Pattern(regexp = "\\d{10}", message = "Phone number must be 10 digits long")
    private String phone;

    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Invalid email format")
    private String email;

    @Size(min = 3, message = "Address must be at least 3 characters long")
    private String address;
}
