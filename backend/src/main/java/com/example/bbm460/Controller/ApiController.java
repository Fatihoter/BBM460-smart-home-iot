package com.example.bbm460.Controller;

import com.example.bbm460.Service.MqttService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
// Frontend'den gelen istekleri kabul etmek için CORS ayarı (localhost:5173 varsayılan Vite portu)
// Gerekirse burayı frontend'inizin çalıştığı adrese göre güncelleyin.
@CrossOrigin(origins = "http://localhost:5173") 
public class ApiController {

    @Autowired
    private MqttService mqttService;

    // Tüm sensör verilerini döndüren endpoint
    @GetMapping("/sensor-data")
    public ResponseEntity<Map<String, String>> getSensorData() {
        // Servisten en güncel verileri al
        Map<String, String> data = mqttService.getAllSensorData();
        // Verileri JSON olarak döndür
        return ResponseEntity.ok(data);
    }

    // LED kontrol endpoint'i
    // Örnek istek: POST /api/control/led?state=on veya /api/control/led?state=off
    @PostMapping("/control/led")
    public ResponseEntity<String> controlLed(@RequestParam String state) {
        boolean turnOn = state.equalsIgnoreCase("on");
        mqttService.controlLed(turnOn);
        return ResponseEntity.ok("LED command sent: " + (turnOn ? "ON" : "OFF"));
    }

    // Klima kontrol endpoint'i
    // Örnek istek: POST /api/control/ac?state=on veya /api/control/ac?state=off
    @PostMapping("/control/ac")
    public ResponseEntity<String> controlAc(@RequestParam String state) {
        boolean turnOn = state.equalsIgnoreCase("on");
        mqttService.controlAc(turnOn);
        return ResponseEntity.ok("AC command sent: " + (turnOn ? "ON" : "OFF"));
    }

    // Kapı kilidi kontrol endpoint'i
    // Örnek istek: POST /api/control/door?state=lock veya /api/control/door?state=unlock
    @PostMapping("/control/door")
    public ResponseEntity<String> controlDoor(@RequestParam String state) {
        boolean lock = state.equalsIgnoreCase("lock");
        mqttService.controlDoor(lock);
        return ResponseEntity.ok("Door command sent: " + (lock ? "LOCK" : "UNLOCK"));
    }

    // Yeni: Akıllı Priz kontrol endpoint'i
    // Örnek istek: POST /api/control/smartplug?state=on veya /api/control/smartplug?state=off
    @PostMapping("/control/smartplug")
    public ResponseEntity<String> controlSmartPlug(@RequestParam String state) {
        boolean turnOn = state.equalsIgnoreCase("on");
        mqttService.controlSmartPlug(turnOn);
        return ResponseEntity.ok("Smart Plug command sent: " + (turnOn ? "ON" : "OFF"));
    }
} 