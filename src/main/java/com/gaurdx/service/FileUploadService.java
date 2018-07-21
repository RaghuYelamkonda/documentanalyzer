package com.gaurdx.service;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.InputStream;
import java.nio.file.StandardCopyOption;

@Component
public class FileUploadService {

    private Environment env;

    @Autowired
    public FileUploadService(Environment env) {
        this.env = env;
    }
    public void persist(MultipartFile file) throws Exception {

        InputStream inputStream = file.getInputStream();
        File targetFile = new File(env.getProperty("File.Upload.Location")+file.getOriginalFilename());
        java.nio.file.Files.copy(inputStream, targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        IOUtils.closeQuietly(inputStream);

    }
}
