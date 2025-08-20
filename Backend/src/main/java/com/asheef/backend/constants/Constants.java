package com.asheef.backend.constants;

import jakarta.validation.constraints.NotNull;

public class Constants {


    //Queries
    public static final String FIND_CUSTOMER_BY_ID =
            "SELECT name , phone,email," +
                    "address from latest_fit.customer " +
                    "where id = :id";

    public static final String FIND_CUSTOMERS_BY_SEARCH =
            "SELECT id, name, phone, email, address " +
                    "FROM customer " +
                    "WHERE name REGEXP :search";

    public static final String CUSTOMER_ADDED_SUCCESSFULLY = "Customer added successfully";
    public static final String UNABLE_TO_ADD_CUSTOMER = "Unable to add customer";
    public static final String CUSTOMER_UPDATED_SUCCESSFULLY = "Customer updated successfully";
    public static final String UNABLE_TO_UPDATE_CUSTOMER = "Unable to update customer";
    public static final String ERROR_FETCHING_CUSTOMER = "Error fetching customer";
    public static final String USER_REGISTERED_SUCCESSFULLY = "User registered successfully";
    public static final String UNABLE_TO_REGISTER_USER = "Unable to register user";
    public static final String PANT = "Pant";
    public static final String SHIRT = "Shirt";
    public static final String MEASUREMENT_ADDED_SUCCESSFULLY = "Measurement added successfully";
    public static final String UNABLE_TO_ADD_MEASUREMENT = "Unable to add measurement";
    public static final String MEASUREMENT_UPDATED_SUCCESSFULLY = "Measurement updated successfully";
    public static final String UNABLE_TO_UPDATE_MEASUREMENT = "Unable to update measurement";

    public static final String COMPLETED_STATUS = "COMPLETED";
    public static final String PENDING_STATUS = "PENDING";
    public static final String IN_PROGRESS_STATUS = "IN_PROGRESS";
    public static final String DO_IT_LATER_STATUS = "DO_IT_LATER";
}
