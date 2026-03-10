package com.ceawse.authservice.service;

import com.ceawse.authservice.domain.api.VendingMachineCalendarDto;
import com.ceawse.authservice.domain.entity.VendingMachine;
import com.ceawse.authservice.repository.VendingMachineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
public class VendingMachineService {
    private final VendingMachineRepository repository;

    public List<VendingMachine> findAll(String name) {
        if (name != null) return repository.findByNameContainingIgnoreCase(name);
        return repository.findAll();
    }

    // Эмуляция данных мониторинга (чтобы не хранить в БД лишнее)
    public Map<String, Object> getMachineMonitoringData(VendingMachine vm) {
        Map<String, Object> data = new HashMap<>();
        Random r = new Random();
        data.put("id", vm.getId());
        data.put("name", vm.getName());
        data.put("status", vm.getStatus());
        data.put("signal", 50 + r.nextInt(50)); // 50-100%
        data.put("cash", 1000 + r.nextInt(5000)); // Случайные деньги
        data.put("stock", 20 + r.nextInt(80)); // Загрузка товаром
        data.put("nextMaintenance", vm.getLastCheckDate() != null ?
                vm.getLastCheckDate().plusMonths(vm.getCheckInterval()) : "Не задано");
        return data;
    }

    public VendingMachine save(VendingMachine vm) {
        return repository.save(vm);
    }

    // НОВЫЙ МЕТОД: Сохранение списка
    public void saveAll(List<VendingMachine> machines) {
        repository.saveAll(machines);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }


    public List<VendingMachineCalendarDto> getCalendarData() {
        List<VendingMachine> machines = repository.findAll();
        LocalDate now = LocalDate.now();

        return machines.stream().map(vm -> {
            // 1. БЕЗОПАСНЫЙ ПОИСК ТОЧКИ ОТСЧЕТА
            LocalDate lastCheck = vm.getLastCheckDate();

            if (lastCheck == null) {
                lastCheck = now;
            }

            Integer interval = vm.getCheckInterval();
            if (interval == null || interval <= 0) {
                interval = 6;
            }

            LocalDate nextServiceDate = lastCheck.plusMonths(interval);

            int serviceMonth = nextServiceDate.getMonthValue() - 1;

            double resourceUsage = 0;
            if (vm.getServiceTime() != null && vm.getServiceTime() > 0 && vm.getResourceHours() != null) {
                resourceUsage = (double) vm.getResourceHours() / vm.getServiceTime();
            }

            // 5. Цвет
            String color = "green";
            long daysUntilService = java.time.temporal.ChronoUnit.DAYS.between(now, nextServiceDate);

            if (now.isAfter(nextServiceDate) || resourceUsage >= 0.9) {
                color = "red";
            } else if (daysUntilService <= 5) {
                color = "yellow";
            }

            return VendingMachineCalendarDto.builder()
                    .id(vm.getId())
                    .name(vm.getName() != null ? vm.getName() : "Без названия")
                    .model(vm.getModel())
                    .address(vm.getAddress())
                    .nextServiceDate(nextServiceDate.toString())
                    .serviceMonth(serviceMonth)
                    .statusColor(color)
                    .franchisee(vm.getCompany() != null ? vm.getCompany().getName() : "Не указан")
                    .build();
        }).toList();
    }
}