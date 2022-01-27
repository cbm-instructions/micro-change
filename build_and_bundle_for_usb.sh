# Bundle backend and frontend executables

ben_bundle="ben_bundle"
frontend_img="bin-client-0.1.0-armv7l.AppImage"
frontend_img_location="bin-client/dist/${frontend_img}"
backend_folder="scale-data-recorder"
run_sh="run.sh"
setup_sh="setup.sh"

# Build frontend AppImage
# cd bin-client
# yarn run electron:build
# cd ..

# Bundle for transfer per USB
mkdir $ben_bundle
cp $frontend_img_location $ben_bundle
cp -r $backend_folder $ben_bundle
cp $run_sh $ben_bundle
cp $setup_sh $ben_bundle