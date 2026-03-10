package com.ceawse.authservice.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TrackResponseDto {
    private Long id;
    private String title;
    private String artist;
    private String genreName;
    private String fileUrl; // URL для скачивания/прослушивания
    private LocalDateTime createdAt;
}