#define STAGE1 1
#define STAGE2 2
#define STAGE3 4
#define STAGE4 5
#define STAGE5 12
#define STAGE6 113
#define STAGE7 114
#define STAGE8 115

#define LED1 16
#define LED2 17
#define LED3 18
#define LED4 19
#define LED5 21
#define LED6 22
#define LED7 23
#define LED8 25
#define LED9 26
#define LED10 27
#define LED11 0

#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "The Lan Before Time";
const char* password = "";

//Your Domain name with URL path or IP address with path
String serverName = "https://shark-app-taxz7.ondigitalocean.app/";

// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastTime = 0;
// Timer set to 10 minutes (600000)
//unsigned long timerDelay = 600000;
// Set timer to 5 seconds (5000)
unsigned long timerDelay = 5000;
char stage = 0;
char isLoadshedding = 0;
char ledSelection = 0;

void setup() {
  Serial.begin(115200); 

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
 
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");

  pinMode(STAGE1, OUTPUT);
  pinMode(STAGE2, OUTPUT);
  pinMode(STAGE3, OUTPUT);
  pinMode(STAGE4, OUTPUT);
  pinMode(STAGE5, OUTPUT);
  pinMode(STAGE6, OUTPUT);
  pinMode(STAGE7, OUTPUT);
  pinMode(STAGE8, OUTPUT);

  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(LED3, OUTPUT);
  pinMode(LED4, OUTPUT);
  pinMode(LED5, OUTPUT);
  pinMode(LED6, OUTPUT);
  pinMode(LED7, OUTPUT);
  pinMode(LED8, OUTPUT);
  pinMode(LED9, OUTPUT);
  pinMode(LED10, OUTPUT);
  pinMode(LED11, OUTPUT);
}

void loop() {
  //Send an HTTP POST request every 10 minutes
  if ((millis() - lastTime) > timerDelay) {
    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;

      String serverPath = serverName + "";
      
      // Your Domain name with URL path or IP address with path
      http.begin(serverPath.c_str());
      ;
      // Send HTTP GET request
      int httpResponseCode = http.GET();
      
      if (httpResponseCode>0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();

        stage = payload.charAt(0);
        isLoadshedding = payload.charAt(2);
        ledSelection = payload.charAt(4);
        Serial.println(stage);
        Serial.println(isLoadshedding);
        Serial.println(ledSelection);
        
        switch (stage) {
          case '1':
            digitalWrite(STAGE1, HIGH);
            Serial.print("We are at stage 1");
            break;
          case '2':
            digitalWrite(STAGE2, HIGH);
            Serial.print("We are at stage 2");
            break;
          case '3':
            digitalWrite(STAGE3, HIGH);
            Serial.print("We are at stage 3");
            break;
          case '4':
            digitalWrite(STAGE4, HIGH);
            Serial.print("We are at stage 4");
            break;
          case '5':
            digitalWrite(STAGE5, HIGH);
            Serial.print("We are at stage 5");
            break;
          case '6':
            digitalWrite(STAGE6, HIGH);
            Serial.print("We are at stage 6");
            break;
          case '7':
            digitalWrite(STAGE7, HIGH);
            Serial.print("We are at stage 7");
            break;
          case '8':
            digitalWrite(STAGE8, HIGH);
            Serial.print("We are at stage 8");
            break;
          default:
            digitalWrite(STAGE1, LOW);
            digitalWrite(STAGE2, LOW);
            digitalWrite(STAGE3, LOW);
            digitalWrite(STAGE4, LOW);
            digitalWrite(STAGE5, LOW);
            digitalWrite(STAGE6, LOW);
            digitalWrite(STAGE7, LOW);
            digitalWrite(STAGE8, LOW);
            Serial.print("No loadshedding");
        }

        switch (ledSelection) {
          case '1':
            digitalWrite(LED1, HIGH);
            break;
          case '2':
            digitalWrite(LED2, HIGH);
            break;
          case '3':
            digitalWrite(LED3, HIGH);
            break;
          case '4':
            digitalWrite(LED4, HIGH);
            break;
          case '5':
            digitalWrite(LED5, HIGH);
            break;
          case '6':
            digitalWrite(LED6, HIGH);
            break;
          case '7':
            digitalWrite(LED7, HIGH);
            break;
          case '8':
            digitalWrite(LED8, HIGH);
            break;
          case '9':
            digitalWrite(LED9, HIGH);
            break;
          default:
            digitalWrite(LED1, LOW);
            digitalWrite(LED2, LOW);
            digitalWrite(LED3, LOW);
            digitalWrite(LED4, LOW);
            digitalWrite(LED5, LOW);
            digitalWrite(LED6, LOW);
            digitalWrite(LED7, LOW);
            digitalWrite(LED8, LOW);
            digitalWrite(LED9, LOW);
            Serial.print("No schedule");
        }
        // Serial.println(payload);

        // if (!parsed.success()) {   //Check for errors in parsing
        //   Serial.println("Parsing failed");
        //   delay(5000);
        //   return;
        // }
      }
      else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      // Free resources
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}