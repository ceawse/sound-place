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
            @RequestParam(required = false) Long genreId) {

        if (genreId != null) {
            return ResponseEntity.ok(trackService.getTracksByGenre(genreId));
        }
        return ResponseEntity.ok(trackService.searchTracks(search));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TrackResponseDto> uploadTrack(
            @RequestParam("title") String title,
            @RequestParam("artist") String artist,
            @RequestParam("genreId") Long genreId,
            @RequestPart("file") MultipartFile file) {

        return ResponseEntity.ok(trackService.uploadTrack(title, artist, genreId, file));
    }

    /**
     * Эндпоинт для прослушивания и скачивания файлов.
     * Благодаря MediaType.parseMediaType("audio/mpeg") браузер поймет, что это музыка.
     */
    @GetMapping("/download/{filename:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
        Resource file = fileStorageService.loadAsResource(filename);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "audio/mpeg")
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }
}