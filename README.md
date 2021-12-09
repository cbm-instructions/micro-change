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
