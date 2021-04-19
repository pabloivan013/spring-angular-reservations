package com.backend.reservations.exception;

import java.time.LocalDateTime;
import java.util.Objects;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;

public class RestResponse {
 
    private final LocalDateTime timestamp = LocalDateTime.now();
    private int status;
    private String error;
    private String message;
    private String path;

    public static class Builder {
        private int status;
        private String error;
        private String message;
        private String path;
        
        public Builder() {}

        public Builder status(int status) {
            this.status = status;
            return this;
        }
        
        public Builder status(HttpStatus status) {
            this.status = status.value();
        
            if (status.isError()) {
                this.error = status.getReasonPhrase();
            }
        
            return this;
        }

        public Builder error(String error) {
            this.error = error;
            return this;
        }

        public Builder exception(ResponseStatusException exception) {
            HttpStatus status = exception.getStatus();
            this.status = status.value();
            
            if (!Objects.requireNonNull(exception.getReason()).isEmpty()) {
              this.message = exception.getReason();
            }
            
        
            if (status.isError()) {
              this.error = status.getReasonPhrase();
            }
        
            return this;
        }
        
        public Builder message(String message) {
            this.message = message;
            return this;
        }
        
        public Builder path(String path) {
            this.path = path;
            return this;
        }

        public RestResponse build() {
            RestResponse response = new RestResponse();
            response.setStatus(status);
            response.setError(error);
            response.setMessage(message);
            response.setPath(path);
            return response;
        }

        public ResponseEntity<RestResponse> entity() {
            return ResponseEntity.status(status).headers(HttpHeaders.EMPTY).body(build());
        }

    }

    public static Builder builder() {
        return new Builder();
    }

    public RestResponse() {}

    public RestResponse(int status, String error, String message, String path) {
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }

    public LocalDateTime getTimestamp() {
        return this.timestamp;
    }

    public int getStatus() {
        return this.status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getError() {
        return this.error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPath() {
        return this.path;
    }

    public void setPath(String path) {
        this.path = path;
    }

}
