package com.ceawse.authservice.service;
import com.ceawse.authservice.service.dto.TrackResponseDto;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
public interface TrackService {
    TrackResponseDto uploadTrack(String title, String artist, Long genreId, MultipartFile file, MultipartFile cover);
    List<TrackResponseDto> searchTracks(String query, String type);
    List<TrackResponseDto> getTracksByGenre(Long genreId);
    List<TrackResponseDto> getAllTracks();
    void deleteTrack(Long id); // Новый метод
}