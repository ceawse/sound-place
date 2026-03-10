package com.ceawse.authservice.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;

public interface FileStorageService {
    /**
     * Инициализирует директории хранилища
     */
    void init();

    /**
     * Сохраняет файл и возвращает его уникальное имя
     */
    String store(MultipartFile file);

    /**
     * Загружает файл как ресурс для отдачи по HTTP
     */
    Resource loadAsResource(String filename);

    /**
     * Возвращает полный путь к файлу
     */
    Path load(String filename);

    /**
     * Удаляет все файлы (полезно для тестов или очистки)
     */
    void deleteAll();
}