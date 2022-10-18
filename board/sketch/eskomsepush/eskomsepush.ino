//#define DEBUG

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
char stage1 = 0;
char stage2 = 0;
char stage3 = 0;
char stage4 = 0;
char stage5 = 0;
char stage6 = 0;
char stage7 = 0;
char stage8 = 0;

char led1 = 0;
char led2 = 0;
char led3 = 0;
char led4 = 0;
char led5 = 0;
char led6 = 0;
char led7 = 0;
char led8 = 0;
char led9 = 0;
char led10 = 0;
char led11 = 0;

void test(){
  #ifdef DEBUG
    Serial.println("LED Test Running");
  #endif


}
void setup() {
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
  
  #ifdef DEBUG
  Serial.begin(115200);
  #endif 

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
}

void loop() {
  //Send an HTTP POST request every 10 minutes
  if ((millis() - lastTime) > timerDelay) {
    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;

      String serverPath = serverName + "v2";
      
      // Your Domain name with URL path or IP address with path
      http.begin(serverPath.c_str());
      ;
      // Send HTTP GET request
      int httpResponseCode = http.GET();
      
      if (httpResponseCode>0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();

        stage1 = payload.charAt(0);
        stage2 = payload.charAt(2);
        stage3 = payload.charAt(4);
        stage4 = payload.charAt(6);
        stage5 = payload.charAt(8);
        stage6 = payload.charAt(10);
        stage7 = payload.charAt(12);
        stage8 = payload.charAt(14);

        led1 = payload.charAt(16);
        led2 = payload.charAt(18);
        led3 = payload.charAt(20);
        led4 = payload.charAt(22);
        led5 = payload.charAt(24);
        led6 = payload.charAt(26);
        led7 = payload.charAt(28);
        led8 = payload.charAt(30);
        led9 = payload.charAt(32);
        led10 = payload.charAt(34);
        led11 = payload.charAt(36);
        
        digitalWrite(STAGE1, LOW);
        digitalWrite(STAGE2, LOW);
        digitalWrite(STAGE3, LOW);
        digitalWrite(STAGE4, LOW);
        digitalWrite(STAGE5, LOW);
        digitalWrite(STAGE6, LOW);
        digitalWrite(STAGE7, LOW);
        digitalWrite(STAGE8, LOW);

        if (stage1 = '1') {
          digitalWrite(STAGE1, HIGH);          
        }
        if (stage2 = '1') {
          digitalWrite(STAGE2, HIGH);          
        }
        if (stage3 = '1') {
          digitalWrite(STAGE3, HIGH);          
        }
        if (stage4 = '1') {
          digitalWrite(STAGE4, HIGH);          
        }
        if (stage5 = '1') {
          digitalWrite(STAGE5, HIGH);          
        }
        if (stage6 = '1') {
          digitalWrite(STAGE6, HIGH);          
        }
        if (stage7 = '1') {
          digitalWrite(STAGE7, HIGH);          
        }
        if (stage8 = '1') {
          digitalWrite(STAGE8, HIGH);          
        }

        digitalWrite(LED1, LOW);
        digitalWrite(LED2, LOW);
        digitalWrite(LED3, LOW);
        digitalWrite(LED4, LOW);
        digitalWrite(LED5, LOW);
        digitalWrite(LED6, LOW);
        digitalWrite(LED7, LOW);
        digitalWrite(LED8, LOW);
        digitalWrite(LED9, LOW);
        digitalWrite(LED10, LOW);
        digitalWrite(LED11, LOW);

        if (led1 = '1') {
          digitalWrite(LED1, HIGH);          
        }
        if (led2 = '1') {
          digitalWrite(LED2, HIGH);          
        }
        if (led3 = '1') {
          digitalWrite(LED3, HIGH);          
        }
        if (led4 = '1') {
          digitalWrite(LED4, HIGH);          
        }
        if (led5 = '1') {
          digitalWrite(LED5, HIGH);          
        }
        if (led6 = '1') {
          digitalWrite(LED6, HIGH);          
        }
        if (led7 = '1') {
          digitalWrite(LED7, HIGH);          
        }
        if (led8 = '1') {
          digitalWrite(LED8, HIGH);          
        }
        if (led9 = '1') {
          digitalWrite(LED9, HIGH);          
        }
        if (led10 = '1') {
          digitalWrite(LED10, HIGH);          
        }
        if (led11 = '1') {
          digitalWrite(LED11, HIGH);          
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