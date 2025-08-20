package com.asheef.backend.model.response;

import lombok.Data;

@Data
public class DashBoardItems {
    private String measurementsToday;
    private String newCustomers;
    private String taskCompleted;
    private String pendingAppointments;
}
