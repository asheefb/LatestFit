package com.asheef.backend.constants;

public class Queries {

    public static final String FIND_ALL_MEASUREMENTS = """
    SELECT 
        m.id AS measurementId,
        m.customer_id AS customerId,
        'Shirt' AS type,
        m.status AS status,
        m.created_at AS createdAt,
        m.updated_at AS updatedAt,
        s.length AS length,
        s.chest AS chest,
        s.waist AS waist,
        s.shoulder AS shoulder,
        s.sleeves AS sleeves,
        s.cuff_length AS cuffLength,
        s.collar AS collar,
        NULL AS pantLength,
        NULL AS pantTrunk,
        NULL AS pantHip,
        NULL AS pantLegs,
        NULL AS pantKnee,
        NULL AS pantBottom
    FROM measurement m
    JOIN shirt s ON m.id = s.id
    
    UNION ALL
    
    SELECT 
        m.id AS measurementId,
        m.customer_id AS customerId,
        'Pant' AS type,
        m.status AS status,
        m.created_at AS createdAt,
        m.updated_at AS updatedAt,
        NULL AS length,
        NULL AS chest,
        NULL AS waist,
        NULL AS shoulder,
        NULL AS sleeves,
        NULL AS cuffLength,
        NULL AS collar,
        p.length AS pantLength,
        p.trunk AS pantTrunk,
        p.hip AS pantHip,
        p.legs AS pantLegs,
        p.knee AS pantKnee,
        p.bottom AS pantBottom
    FROM measurement m
    JOIN pant p ON m.id = p.id
    """;

}
