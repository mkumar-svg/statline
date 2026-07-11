package com.statline.sports.analytics.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class CricApiClient {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${cricapi.base-url}")
    private String baseUrl;

    @Value("${cricapi.api-key}")
    private String apiKey;

    // Fetches list of currently live matches
    public Map<String, Object> fetchCurrentMatches() {
        String url = baseUrl + "/currentMatches?apikey=" + apiKey + "&offset=0";
        return restTemplate.getForObject(url, Map.class);
    }
}
