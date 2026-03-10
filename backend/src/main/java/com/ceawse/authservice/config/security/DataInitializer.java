package com.ceawse.authservice.config.security;

import com.ceawse.authservice.domain.entity.Sale;
import com.ceawse.authservice.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.util.Random;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final SaleRepository saleRepository;

    @Override
    public void run(String... args) {
        if (saleRepository.count() == 0) {
            Random r = new Random();
            for (int i = 0; i < 10; i++) {
                LocalDate date = LocalDate.now().minusDays(i);
                // Генерируем от 5 до 15 продаж на каждый день
                for (int j = 0; j < 5 + r.nextInt(10); j++) {
                    Sale s = new Sale();
                    s.setMachineId(1L);
                    s.setAmount(50.0 + r.nextInt(200));
                    s.setPaymentMethod(r.nextBoolean() ? "Card" : "Cash");
                    s.setSaleDate(date);
                    saleRepository.save(s);
                }
            }
        }
    }
}