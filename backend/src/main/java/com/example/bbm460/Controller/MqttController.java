package com.example.bbm460.Controller;

import com.example.bbm460.Service.MqttService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mqtt")
public class MqttController {

    private final MqttService mqttService;

    public MqttController(MqttService mqttService) {
        this.mqttService = mqttService;
    }

    @PostMapping("/led/{state}")
    public String lightControl(@PathVariable String state) {
        if (state.equalsIgnoreCase("on")) {
            mqttService.controlLed(true);
        } else if (state.equalsIgnoreCase("off")) {
            mqttService.controlLed(false);
        } else {
            return "Geçersiz parametre! on veya off gönderin.";
        }
        return "MQTT mesajı gönderildi: " + state;
    }

    @PostMapping("/startClimate/{state}")
    public String climateControl(@PathVariable String state) {
        if (state.equalsIgnoreCase("on")) {
            mqttService.controlAc(true);
        } else if (state.equalsIgnoreCase("off")) {
            mqttService.controlAc(false);
        } else {
            return "Geçersiz parametre! on veya off gönderin.";
        }
        return "MQTT mesajı gönderildi: " + state;
    }
}
