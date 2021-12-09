#include <HX711_ADC.h>
#if defined(ESP8266)|| defined(ESP32) || defined(AVR)
#include <EEPROM.h>
#endif

//pins:
const int HX711_dout = 10; //mcu > HX711 dout pin
const int HX711_sck = 11; //mcu > HX711 sck pin

//HX711 constructor:
HX711_ADC LoadCell(HX711_dout, HX711_sck);

const int calVal_calVal_eepromAdress = 0;
unsigned long t = 0;

unsigned long weightUnit = 0;

unsigned long readAndConvertWeightUnit() {
  while(!Serial.available()) {} // waiting for user inpu
  String stringData = "";
  byte ch;
  while (Serial.available()) {
      ch = Serial.read();

      stringData += (char)ch;

      if (ch=='\r') {  // Command recevied and ready.
         stringData.trim();
      }
   }
   Serial.print("Selected Unit: ");
   Serial.println(stringData);
   unsigned long lWeightUnit = 1;
   if (stringData == "g") {
     lWeightUnit = 1000;
   } else if (stringData == "kg") {
     lWeightUnit = 10000;
   }
   return lWeightUnit;
}

void setup() {
  Serial.begin(57600);
  Serial.println("Starting...");

  Serial.println("Please send a weight unit to serial terminal (g, kg)");
  weightUnit = readAndConvertWeightUnit();

    float calibrationValue; // calibration value
  calibrationValue = 696.0; // uncomment this if you want to set this value in the sketch
  #if defined(ESP8266) || defined(ESP32)
    //EEPROM.begin(512); // uncomment this if you use ESP8266 and want to fetch this value from eeprom
  #endif
    //EEPROM.get(calVal_eepromAdress, calibrationValue); // uncomment this if you want to fetch this value from eeprom

  LoadCell.begin();
  //LoadCell.setReverseOutput();
  unsigned long stabilizingtime = 4000; // tare preciscion can be improved by adding a few seconds of stabilizing time
  boolean _tare = true; //set this to false if you don't want tare to be performed in the next step
  Serial.println("Taring scale. Please wait...");
  LoadCell.start(stabilizingtime, _tare);
  if (LoadCell.getTareTimeoutFlag()) {
    Serial.println("Tare Timeout, check MCU>HX711 wiring and pin designations.");
  }
  else {
    LoadCell.setCalFactor(calibrationValue); // set calibration factor (float)
    Serial.println("Startup is complete");
  }

  while (!LoadCell.update());
  Serial.print("Calibration value: ");
  Serial.println(LoadCell.getCalFactor());
  Serial.print("HX711 measured conversion time ms: ");
  Serial.println(LoadCell.getConversionTime());
  Serial.print("HX711 measured sampling rate HZ: ");
  Serial.println(LoadCell.getSPS());
  Serial.print("HX711 measured settlingtime ms: ");
  Serial.println(LoadCell.getSettlingTime());
  Serial.println("Note that the settling time may increase significantly if you use delay() in your sketch!");
  if (LoadCell.getSPS() < 7) {
    Serial.println("!!Sampling rate is lower than specification, check MCU>HX711 wiring and pin designations");
  }
  else if (LoadCell.getSPS() > 100) {
    Serial.println("!!Sampling rate is higher than specification, check MCU>HX711 wiring and pin designations");
  }

  Serial.println("\nTo tare, send 't' from serial terminal");
}

void loop() {
  static boolean newDataReady = false;
  const int serialPrintInterval = 500; //increase value to slow down serial print activity

  // check for new data/start next conversion:
  newDataReady = LoadCell.update();

  // get smoothed value from the dataset:
  if (newDataReady) {
    if (millis() > t + serialPrintInterval) {
      float i = LoadCell.getData();
      Serial.print("Load_cell output val: ");
      if (i < 1.0) {
        Serial.println(0); // Weight smaller than 0 means, there is no significant weight on the scale
      } else {
        Serial.println(weightUnit/i);
      }
      newDataReady = false;
      t = millis();
    }
  }

  // receive command from serial terminal, send 't' to initiate tare operation:
  if (Serial.available() > 0) {
    char inByte = Serial.read();
    if (inByte == 't') LoadCell.tareNoDelay();
  }

  // check if last tare operation is complete:
  if (LoadCell.getTareStatus() == true) {
    Serial.println("Tare complete");
  }
}
