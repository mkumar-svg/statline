package com.statline.sports.analytics.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import static org.springframework.cloud.gateway.server.mvc.filter.BeforeFilterFunctions.uri;
import static org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions.route;
import static org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions.http;
import static org.springframework.cloud.gateway.server.mvc.predicate.GatewayRequestPredicates.path;

@Configuration
public class GatewayConfig {

    @Bean
    public RouterFunction<ServerResponse> matchServiceRoute() {
        return route("match-service")
                .route(path("/api/matches/**"), http())
                .before(uri("http://localhost:8083"))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> commentaryServiceRoute() {
        return route("commentary-service")
                .route(path("/api/commentary/**"), http())
                .before(uri("http://localhost:8082"))
                .build();
    }
}
