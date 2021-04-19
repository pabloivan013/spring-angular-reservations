package com.backend.reservations.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionHandlerAdvice {
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        HttpStatus code = HttpStatus.INTERNAL_SERVER_ERROR;
        String error = "Internal server error";

        if (e instanceof ResponseException) {
            error = ((ResponseException) e).getMessage();
            code = ((ResponseException) e).getCode();
        }

        return ResponseEntity.status(code).body(error);
    }

}
