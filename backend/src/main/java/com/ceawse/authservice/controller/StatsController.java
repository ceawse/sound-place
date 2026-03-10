package com.ceawse.authservice.controller;

import com.ceawse.authservice.repository.SaleRepository;
import com.ceawse.authservice.repository.VendingMachineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/v1/stats")
@RequiredArgsConstructor
@CrossOrigin("*")
public class StatsController {
    private final VendingMachineRepository repository;
    private final SaleRepository saleRepository;

    @GetMapping("/summary")
    public Map<String, Object> getSummary() {
        Map<String, Object> res = new HashMap<>();

        // Сводка (Summary)
        res.put("cashInMachine", 27595); // Мок
        res.put("revenueToday", 11810);
        res.put("revenueYesterday", 13360);

        // Эффективность (Gauge)
        res.put("efficiency", 100);

        // Состояние сети (Donut)
        res.put("statuses", List.of(
                Map.of("name", "Работает", "value", 9),
                Map.of("name", "Сбой", "value", 1),
                Map.of("name", "Ремонт", "value", 2)
        ));

        // График (Bar Chart)
        res.put("chartData", saleRepository.getSalesStatsLast10Days());

        return res;
    }
}