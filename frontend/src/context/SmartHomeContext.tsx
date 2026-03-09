import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import axios from 'axios';

// Backend API adresi
const API_BASE_URL = 'http://localhost:8080/api';

// Backend'den gelen sensör verilerinin tipi
interface SensorData {
  'home/climate/temprature': string;
  'home/climate/humidity': string;
  'home/plants/moisture': string;
  'home/safety/fire': string;
}

// Cihazların durumlarını tutacak tip
interface DeviceStates {
  led: boolean;
  ac: boolean;
  door: boolean;
  smartPlug: boolean;
}

interface SmartHomeContextType {
  sensorData: Partial<SensorData>;
  deviceStates: DeviceStates;
  controlLed: (turnOn: boolean) => Promise<void>;
  controlAc: (turnOn: boolean) => Promise<void>;
  controlDoor: (lock: boolean) => Promise<void>;
  controlSmartPlug: (turnOn: boolean) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const SmartHomeContext = createContext<SmartHomeContextType | undefined>(undefined);

export const useSmartHome = () => {
  const context = useContext(SmartHomeContext);
  if (!context) {
    throw new Error('useSmartHome must be used within a SmartHomeProvider');
  }
  return context;
};

interface SmartHomeProviderProps {
  children: ReactNode;
}

export const SmartHomeProvider = ({ children }: SmartHomeProviderProps) => {
  const [sensorData, setSensorData] = useState<Partial<SensorData>>({});
  const [deviceStates, setDeviceStates] = useState<DeviceStates>({
    led: false,
    ac: false,
    door: true,
    smartPlug: false,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Sensör verilerini backend'den çekme fonksiyonu
  const fetchSensorData = useCallback(async () => {
    try {
      const response = await axios.get<SensorData>(`${API_BASE_URL}/sensor-data`);
      setSensorData(response.data);
      setError(null);
    } catch (err) {
      console.error("Sensör verileri alınamadı:", err);
      setError("Sensör verileri alınamadı. Lütfen daha sonra tekrar deneyin.");
    } finally {
      if (loading) setLoading(false);
    }
  }, [loading]);

  // Periyodik veri güncelleme
  useEffect(() => {
    fetchSensorData();
    const intervalId = setInterval(fetchSensorData, 5000);
    return () => clearInterval(intervalId);
  }, [fetchSensorData]);

  // Cihaz kontrol fonksiyonu
  const sendControlCommand = useCallback(async (device: 'led' | 'ac' | 'door' | 'smartplug', state: string) => {
    setError(null);
    try {
      await axios.post(`${API_BASE_URL}/control/${device}?state=${state}`);
      
      setDeviceStates(prev => ({
        ...prev,
        led: device === 'led' ? state === 'on' : prev.led,
        ac: device === 'ac' ? state === 'on' : prev.ac,
        door: device === 'door' ? state === 'lock' : prev.door,
        smartPlug: device === 'smartplug' ? state === 'on' : prev.smartPlug
      }));
    } catch (err) {
      console.error(`${device} kontrolü sırasında hata:`, err);
      setError(`${device} kontrolü sırasında bir hata oluştu. Lütfen tekrar deneyin.`);
      fetchSensorData();
    }
  }, [fetchSensorData]);

  // Spesifik kontrol fonksiyonları
  const controlLed = useCallback((turnOn: boolean) => 
    sendControlCommand('led', turnOn ? 'on' : 'off'), [sendControlCommand]);

  const controlAc = useCallback((turnOn: boolean) => 
    sendControlCommand('ac', turnOn ? 'on' : 'off'), [sendControlCommand]);

  const controlDoor = useCallback((lock: boolean) => 
    sendControlCommand('door', lock ? 'lock' : 'unlock'), [sendControlCommand]);

  const controlSmartPlug = useCallback((turnOn: boolean) => 
    sendControlCommand('smartplug', turnOn ? 'on' : 'off'), [sendControlCommand]);

  const value = {
    sensorData,
    deviceStates,
    controlLed,
    controlAc,
    controlDoor,
    controlSmartPlug,
    loading,
    error,
  };

  return (
    <SmartHomeContext.Provider value={value}>
      {children}
    </SmartHomeContext.Provider>
  );
};