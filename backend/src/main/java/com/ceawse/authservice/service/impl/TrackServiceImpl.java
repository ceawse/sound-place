package com.ceawse.authservice.service.impl;
import com.ceawse.authservice.domain.entity.Genre;
import com.ceawse.authservice.domain.entity.Track;
import com.ceawse.authservice.repository.GenreRepository;
import com.ceawse.authservice.repository.TrackRepository;
import com.ceawse.authservice.service.FileStorageService;
import com.ceawse.authservice.service.TrackService;
import com.ceawse.authservice.service.dto.TrackResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class TrackServiceImpl implements TrackService {
    private final TrackRepository trackRepository;
    private final GenreRepository genreRepository;
    private final FileStorageService fileStorageService;
    @Override
    @Transactional
    public TrackResponseDto uploadTrack(String title, String artist, Long genreId, MultipartFile file, MultipartFile cover) {
        Genre genre = genreRepository.findById(genreId)
                .orElseThrow(() -> new RuntimeException("Жанр не найден"));
        String fileName = fileStorageService.store(file);
        String coverName = (cover != null && !cover.isEmpty()) ? fileStorageService.store(cover) : null;
        Track track = Track.builder()
                .title(title)
                .artist(artist)
                .genre(genre)
                .fileName(fileName)
                .coverFileName(coverName)
                .build();
        Track savedTrack = trackRepository.save(track);
        return mapToDto(savedTrack);
    }
    @Override
    @Transactional
    public void deleteTrack(Long id) {
        Track track = trackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Трек не найден"));
        if (track.getFileName() != null) {
            fileStorageService.delete(track.getFileName());
        }
        if (track.getCoverFileName() != null) {
            fileStorageService.delete(track.getCoverFileName());
        }
        trackRepository.delete(track);
    }
    @Override
    @Transactional(readOnly = true)
    public List<TrackResponseDto> searchTracks(String query, String type) {
        if (query == null || query.isBlank()) {
            return getAllTracks();
        }
        List<Track> tracks;
        if ("artist".equalsIgnoreCase(type)) {
            tracks = trackRepository.searchByArtist(query);
        } else if ("title".equalsIgnoreCase(type)) {
            tracks = trackRepository.searchByTitle(query);
        } else {
            tracks = trackRepository.searchTracks(query);
        }
        return tracks.stream().map(this::mapToDto).collect(Collectors.toList());
    }
    @Override
    @Transactional(readOnly = true)
    public List<TrackResponseDto> getTracksByGenre(Long genreId) {
        return trackRepository.findByGenreIdOrderByCreatedAtDesc(genreId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
    @Override
    @Transactional(readOnly = true)
    public List<TrackResponseDto> getAllTracks() {
        return trackRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
    private TrackResponseDto mapToDto(Track track) {
        return TrackResponseDto.builder()
                .id(track.getId())
                .title(track.getTitle())
                .artist(track.getArtist())
                .genreName(track.getGenre().getName())
                .fileUrl("/api/v1/tracks/download/" + track.getFileName())
                .coverUrl(track.getCoverFileName() != null ? "/api/v1/tracks/cover/" + track.getCoverFileName() : null)
                .createdAt(track.getCreatedAt())
                .build();
    }
}