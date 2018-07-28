package com.gaurdx.controller;

import com.gaurdx.model.Document;
import com.gaurdx.model.UploadFileResponse;
import com.gaurdx.repositories.DocumentsRepository;
import com.gaurdx.service.FileStorageService;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/fileuploaddownloader")
public class FileUploadDownloadController {

    private static final Logger logger = LoggerFactory.getLogger(FileUploadDownloadController.class);
    @Autowired
    DocumentsRepository documentsRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/uploadFile")
    public ResponseEntity<UploadFileResponse> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("userId") String userId, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (/*session == null || */userId == null) {
            return buildUnauthorisedResponse();
        }
        String fileName = null;
        fileName = fileStorageService.storeFile(file);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();
        Document document = new Document(ObjectId.get().toHexString(), fileName, "", userId);
        documentsRepository.save(document);
        return new ResponseEntity<>(new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize()), HttpStatus.CREATED);
    }

    @PostMapping("/uploadMultipleFiles")
    public List<ResponseEntity<UploadFileResponse>> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files, @RequestParam("userId") String userId, HttpServletRequest request) {
        return Arrays.stream(files)
                .map(file -> uploadFile(file, userId, request))
                .collect(Collectors.toList());
    }

    @GetMapping("/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    private ResponseEntity<UploadFileResponse> buildUnauthorisedResponse() {

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}
