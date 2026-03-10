package com.ceawse.authservice.web.controller;

import com.ceawse.authservice.service.GenreService;
import com.ceawse.authservice.service.dto.GenreDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/genres")
@RequiredArgsConstructor
public class GenreController {

    private final GenreService genreService;

    @GetMapping
    public ResponseEntity<List<GenreDto>> getAllGenres() {
        return ResponseEntity.ok(genreService.getAllGenres());
    }

    @PostMapping
    public ResponseEntity<GenreDto> createGenre(@RequestParam String name) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(genreService.createGenre(name));
    }
}