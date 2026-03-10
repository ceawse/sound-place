package com.ceawse.authservice.service;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Path;
public interface FileStorageService {
    void init();
    String store(MultipartFile file);
    Resource loadAsResource(String filename);
    Path load(String filename);
    void deleteAll();
    void delete(String filename); // Метод для удаления одиночного файла
}