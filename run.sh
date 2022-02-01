# Start all parts of BEN 

frontend_folder="squashfs-root"
frontend_exec="bin-client"
backend_folder="scale-data-recorder"
backend_exec="recorder.py"

# Starts backend
start_scale_recorder () {
    cd $backend_folder
    pip3 install --editable .
    python3 $backend_exec
}

# Starts frontend
start_client () {
    ./$frontend_folder/$frontend_exec
}

start_client
start_scale_recorder