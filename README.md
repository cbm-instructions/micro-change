# Inhaltsverzeichnis

<!-- TOC -->
- [Inhaltsverzeichnis](#inhaltsverzeichnis)
- [ How to build Ben the Bin](#how-to-build-ben-the-bin)
  - [Unser Projekt](#unser-projekt)
  - [Material](#material)
  - [Werkzeuge](#werkzeuge)
  - [Empfohlene Vorkenntnisse](#empfohlene-vorkenntnisse)
  - [Bauanleitung](#bauanleitung)
    - [Verkabelung](#verkabelung)
    - [Die Bodenplatte bauen](#die-bodenplatte-bauen)
    - [Den Mülleimer bauen](#den-mülleimer-bauen)
      - [Einbau der Elektronik](#einbau-der-elektronik)
- [Installationsanleitung](#installationsanleitung)
  - [Raspberry Pi Setup](#raspberry-pi-setup)
    - [Benötigte Utensilien](#benötigte-utensilien)
    - [Setup](#setup)
  - [Arduino Setup](#arduino-setup)
    - [Benötigte Utensilien](#benötigte-utensilien)
    - [Setup](#setup)
  - [Installation der Anwendung auf dem Raspberry Pi](#installation-der-anwendung-auf-dem-raspberry-pi)
    - [Benötigte Utensilien](#benötigte-utensilien)
    - [Benötigte Software auf dem Raspberry Pi](#benötigte-software-auf-dem-raspberry-pi)
    - [Build and Run](#build-and-run)
- [Ausblick](#ausblick)
<!-- /TOC -->


#  How to build Ben the Bin
Thema des diesjährigen CBM-Projekts ist Nachhaltigkeit. Unsere Gruppe hat sich dafür auf die Müllproduktion eines Haushalts fokussiert. Nutzern und Nutzerinnen soll ihre Müllproduktion aufgezeigt werden, um dann durch direktes positives und negatives Feedback, ihr Verhalten zu ändern.

<p align="center">
  <img width="400" height="650" src="images/micro-change/Ben_the_bin.png" />
</p>

## Unser Projekt
*Ben* der smarte Mülleimer eignet sich am Besten für Papier- und Verpackungsmüll. In der Basis des smarten Mülleimers befinden sich Wägezellen, da wir die Müllproduktion anhand des Gewichts ermitteln. Dem Nutzern und Nutzerinnen werden auf einem Display Statistiken und Errungenschaften angezeigt. Durch Achievements sollen Nutzer*innen zu einem bewussteren und besseren Umgang mit ihrem Müll motiviert werden. 

## Material

- Arduino Uno R3
- 2x HX711 ADC-Modul mit 5kg Wägezelle
	- z.B. [hier](https://www.conrad.de/de/p/joy-it-sen-hx711-10-waegezelle-passend-fuer-einplatinen-computer-arduino-raspberry-pi-1-st-2475885.html) bei Conrad zu kaufen
	- optional: Schnittstelle(n) zwischen Arduino und Wägezellen kaufen um sich das Löten zu sparen
- 5 Platten DIN A2 4mm Sperrholz, idealerweise aus Pappel  
	- z.B. [hier](https://www.bauhaus.info/sperrholzplatten/sperrholz/p/14453914) bei Bauhaus zu kaufen
-  Raspberry Pi 7 Display mit kapazitiven Touchscreen
- Breadboard klein
- 12 Jumperkabel (male-to-male)
- 8 Schrauben und 8 Muttern 
- Holzleim
- Klebeband
- Isolierband
- Lötzinn

## Werkzeuge
- Lasercutter
- Lötkolben
- Bohrmaschine
- Schraubenzieher

## Empfohlene Vorkenntnisse
* Grundkenntnisse in C oder C++
* Umgang mit Mikrocontrollern
* Lasercutterworkshop

## Bauanleitung
### Verkabelung
Die Verkabelung kann folgender Grafik entnommen werden:
<p align="center">
  <img width="600" height="600" src="images/micro-change/microChange_schaltplan.png" />
</p>
	
Entweder man lötet die Kabel von der Wägezelle zum HX711 ADC-Modul oder verwendet eine fertige Schnittstelle, bei der man die Kabel nur einstecken muss. Kostenpunkt für letzteres sind ca 5€. Für mehr Stabilität, insbesondere an den Lötstellen, sollte man die Kabel mit Isolierband fixieren. Nach dem Anschluss aller Kabel sollte das in etwa so aussehen:
	
<p align="center">
  <img width="550" height="500" src="images/micro-change/schaltplan.jpeg" />
</p>

### Die Bodenplatte bauen
Jede Wägzelle muss mit einer geraden Fläche oben und unten verschaubt sein. Dafür lasercutten wir zwei Quadrate mit den Maßen 19x19 cm. 
Die Wägezellen werden parallel zueinander mit passenden Schrauben und Muttern befestigt. Auf der linken Abbildung wurden allerdings zu viele Löcher gebohrt; man benötig nur 4 Löcher, von denen sich je 2 schräg gegenüberstehen.

<p align="center">
  <img width="350" height="350" src="images/micro-change/bodenplatte.jpg" />
  <img width="350" height="350" src="images/micro-change/waegzellen.jpeg" />
</p>

Da die Schrauben überstehen, wurden auf der Unterseite noch Reststücke vom Lasercutten angeklebt. Ansonsten würde die Bodenplatte wackeln. Auf der Oberseite ist dies nicht zwingend nötig. So sieht das ganze später von oben aus:

<p align="center">
  <img width="350" height="350" src="images/micro-change/oben.jpeg" />
</p>

### Den Mülleimer bauen
Die [.svg Datei](/images/micro-change/Konsole.svg) hierfür wurde auf [festi.info](https://www.festi.info/boxes.py/) erstellt. Dabei haben wir das Preset _Console2_ ausgewählt, weil wir die Schräge für unser Display wollten. Wichtig dabei war, den Parameter  _thickness_ auf unser Holz anzupassen. _Burn correction_ wurde von 0,1 auf 0,09 reduziert. Dadurch hat man beim Zusammenstecken etwas mehr Spiel, was bei der Größe unserer Box hilfreich ist. Vor dem Lasercutten sollte man sich vergewissern, dass die Linienstärke bei *0,035mm* und die Farbe schwarz (*RGB000*) ist. Dies sieht man z.B. in _Adobe Illustrator_ oder _Inkscape._ Wir haben Pappelsperrholz als Material gewählt.  Die hiermit erstellten Pläne lassen sich einfach zusammenstecken und sind optisch ansprechend. Für die Breite und Tiefe wurde sich nach der Bodenplatte gerichtet, theoretisch lassen sich die Maße abändern solange die Bodenplatte noch rein passt.

<p align="center">
  <img width="400" height="600
  " src="images/micro-change/mülleimer_seitlich.jpeg" />
</p>

Zusätzlich haben wir eine Trennwand ausgeschnitten, die Müll und Elektronik trennt. Die svg-Datei hierfür befindet sich [hier](/images/micro-change/Konsole.svg). Da wir die Trennwand herausnehmen wollen, haben wir an beiden Seiten eine Art Schiene gebastelt:

<p align="center">
  <img width="300" height="400" src="images/micro-change/schiene.jpeg" />
</p>

Wichtig ist, alles erst zusammenzustecken, wenn der nächste Schritt, der Einbau der Elektronik vollendet ist.
Um das ganze optisch abzurunden wurde auf der Rückseite ein kleines Loch für das Netzkabel sowie ein Rechteck mit den Maßen 21,7 x 1,7cm ausgeschnitten. Letzteres schließt den Spalt zwischen Trennwand und Display. Dies ist allerdings nur Kosmetik.

#### Einbau der Elektronik
Zuerst wird das Display auf der Frontstück des Mülleimers geschraubt. Hierfür sollte vorgebohrt werden, damit das Holz nicht bricht.
</p>
<p align="center">
 <img width="400" height="300" src="images/micro-change/front.jpeg" />
 <img width="400" height="300" src="images/micro-change/front_display.jpeg" />
</p>

Die restliche Elektronik wird in dem Kompartment vor der Trennwand untergebracht. Dabei sollte kein starker Zug auf den Kabeln sein.
<p align="center">
  <img width="250" height="400" src="images/micro-change/arduino_eingebaut.jpeg" />
  <img width="250" height="400" src="images/micro-change/elektronik_innen.jpeg" />
</p>
Nun können alle Holzwände zusammengesteckt und das Frontstück inklusive Display mit Holzleim befestigt werden.

# Installationsanleitung

<mark style="background-color: orange; border-radius: 4px;">
WICHTIG:
</mark>

Bevor du fremden Code, wie z.B. eine Skript-Datei `run.sh` ausführst, vergewissere dich, dass die Datei keinen schädlichen Code beinhaltet.
Das ist besonders wichtig, wenn du aufgefordert wirst solch ein Skript mit Adminrechten auszuführen (`sudo <befehl>` führt ein Kommando mit Adminrechten aus)

In der folgenden Anleitng wird davon ausgegangen, dass auf allen Geräten entweder Raspbian/Raspberry OS oder Ubuntu verwendet wird. Die Installation kann auch auf anderen Betriebssystemen ausgeführt werden, weicht dann aber unter Umständen von den angegebenen Schritten und Befehlen ab.

## Raspberry Pi Setup

Als erstes muss der Raspberry Pi einsatzbereit gemacht werden. Die folgenden Schritte erklären wie der Raspberry Pi sowie das Touchdisplay für die weitere Installation vorbereitet werden.

### Benötigte Utensilien

- Ein Laptop oder Desktop Rechner
- Raspberry Pi mit passender SD-Karte
- 7" Raspberry Pi Touchdisplay 
- Eine Maus und Tastatur, die mit dem Raspberry Pi verbunden werden können

### Setup

1. Flashe die SD-Karte mit der aktuellsten stable Version von Raspbian bzw. Raspberry OS und stecke sie in den Raspberry Pi

2. Starte den Raspberry Pi und öffne ein Terminal (`Strg + Alt + T`) und update die Software mit:
```bash
sudo apt update && sudo apt upgrade -y
```

3. Ändere die Datei `/boot/config.txt` wie hier auf der folgenden Website, unter dem Punkt `Software setting`, beschrieben (https://www.waveshare.com/wiki/7inch_DSI_LCD)  

**Kurze Zusammenfassung**

Entkommentiere den folgenden Teil der Datei:
```
#camera_auto_detect=1
#dtoverlay=vc4-kms-v3d
```

Füge den folgenden Teil unter dem Punkt `[all]` hinzu:
```
dtoverlay=vc4-fkms-v3d
start_x=1
```

4. Fahre den Raspberry Pi runter

5. Verbinde das DSI Display und starte dann den Raspberry Pi wieder

6. Das DSI Display sollte jetzt funktionieren und wir können mit dem Rest der Installation fortfahren.


## Arduino Setup

Im folgenden Teil wird erklärt wie die benötigte Software auf den Arduino Uno gespielt wird. Damit dieser Teil vollständig durchgeführt werden kann, muss der Arduino Uno vollständig verkabelt und mit der Waage verbunden sein. Das ist nötig, da die Software für den Arduino mit den Kalibrierungsdaten der Waage angepasst werden muss.

### Benötigte Utensilien

- Ein Laptop oder Desktop Rechner
- Arduino Uno (mit Waage verbunden)
- Raspberry Pi

### Setup

1. Installiere die Arduino IDE auf dem Laptop bzw. Desktop PC
```bash
sudo apt install arduino
```

2. Wenn du es noch nicht getan hast, dann Klone das Git Repository für dieses Projekt mit:
```bash
git clone git@github.com:cbm-instructions/micro-change.git
```

3. Öffne die Arduino IDE und installiere die Library `HX711_ADC` von Olav Kallhovd (https://github.com/olkal/HX711_ADC) wie folgt:  
In der IDE klicke auf `Tools > Manage Libraries`  
dann suche nach `HX711_ADC` und klicke bei der oben beschriebenen Library auf `Install`.

4. Wenn die Library installiert ist kannst du das Kalibierungsprogramm laden. Das funktioniert wie folgt:  
In der IDE klicke auf `File > Examples > HX711_ADC > Calibration`.  
Es sollte sich ein neues Fenster geöffnet haben.

5. Das in Schritt 4 geöffnete Programm muss zweimal (einmal für jede Wägezelle) durchgeführt werden. Um das zu tun müssen für jede Wägezelle zwei Ports angegeben werden. Diese Nummern der Ports entsprechen den Nummern der Anschlüsse auf dem Arduino, die für die Wägezellen verwendet wurden.  
In der geöffneten Datei `Calibration`, suche folgende Stelle:
```c++
//pins:
const int HX711_dout = 4;
const int HX711_sck = 5;
```
Ändere sie für die erste Kalibrierung auf:
```c++
//pins:
const int HX711_dout = 5;
const int HX711_sck = 6;
```

Starte jetzt die erste Kalibrierung. Klicke dafür auf den Button mit dem Pfeil. 

<p align="center">
   <img src="images/micro-change/installation/run_button.png" />
</p>

Um die Kalibrierung durchzuführen musst du den Serial Monitor öffnen. Klicke dazu auf `Tools > Serial Monitor`. Falls du die Meldung `ser_open(): can't open device "/dev/ttyACM0": Permission denied` bekommst, öffne ein Terminal und führe das folgende Kommando aus:
```bash
sudo chmod a+rwx /dev/ttyACM0
```
Der Pfad in der Fehlermeldung kann auch abweichen. In diesem Fall sollte das obige Kommando mit dem entsprechneden Pfad ausgeführt werden.

**Beispiel der Fehlermeldung:**

<p align="center">
  <img src="images/micro-change/installation/tty_permission_denied.png" />
</p>

Stelle den Serial Monitor auf den Port 57600. Du solltest jetzt eine Ausgabe bekommen. Befolge die Anweisungen der Ausgabe. Die Ausgabe einer kompletten Kalibrierung sieht wie folgt aus:

<p align="center">
   <img src="images/micro-change/installation/calibration/4_calibration_full.png" />
</p>

Notiere den Wert der Kalibrierung für die erste Zelle.  
**Beispiel:**
```
LoadCell_1 (5/6) = 130.59
```

Führe die Kalibrierung auch für die zweite Wägezelle mit den Pins 10 und 11 durch. 
Ändere sie für die zweite Kalibrierung auf:
```c++
//pins:
const int HX711_dout = 10;
const int HX711_sck = 11;
```

Danach solltest du 2 Werte für die Kalibrierung haben.

**Beispiel**
```
LoadCell_1 (5/6)   = 130.59
LoadCell_2 (10/11) = 117.95
```

Jetzt müssen die Werte der Pins und der Kalibrierungen nur noch in das Programm für die Waage eingefügt werden. Öffne hierzu die Datei `micro-change/arduino-scale/calibrated_loadcell_scale/calibrated_loadcell_scale.ino` und ändere sie wie folgt ab:
```c++
const int HX711_dout_1 = 5;  // Ändere von 4 -> 5
const int HX711_sck_1 = 6;   // Ändere von 5 -> 6
const int HX711_dout_2 = 10; // Ändere von 6 -> 10
const int HX711_sck_2 = 11;  // Ändere von 7 -> 11

// ... snippet ...

void setup() {
  
  // ... snippet ...

  calibrationValue_1 = 130.59; // Kalibrierung für 1. Wägezelle
  calibrationValue_2 = 117.95; // Kalibrierung für 2. Wägezelle
```

Speichere nun die Datei und spiele das Programm auf den Arduino indem du den Pfeil-Button drückst.

<p align="center">
   <img src="images/micro-change/installation/run_button.png" />
</p>

Wenn das Programm ohne Fehler auf den Arduino geladen wurde, kannst du diesen von deinem Laptop/Desktop entfernen und an den Raspberry Pi anschließen.

## Installation der Anwendung auf dem Raspberry Pi

### Benötigte Utensilien

- Ein Laptop oder Desktop Rechner
- Ein USB-Stick oder ein ähnlicher Datenträger, der sowohl mit dem Laptop/Desktop als auch mit dem Raspberry Pi verbunden werden kann
- Eine Maus und Tastatur, die mit dem Raspberry Pi verbunden werden können

### Benötigte Software auf dem Raspberry Pi

- Python 3 (sollte bereits installiert sein)  
```
sudo apt install python3
```

### Build and Run

Das Projekt sollte am besten nicht auf dem Raspberry Pi gebaut werden, da es dort zu Problemen mit der Anzahl an Node Packages kommen kann. Deshalb sollte hierfür ein Laptop oder Desktop Rechner verwendet werden.

- Öffne ein Terminal (`Strg + Alt + T`)

- Klone das Git Repo:
```bash
git clone git@github.com:cbm-instructions/micro-change.git
```

- Wechsle in den Ordner des Repos und dann in den Order 'bin-client'
```bash
cd micro-change/bin-client
```

- Installiere die benötigten Node-Packages
```bash
npm i
```

- Navigiere zurück zum Ordner des Repository
```bash
cd ..
```

- Mache die Datei `build_and_bundle_for_usb.sh` ausführbar.
```bash
chmod a+x build_and_bundle_for_usb.sh
```

- Führe die Datei `build_and_bundle_for_usb.sh` aus. Bevor du die Datei ausführst stelle sicher, dass sich in `bin-client` kein Ordner mit dem Namen `dist` befindet, falls doch lösche ihn. Dieser Prozess kann ein wenig dauern.  
**Befehl:**
```bash
./build_and_bundle_for_usb.sh
```

- Kopiere den Ordner `ben_bundle`, der beim vorigen Schritt entstanden ist, auf den USB-Stick.

- Schließe den USB-Stick an den Raspberry Pi an und verschiebe den Ordner `ben_bundle` auf den Raspberry Pi

- Öffne auf dem Raspberry Pi ein Terminal (`Strg + Alt + T`) und navigiere in den Ordern `ben_bundle`

- Mache die Skript-Dateien `setup.sh` und `run.sh` ausführbar.
```bash
chmod a+x setup.sh run.sh
```

- Führe die Datei `setup.sh` aus. Dieser Prozess kann ein wenig dauern.
```bash
./setup.sh
```

- In diesem Schritt wird die Anwendung gestartet. Damit die Anwendung richtig funktioniert muss der Arduino vollständig verkabelt und mit der angepassten Software für die Waage bespielt sein.  
Wenn `setup.sh` erfolgreich ausgeführt wurde, kannst du die Anwendung durch die Datei `run.sh` starten.
```bash
./run.sh
```

Falls `run.sh` die Anwendung nicht vollständig startet tue folgendes:

1. Öffne zwei Terminalfenster (`Strg + Alt + T`)

2. Im ersten Terminalfenster, navigiere nach `ben_bundle/scale-data-recorder` und führe folgenden Befehlt aus:
```bash
pip3 install --editable . && python3 recorder.py
```

3. Im zweiten Terminalfenster, navigiere in den von `setup.sh` erstellten Ordner `ben_bundle/squashfs-root` und führe folgenden Befehl aus:
```bash
./bin-client
```

Die Anwendung sollte nun vollständig starten.  
**Glückwunsch!** Du kannst nun BEN verwenden und deinem Ziel nach einer besseren Umwelt ein Stück näher kommen.

# Ausblick
Als Nächstes wäre eine Vernetzung mit anderen smarten Mülleimern denkbar. So könnte man sich mit Freunden, Fremden und dem aktuellen Durchschnitt vergleichen. Da die Messdaten maschinell lesbar sind, können sie auch in andere Anwedungen und bestehende SmartHome-Systemen eingebunden werden. Durch die Einführung eines Punktesystems in den Achievements könnten Nutzer*innen, durch einen kompetetiven Aspekt, noch mehr zu einem positiven Verhalten motiviert werden.