package com.ceawse.authservice.repository;

import com.ceawse.authservice.domain.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Map;

public interface SaleRepository extends JpaRepository<Sale, Long> {

    // SQL-запрос для графика: считаем сумму (amount) по дням (sale_date)
    // Мы берем последние 10 дней и сортируем их от старых к новым
    @Query(value = "SELECT sale_date as day, SUM(amount) as val " +
            "FROM sales " +
            "WHERE sale_date > CURRENT_DATE - INTERVAL '10 days' " +
            "GROUP BY sale_date " +
            "ORDER BY sale_date ASC", nativeQuery = true)
    List<Map<String, Object>> getSalesStatsLast10Days();
}