package com.gaurdx.controller;

import com.gaurdx.service.FileUploadService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/fileuploader")
public class FileUploadController {

    private final FileUploadService fileUploadService;

    @Autowired
    public FileUploadController(FileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }

    @ApiOperation(value = "Empty get for file upload service")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Return success status"),
            @ApiResponse(code = 500, message = "Internal server error", response = String.class)
    })
    @RequestMapping(method = RequestMethod.GET, produces = {"application/text"})
    public String handleFileUpload() throws Exception {

        return "Empty get for file upload service";
    }

    @ApiOperation(value = "Uploads document to server")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Return upload status"),
            @ApiResponse(code = 500, message = "Internal server error", response = String.class)
    })
    @RequestMapping(method = RequestMethod.POST, consumes = "multipart/form-data", produces = {"text/html"})
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {

        try {
            fileUploadService.persist(file);
            return buildResponse(true, request);
        } catch (Exception e) {
            e.printStackTrace();
            return buildResponse(false, request);
        }
    }

    private ResponseEntity<String> buildResponse(boolean success, HttpServletRequest request) {
        String message = success ? "Successfully uploaded. " : "Error during the file upload. ";
        String detailedMessage = success ? "Document uploaded to the server. " : "Please contact the system administrator. ";
        HttpStatus statuisCode = success ? HttpStatus.CREATED : HttpStatus.INTERNAL_SERVER_ERROR;
        StringBuffer requestURL = request.getRequestURL();
        String requestURI = request.getRequestURI();

        String response = "<html>\n" +
                "    <head>\n" +
                "        <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css\"\n" +
                "              integrity=\"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm\"\n" +
                "              crossorigin=\"anonymous\">\n" +
                "        <meta http-equiv=\"refresh\" content=\"5; url="+requestURL.substring(0, requestURL.indexOf(requestURI))+"/"+ request.getContextPath()+"\"/>" +
                "    </head>\n" +
                "\n" +
                "    <body>\n" +
                "        <div class=\"container-fluid\" style=\"margin-top: 3rem; margin-left: 3rem\">\n" +
                "            <div class=\"row\">\n" +
                "                <div class=\"card\">\n" +
                "                    <h3 class=\"card-header bg-primary text-white\">\n" + message + "</h3>\n" +
                "                    <div class=\"card-body\">\n" +
                "                        <h4 class=\"card-title\">"+detailedMessage+"</h4>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </body>\n" +
                "</html>";
        return new ResponseEntity<>(response, statuisCode);
    }
}
