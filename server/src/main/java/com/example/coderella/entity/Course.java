// src/main/java/com/example/coderellaProject/model/Course.java
package com.example.coderella.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "courses",uniqueConstraints = @UniqueConstraint(columnNames = "s_no"))
public class Course {

    /** Internal surrogate PK used by Subject.course_id */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Business-level S. No., unique and unmodifiable */
    @NotNull
    @Column(name = "s_no", nullable = false, unique = true)
    private Long sNo;

    @NotBlank
    @Column(nullable = false)
    private String code;

    @NotBlank
    @Column(nullable = false)
    private String title;

    /** final | 5s1 | 5s2 | 5s3 | 6s1 | 6s2 */
    @NotBlank
    @Column(nullable = false)
    private String level;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "image_data", columnDefinition = "LONGBLOB")
    private byte[] imageData;

    @Column(name = "image_type")
    private String imageType;
}


