package com.backend.reservations.utils;

import org.springframework.http.HttpStatus;

public class ResponseException extends Exception{

    private HttpStatus code = HttpStatus.INTERNAL_SERVER_ERROR;

    private static final long serialVersionUID = 1L;

    public ResponseException() {
    }
    
    public ResponseException(String message) {
        super(message);
    }

    public ResponseException(String message, HttpStatus code) {
        super(message);
        this.setCode(code);
    }

    public ResponseException(String message, Throwable cause) {
        super(message, cause);
    }

    public HttpStatus getCode() {
        return this.code;
    }

    public void setCode(HttpStatus code) {
        this.code = code;
    }


}
