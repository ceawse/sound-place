package com.ceawse.authservice.web.controller;
import com.ceawse.authservice.service.FileStorageService;
import com.ceawse.authservice.service.TrackService;
import com.ceawse.authservice.service.dto.TrackResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
@RestController
@RequestMapping("/api/v1/tracks")
@RequiredArgsConstructor
public class TrackController {
    private final TrackService trackService;
    private final FileStorageService fileStorageService;
    @GetMapping
    public ResponseEntity<List<TrackResponseDto>> getTracks(
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "all") String type,
            @RequestParam(required = false) Long genreId) {
        if (genreId != null) {
            return ResponseEntity.ok(trackService.getTracksByGenre(genreId));
        }
        return ResponseEntity.ok(trackService.searchTracks(search, type));
    }
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TrackResponseDto> uploadTrack(
            @RequestParam("title") String title,
            @RequestParam("artist") String artist,
            @RequestParam("genreId") Long genreId,
            @RequestPart("file") MultipartFile file,
            @RequestPart(value = "cover", required = false) MultipartFile cover) {
        return ResponseEntity.ok(trackService.uploadTrack(title, artist, genreId, file, cover));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrack(@PathVariable Long id) {
        trackService.deleteTrack(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/download/{filename:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
        Resource file = fileStorageService.loadAsResource(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "audio/mpeg")
                .body(file);
    }
    @GetMapping("/cover/{filename:.+}")
    public ResponseEntity<Resource> downloadCover(@PathVariable String filename) {
        Resource file = fileStorageService.loadAsResource(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_JPEG_VALUE)
                .body(file);
    }
}