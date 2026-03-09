package com.example.bbm460.Config;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MqttConfig {

    private final String broker = "tcp://broker.hivemq.com:1883";
    // Benzersiz bir ID, farklı backend instanceları için çakışmayı önler
    private final String clientId = "SpringBootBackendClient_" + System.currentTimeMillis();
    private final MemoryPersistence persistence = new MemoryPersistence();

    @Bean
    public MqttClient mqttClient() throws MqttException {
        MqttClient client = new MqttClient(broker, clientId, persistence);
        MqttConnectOptions options = new MqttConnectOptions();
        options.setAutomaticReconnect(true);
        options.setCleanSession(true);
        options.setConnectionTimeout(30);    // Bağlantı zaman aşımını artırdık
        options.setKeepAliveInterval(60);    // Keep-alive süresini artırdık
        options.setMaxReconnectDelay(5000);  // Yeniden bağlanma gecikmesini ayarladık

        try {
            System.out.println("MQTT broker'a bağlanılıyor: " + broker);
            client.connect(options);
            System.out.println("MQTT broker'a başarıyla bağlanıldı.");

            // Topic'lere abone olma
            client.subscribe("home/climate/temprature", (topic, message) -> {
                String payload = new String(message.getPayload());
                System.out.println("Sıcaklık verisi alındı: " + payload);
            });

            client.subscribe("home/climate/humidity", (topic, message) -> {
                String payload = new String(message.getPayload());
                System.out.println("Nem verisi alındı: " + payload);
            });

        } catch (MqttException e) {
            System.err.println("MQTT bağlantı hatası: " + e.getMessage());
            throw e;
        }

        return client;
    }
}


