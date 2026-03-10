package com.ceawse.authservice.service;

import com.ceawse.authservice.service.dto.GenreDto;
import java.util.List;

public interface GenreService {
    List<GenreDto> getAllGenres();
    GenreDto createGenre(String name);
}