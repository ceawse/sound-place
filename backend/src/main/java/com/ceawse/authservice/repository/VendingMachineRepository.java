package com.ceawse.authservice.repository;

import com.ceawse.authservice.domain.entity.VendingMachine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Map;

public interface VendingMachineRepository extends JpaRepository<VendingMachine, Long> {

    // Для сводки по статусам (круговая диаграмма)
    @Query("SELECT v.status as status, COUNT(v) as count FROM VendingMachine v GROUP BY v.status")
    List<Map<String, Object>> getStatusStats();

    // Поиск для фильтра в десктопе
    List<VendingMachine> findByNameContainingIgnoreCase(String name);
}