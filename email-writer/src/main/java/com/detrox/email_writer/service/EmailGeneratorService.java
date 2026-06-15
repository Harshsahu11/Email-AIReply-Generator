package com.detrox.email_writer.service;

import com.detrox.email_writer.model.EmailRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;
    private final String apiKey;

    public EmailGeneratorService(WebClient.Builder webClientBuilder, @Value("${gemini.api.url}") String baseUrl, @Value("${gemini.api.key}") String geminiApiKey) {

        this.webClient = webClientBuilder.baseUrl(baseUrl).build();
        this.apiKey = geminiApiKey;
    }

    public String generateEmailReply(EmailRequest emailRequest) {

        // Build Prompt
        String prompt = buildPrompt(emailRequest);

        // Request Body
        String requestBody = String.format("""
                {
                  "contents": [
                    {
                      "parts": [
                        {
                          "text": "%s"
                        }
                      ]
                    }
                  ]
                }
                """, prompt);

        // API Call
        String response = webClient.post().uri(uriBuilder -> uriBuilder.path("/v1beta/models/gemini-3.5-flash:generateContent").build()).header("x-goog-api-key", apiKey).header("Content-Type", "application/json").bodyValue(requestBody).retrieve().bodyToMono(String.class).block();

        // Extract Response
        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {

        try {

            ObjectMapper mapper = new ObjectMapper();

            JsonNode root = mapper.readTree(response);

            JsonNode candidates = root.path("candidates");

            if (candidates.isArray() && !candidates.isEmpty()) {

                JsonNode parts = candidates.get(0).path("content").path("parts");

                if (parts.isArray() && !parts.isEmpty()) {

                    return parts.get(0).path("text").asText("");
                }
            }

            return "No response generated.";

        } catch (Exception e) {

            e.printStackTrace();

            return "Error while parsing Gemini response.";
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {

        StringBuilder prompt = new StringBuilder();

        prompt.append("Generate a professional email reply for the following email without subject.\n\n");

        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {

            prompt.append("Use a ").append(emailRequest.getTone()).append(" tone.\n\n");
        }

        prompt.append("Original Email:\n").append(emailRequest.getEmailContent());

        return prompt.toString();
    }
}