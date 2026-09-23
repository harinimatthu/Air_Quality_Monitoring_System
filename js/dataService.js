/**
 * Data Service
 * Handles fetching data from the real ESP8266 API or generating mock data.
 */

// Initial mock state
let mockData = {
    air: 350,
    temperature: 28.5,
    humidity: 55.0,
    status: "GOOD"
};

/**
 * Generate realistic shifting mock data for demo mode
 */
let mockCycle = 0;
function generateMockData() {
    mockCycle = (mockCycle + 1) % 4;
    
    // Cycle through 4 states: 200 (GOOD), 400 (MODERATE), 600 (POOR), 850 (HAZARDOUS)
    if (mockCycle === 0) mockData.air = 200;
    else if (mockCycle === 1) mockData.air = 400;
    else if (mockCycle === 2) mockData.air = 600;
    else mockData.air = 850;
    
    mockData.temperature += (Math.random() * 1.0) - 0.5;
    mockData.humidity += (Math.random() * 2.0) - 1.0;
    
    if (mockData.temperature < 15) mockData.temperature = 15;
    if (mockData.temperature > 40) mockData.temperature = 40;
    
    if (mockData.humidity < 20) mockData.humidity = 20;
    if (mockData.humidity > 95) mockData.humidity = 95;

    // Apply threshold logic
    if (mockData.air < CONFIG.THRESHOLDS.GOOD) mockData.status = "GOOD";
    else if (mockData.air < CONFIG.THRESHOLDS.MODERATE) mockData.status = "MODERATE";
    else if (mockData.air < CONFIG.THRESHOLDS.POOR) mockData.status = "POOR";
    else mockData.status = "HAZARDOUS";

    // Format numbers
    return {
        air: Math.floor(mockData.air),
        temperature: parseFloat(mockData.temperature.toFixed(1)),
        humidity: Math.floor(mockData.humidity),
        status: mockData.status
    };
}

/**
 * Fetch sensor data
 * Returns a promise that resolves to the data object
 */
async function fetchSensorData() {
    if (CONFIG.USE_MOCK_DATA) {
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(() => {
                resolve(generateMockData());
            }, 300);
        });
    } else {
        try {
            const response = await fetch(CONFIG.ESP8266_API_URL, {
                method: 'GET',
                // Important for cross-origin if frontend is hosted separately
                mode: 'cors',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error("Failed to fetch from ESP8266:", error);
            throw error; // Let app.js handle the error
        }
    }
}
