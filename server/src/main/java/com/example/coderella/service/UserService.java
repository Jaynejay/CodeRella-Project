package com.example.coderella.service;

import java.util.List;
import com.example.coderella.dto.UserSummaryDto;

public interface UserService {
    List<UserSummaryDto> getAllUsers();
}
