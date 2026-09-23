/**
 * Configuration Settings
 * Central place to configure the dashboard
 */

const CONFIG = {
    // Set to true to use generated demo data, false to fetch from real ESP8266
    USE_MOCK_DATA: false,
    
    // The IP address/URL of the ESP8266 API
    ESP8266_API_URL: 'http://10.93.97.246/api/data',
    
    // The URL displayed in the QR Code section
    DASHBOARD_URL: 'http://10.93.97.246/api/data',
    
    // How often to update the dashboard (in milliseconds)
    REFRESH_INTERVAL_MS: 2000,
    
    // Thresholds for Air Quality classification
    // Based on raw MQ135 readings (0-1023)
    THRESHOLDS: {
        GOOD: 300,
        MODERATE: 500,
        POOR: 700
        // >= 700 will be HAZARDOUS
    }
};
