// src/main/java/com/example/coderellaProject/dto/SubjectResponse.java
package com.example.coderella.dto;

import com.example.coderella.entity.Subject;
import lombok.*;

@Getter
public class SubjectResponse {
    private final Long   id;
    private final String code;
    private final String title;
    private final String coverPath;

    public SubjectResponse(Subject s) {
        this.id        = s.getId();
        this.code      = s.getCode();
        this.title     = s.getTitle();
        this.coverPath = s.getCoverPath();
    }
}


