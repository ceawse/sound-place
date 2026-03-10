package com.ceawse.authservice.domain.api;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VendingMachineCalendarDto {
    private Long id;
    private String name;
    private String model;
    private String address;
    private String nextServiceDate;
    private int serviceMonth;
    private String statusColor;
    private String franchisee;
}