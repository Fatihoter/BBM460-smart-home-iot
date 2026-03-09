# BBM460 — Smart Home IoT System

A full-stack IoT smart home system built with ESP32, Spring Boot, and React. Real-time sensor monitoring and device control over MQTT.

> Developed for BBM460 Wireless and Mobile Networks Laboratory — Hacettepe University

## System Architecture
```
ESP32 (Wokwi Simulator)
        |
        | MQTT (HiveMQ Public Broker)
        |
Spring Boot Backend (Java 17)
        |
        | REST API (HTTP)
        |
React Frontend (TypeScript + Tailwind CSS)
```

## Features

### Sensor Monitoring (Real-time, 5s polling)
| Sensor | Hardware | MQTT Topic |
|--------|----------|------------|
| Temperature | DHT22 | home/climate/temprature |
| Humidity | DHT22 | home/climate/humidity |
| Soil Moisture | Potentiometer | home/plants/moisture |
| Fire / Smoke | MQ2 Sensor | home/safety/fire |

### Device Control
| Device | Hardware | MQTT Topic |
|--------|----------|------------|
| Smart Lighting | LED | home/lights/control |
| Air Conditioning | LED indicator | home/climate/ac/control |
| Door Lock | Servo Motor | home/security/door |
| Smart Plug | Relay Module | home/power/smartplug/control |

### Dashboard Panels
- **Smart Lighting** — LED toggle with live status
- **Climate Control** — Real-time temperature and humidity from DHT22, AC toggle
- **Security System** — Door lock/unlock via servo motor, visual secure/unsecured indicator
- **Smart Plug** — Relay-controlled outlet toggle
- **Fire Safety** — MQ2 smoke detection with animated alert on DETECTED state
- **Plant Care** — Soil moisture progress bar with low-moisture notification below 30%

## Tech Stack

**Hardware / Simulation**
- ESP32 microcontroller simulated on Wokwi: https://wokwi.com/projects/428875392959211521
- DHT22, MQ2, Servo Motor, LED, Potentiometer, Relay Module

**Backend**
- Java 17, Spring Boot 3.4.4
- Eclipse Paho MQTT Client 1.2.5
- HiveMQ Public Broker (tcp://broker.hivemq.com:1883)
- REST API with CORS configured for local frontend

**Frontend**
- React 18 + TypeScript
- Tailwind CSS
- Axios for HTTP requests
- React Context API for global state management
- Vite build tool

## Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- Maven 3.6+

### 1. ESP32 Simulation (Wokwi)
Open: https://wokwi.com/projects/428875392959211521
Click Start Simulation and wait for the ESP32 to connect to the MQTT broker.

### 2. Backend
```bash
cd backend
./mvnw spring-boot:run
```
Runs at http://localhost:8080

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at http://localhost:5173

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/sensor-data | Returns all latest sensor readings |
| POST | /api/control/led?state=on or off | LED control |
| POST | /api/control/ac?state=on or off | AC control |
| POST | /api/control/door?state=lock or unlock | Door lock control |
| POST | /api/control/smartplug?state=on or off | Smart plug control |

## Project Structure
```
BBM460-smart-home-iot/
├── backend/                          # Spring Boot application
│   └── src/main/java/
│       ├── Config/MqttConfig.java    # MQTT client, broker connection
│       ├── Controller/ApiController.java  # REST endpoints
│       └── Service/MqttService.java  # Topic subscriptions, sensor state
└── frontend/                         # React application
    └── src/
        ├── context/SmartHomeContext.tsx   # Global state, API calls
        ├── components/Dashboard.tsx       # Main layout
        └── components/features/           # 6 dashboard panels
```

## Author

**Fatih Oter** — Computer Engineering, Hacettepe University
