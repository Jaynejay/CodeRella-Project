
package com.example.coderella.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminUserUpdateRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String designation;

    private String homeNo;
    private String street;
    private String city;
    private String district;

    private String accountHolderName;
    private String accountNumber;
    private String bankName;
    private String branch;

    private List<String> phoneNumbers;
    private List<String> languages;
}
