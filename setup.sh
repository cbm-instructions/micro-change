# Setup of executable folder on raspberry pi

exec_folder="ben-exec"
app_img="bin-client-0.1.0-armv7l.AppImage"
scale_recorder_script_folder="scale-data-recorder"
scale_recorder_script="recorder.py"
extracted_folder="squashfs-root"

# mkdir ben-exec
# mv ./$app_img ./$exec_folder/
# mv ./$scale_recorder_script_folder ./$exec_folder
# cd $exec_folder
chmod a+x ./$app_img
./$app_img --appimage-extract
mkdir ./$extracted_folder/data ./$extracted_folder/scale-sample-data
