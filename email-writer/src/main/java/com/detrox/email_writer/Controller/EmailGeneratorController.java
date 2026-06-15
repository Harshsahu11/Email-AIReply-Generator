package com.detrox.email_writer.Controller;

import com.detrox.email_writer.model.EmailRequest;
import com.detrox.email_writer.service.EmailGeneratorService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class EmailGeneratorController {

    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(
            @RequestBody EmailRequest emailRequest
            ){

            String response = emailGeneratorService.generateEmailReply(emailRequest);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
