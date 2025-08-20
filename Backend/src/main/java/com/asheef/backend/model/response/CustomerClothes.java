package com.asheef.backend.model.response;

import com.asheef.backend.model.entity.Pant;
import com.asheef.backend.model.entity.Shirt;
import lombok.Data;

import java.util.List;

@Data
public class CustomerClothes {
    List<Shirt> shirts;

    List<Pant> pants;
}
