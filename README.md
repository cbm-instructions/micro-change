# Anleitung
1. Einleitung  -> Jan
2. Material und Werkzeug  -> Merve
3. Anleitung für Kasten  -> Aldin
4. Anleitung für Waage  -> Jan
   - Schaltplan (Fritzing, AutoCAD)
5. Anleitung für Installation  -> Fabi

# MicroChangeProjectBen
A smart bin that helps you by reducing your garbage production

Building Steps:
- Flash latest stable version of Raspbian (Raspberry OS) onto SD Card and insert into Raspberry Pi
- `sudo apt update && sudo apt upgrade` in Terminal
- Change /boot/config.txt according to https://www.waveshare.com/wiki/7inch_DSI_LCD

Comment out this:
```
#camera_auto_detect=1
#dtoverlay=vc4-kms-v3d
```

Insert this under [all]:
```
dtoverlay=vc4-fkms-v3d
start_x=1
```

- Shutdown Raspberry Pi
- Connect DSI Display and boot up
- The DSI Display should work now
- <Insert Arduino Part here>
- Connect Arduino with Raspberry Pi
- `sudo apt install arduino` on Raspberry Pi
- Load Arduino Project onto Arduino

### AppImage installation

- ...
<!-- - Install libfuse2 -->
- build AppImage with `yarn run electron:build`
- move AppImage to raspy
- create folder `ben-exec`
- move appimage inside ben-exec folder
- run `chmod a+x <appimage file>` to make it executable
- run AppImage with option `--appimage-extract` and extract the AppImage
- rename extraction folder to `bin-client`
- create folders `data` and `scale-sample-data` inside `bin-client`
- move folder `scale-data-recorder` inside `ben-exec`