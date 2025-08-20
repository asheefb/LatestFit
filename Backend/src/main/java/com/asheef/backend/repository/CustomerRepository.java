package com.asheef.backend.repository;

import com.asheef.backend.constants.Constants;
import com.asheef.backend.model.entity.Customer;
import com.asheef.backend.model.response.CustomerResponseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {


    @Query(value = Constants.FIND_CUSTOMER_BY_ID, nativeQuery = true)
    Optional<CustomerResponseEntity> findCustomerById(@Param("id") Integer id);

    @Query(value = Constants.FIND_CUSTOMERS_BY_SEARCH, nativeQuery = true)
    List<CustomerResponseEntity> findCustomersBySearch(@Param("search") String search);

    List<Customer> findByCreatedAt(LocalDate createdAt);
}
