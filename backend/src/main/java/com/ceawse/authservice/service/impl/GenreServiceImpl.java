package com.ceawse.authservice.service.impl;

import com.ceawse.authservice.domain.entity.Genre;
import com.ceawse.authservice.repository.GenreRepository;
import com.ceawse.authservice.service.GenreService;
import com.ceawse.authservice.service.dto.GenreDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GenreServiceImpl implements GenreService {

    private final GenreRepository genreRepository;

    @Override
    @Transactional(readOnly = true)
    public List<GenreDto> getAllGenres() {
        return genreRepository.findAll().stream()
                .map(g -> new GenreDto(g.getId(), g.getName()))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public GenreDto createGenre(String name) {
        if (genreRepository.findByNameIgnoreCase(name).isPresent()) {
            throw new RuntimeException("Жанр уже существует");
        }
        Genre genre = genreRepository.save(Genre.builder().name(name).build());
        return new GenreDto(genre.getId(), genre.getName());
    }
}