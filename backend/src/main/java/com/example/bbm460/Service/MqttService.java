package com.example.bbm460.Service;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.eclipse.paho.client.mqttv3.IMqttMessageListener;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
public class MqttService {

    @Autowired
    private MqttClient mqttClient;

    // Sensör verilerini saklamak için thread-safe bir map
    private final ConcurrentMap<String, String> sensorData = new ConcurrentHashMap<>();

    // ESP32'nin topic'leri (ve backend'in dinleyeceği)
    private final String[] subscriptionTopics = {
            "home/climate/temprature",
            "home/climate/humidity",
            "home/plants/moisture",
            "home/safety/fire"
    };

    // Kontrol topic'leri
    private final String ledControlTopic = "home/lights/control";
    private final String acControlTopic = "home/climate/ac/control";
    private final String doorLockControlTopic = "home/security/door";
    private final String smartPlugControlTopic = "home/power/smartplug/control";

    @PostConstruct
    private void initialize() {
        try {
            if (!mqttClient.isConnected()) {
                System.err.println("MQTT Client bağlı değil. Topic'lere abone olunamıyor.");
                // Bağlantıyı yeniden kurmayı dene
                MqttConnectOptions options = new MqttConnectOptions();
                options.setAutomaticReconnect(true);
                options.setCleanSession(true);
                options.setConnectionTimeout(30);
                mqttClient.connect(options);
            }

            // Gelen mesajları işlemek için listener
            IMqttMessageListener messageListener = (topic, message) -> {
                try {
                    String payload = new String(message.getPayload());
                    System.out.println("Topic '" + topic + "' üzerinden mesaj alındı: " + payload);
                    sensorData.put(topic, payload);
                } catch (Exception e) {
                    System.err.println("Mesaj işleme hatası: " + e.getMessage());
                }
            };

            // Tüm sensör topic'lerine abone ol
            for (String topic : subscriptionTopics) {
                if (topic != null && !topic.trim().isEmpty()) {
                    try {
                        mqttClient.subscribe(topic, messageListener);
                        System.out.println("Topic'e abone olundu: " + topic);
                    } catch (MqttException e) {
                        System.err.println("Topic aboneliği hatası (" + topic + "): " + e.getMessage());
                    }
                }
            }
        } catch (MqttException e) {
            System.err.println("MQTT başlatma hatası: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Belirli bir sensör verisini almak için metot
    public String getSensorData(String topic) {
        return sensorData.getOrDefault(topic, "N/A"); // Veri yoksa "N/A" döndür
    }

    // Tüm sensör verilerini almak için metot (Controller'da kullanılacak)
    public ConcurrentMap<String, String> getAllSensorData() {
        return sensorData;
    }

    // Belirli bir topic'e mesaj göndermek için genel metot
    private void publish(String topic, String payload) {
        if (!mqttClient.isConnected()) {
            System.err.println("MQTT Client not connected. Cannot publish message to topic: " + topic);
            return;
        }
        try {
            MqttMessage message = new MqttMessage(payload.getBytes());
            message.setQos(1); // Mesajın en az bir kere ulaşmasını garantile (isteğe bağlı)
            // message.setRetained(true); // Son mesajı sakla (broker destekliyorsa)
            mqttClient.publish(topic, message);
            System.out.println("Published message to topic '" + topic + "': " + payload);
        } catch (MqttException e) {
            System.err.println("Error publishing message to topic '" + topic + "': " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Kontrol fonksiyonları
    public void controlLed(boolean turnOn) {
        publish(ledControlTopic, turnOn ? "LED_ON" : "LED_OFF");
    }

    public void controlAc(boolean turnOn) {
        publish(acControlTopic, turnOn ? "AC_ON" : "AC_OFF");
    }

    public void controlDoor(boolean lock) {
        publish(doorLockControlTopic, lock ? "LOCK" : "UNLOCK");
    }

    // Yeni: Akıllı Priz Kontrol Fonksiyonu
    public void controlSmartPlug(boolean turnOn) {
        publish(smartPlugControlTopic, turnOn ? "PLUG_ON" : "PLUG_OFF");
    }

    // Uygulama kapatıldığında MQTT bağlantısını düzgünce kapat
    @PreDestroy
    private void cleanup() {
        try {
            if (mqttClient.isConnected()) {
                System.out.println("Disconnecting from MQTT broker...");
                // Abonelikleri kaldır
                for (String topic : subscriptionTopics) {
                    // Topic'in geçerli olup olmadığını kontrol et
                    if (topic != null && !topic.trim().isEmpty()) {
                        mqttClient.unsubscribe(topic);
                        System.out.println("Unsubscribed from topic: " + topic);
                    }
                }
                mqttClient.disconnect();
                System.out.println("Disconnected.");
            }
            mqttClient.close();
        } catch (MqttException e) {
            System.err.println("Error disconnecting from MQTT broker: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
