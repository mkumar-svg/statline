package com.statline.sports.analytics.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    @Bean
    public NewTopic matchEventsTopic() {
        return TopicBuilder.name("match-events")
                .partitions(3)
                .replicas(1)
                .build();
    }
}
