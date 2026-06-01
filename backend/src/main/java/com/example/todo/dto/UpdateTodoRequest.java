package com.example.todo.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateTodoRequest {

    @NotNull
    private Boolean done;
}
