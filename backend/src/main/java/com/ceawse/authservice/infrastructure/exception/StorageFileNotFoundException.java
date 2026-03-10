package com.ceawse.authservice.infrastructure.exception;

public class StorageFileNotFoundException extends StorageException {
    public StorageFileNotFoundException(String message) {
        super(message);
    }
}