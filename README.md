# statline
Real-time sports analytics platform with live commentary, AI-powered match predictions, and fantasy insights — built with Spring Boot, Kafka, Redis &amp; React.

🏏 StatLine — Real-Time Sports Analytics Platform

    StatLine is an event-driven, microservices-based sports analytics platform inspired by Cricinfo/Cricbuzz — delivering live scores, ball-by-ball commentary,        AI-powered match predictions, player comparisons, and fantasy insights across multiple sports.


    Built as a portfolio project to demonstrate real-time data pipelines, distributed systems design, and full-stack engineering.




✨ Features


    Live Scores — Real-time match updates via Kafka + WebSocket
    Ball-by-Ball Commentary — Cricinfo-style live commentary feed
    Match Center — Scorecards, stats, squads, and match info (tabbed interface)
    AI Match Prediction — Win-probability predictions with reasoning
    Player Comparison — Head-to-head stat breakdowns
    Fantasy Suggestions — Data-driven fantasy team recommendations
    Voice Assistant (planned) — Natural language queries about matches and stats



🏗️ Architecture

External Sports API (CricAPI)
        │
        ▼
ingestion-service  →  Kafka topic: match-events
        │
        ▼
commentary-service  →  Redis (live cache)  +  PostgreSQL (durable storage)
        │
        ▼
match-service  →  REST API  →  React Frontend (WebSocket for real-time push)

Core design principles:


    Kafka partitioned by matchId for per-match ordering guarantees
    Redis caching for low-latency reads (commentary, live scorecards)
    Sport-agnostic MatchEvent model — supports cricket, football, tennis, and more
    Idempotent event processing via sequence numbers



🛠️ Tech Stack

    LayerTechnologyBackendJava 21, Spring Boot 3.xMessagingApache KafkaCacheRedisDatabasePostgreSQLFrontendReact (Vite), Tailwind CSSContainerizationDocker,           Docker ComposeAPI GatewaySpring Cloud Gateway (planned)


📦 Microservices

    ServiceResponsibilityingestion-servicePolls external sports API, publishes match events to Kafkacommentary-serviceConsumes Kafka events, caches                    commentary/scorecards in Redis, persists to Postgresmatch-serviceExposes REST APIs for live scores, match center, and squadsplayer-servicePlayer stats,            comparisons, and fantasy suggestionsfrontendReact-based Match Center UI


🚀 Getting Started

Prerequisites


    Java 17+
    Docker Desktop
    Node.js 18+
    A free CricAPI key


1. Clone the repo

    bashgit clone https://github.com/<your-username>/statline.git
    cd statline

2. Start infrastructure (Kafka, Redis, Postgres)

    bashdocker compose up -d

3. Set environment variables

    bashexport CRICAPI_KEY=your_api_key_here

4. Run ingestion-service

    bashcd ingestion-service
    ./mvnw spring-boot:run

5. Verify


    Kafka UI: http://localhost:8090
    Check topic match-events for incoming messages



🗺️ Roadmap


     Docker infra setup (Kafka, Redis, Postgres)
     ingestion-service — CricAPI polling + Kafka publishing
     commentary-service — Kafka consumer + Redis caching
     match-service — REST API layer
     Frontend Match Center integration
     AI-based match prediction
     Fantasy suggestion engine
     Multi-sport support (football, tennis)
     Kubernetes deployment + monitoring (Prometheus/Grafana)



📄 License

    This project is for educational/portfolio purposes.


🙋 About

    Built by Manish Kumar as a hands-on exploration of event-driven architecture, microservices, and real-time data systems — targeting backend/full-stack             engineering roles.
