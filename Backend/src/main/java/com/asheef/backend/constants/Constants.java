package com.asheef.backend.constants;

public class Constants {
    public static final String CUSTOMER_ADDED_SUCCESSFULLY = "Customer added successfully";
    public static final String UNABLE_TO_ADD_CUSTOMER = "Unable to add customer";
    public static final String CUSTOMER_UPDATED_SUCCESSFULLY = "Customer updated successfully";
    public static final String UNABLE_TO_UPDATE_CUSTOMER = "Unable to update customer";
    public static final String ERROR_FETCHING_CUSTOMER = "Error fetching customer";


    //Queries
    public static final String FIND_CUSTOMER_BY_ID =
            "SELECT name , phone,email," +
                    "address from latest_fit.customer " +
                    "where id = :id";

    public static final String FIND_CUSTOMERS_BY_SEARCH =
            "SELECT id, name, phone, email, address " +
                    "FROM customer " +
                    "WHERE name REGEXP :search";

}
