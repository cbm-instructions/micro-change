import serial
import time
import os
from pathlib import Path
from typing import Optional

debug = os.environ["DEBUG"] == "true"

print(f"DEBUG={debug}")

def print_d(val):
    """Prints val if environment variable DEBUG=true"""
    if debug:
        print(val)

# Values for serial stream
DEVICE      = '/dev/ttyACM0'  # Find a way to dynamically get the device (maybe user needs to give it manually by commandline)
SERIAL_PORT = 57600
TIMEOUT     = 4

# Values for data storage
STORE_FOLDER_NAME = ".data"
cwd               = os.getcwd()
storage_folder    = os.path.join(cwd, STORE_FOLDER_NAME)

# Values for weight calculation
NEW_RELEVANT_THRESHOLD          = 2.0  # Grams
RESET_RELEVANT_WEIGHT_THRESHOLD = 1.5  # Grams
RESET_RELEVANT_WEIGHT_TIME      = 5   # Seconds

last_relevant_weight = 0.0


class ResetTimeTracker:
    def __init__(self):
        self.reset_start_time = -1

    def reset(self):
        """Resets the start time"""
        self.reset_start_time = -1

    def is_timeout(self) -> bool:
        """
        Returns whether the timeout is reached or not.
        Returns false if self.begin() was not called before self.is_timeout() was called.
        """
        if self.reset_start_time < 0:
            return False
        return (int(time.time()) - self.reset_start_time) > RESET_RELEVANT_WEIGHT_TIME

    def was_reset(self) -> bool:
        """Returns whether the start time was reset or not"""
        return self.reset_start_time < 0

    def begin(self):
        """Sets the starts time to current time"""
        self.reset_start_time = int(time.time())

def main():
    init_storage()
    load_last_relevant_weight()
    run_serial_stream_loop()


def init_storage():
    """Creates the storage folder if it does not exist"""
    if not os.path.exists(storage_folder):
        os.mkdir(storage_folder)


def load_last_relevant_weight():
    """
    Loads the last relevant weight data from storage.
    Values is saved in global variable 'last_relevant_weight'
    """
    latest_file_path = get_path_of_latest_file()
    if not latest_file_path == None:
        with open(latest_file_path, mode="r") as file:
            lines = file.readlines()
            if len(lines) > 0:
                global last_relevant_weight
                last_relevant_weight = float(lines[-1])
    
    print_d(f"Last relevant weight: {last_relevant_weight}")
    

def get_path_of_latest_file() -> Optional[Path]:
    """Gets the path of the latest produced file that contains weight information"""
    path = Path(storage_folder)
    latest_file = None
    for entry in path.iterdir():
        if entry.is_file():
            time_stamp_latest = int(entry.name)  # Filenames are time in seconds starting from unix epoch
            if latest_file == None:
                latest_file = entry
            elif int(entry.name) > time_stamp_latest:
                latest_file = entry
    
    print_d(f"Latest file: {latest_file}")
    return latest_file


def run_serial_stream_loop():
    """
    Reads the values from the arduino scale (declared device and port) in a loop.
    Aborts if the stream ends with an empty character or EOF.
    Crashes if the device gets disconnected.
    """
    reset_time_tracker = ResetTimeTracker()  # Used to determine if the variable 'last_relevant_weight' should be reset
    with serial.Serial(DEVICE, SERIAL_PORT, timeout=TIMEOUT) as ser:
        bytes = ser.readline()
        while bytes != '':  # '' means EOF in python
            # Get next value without whitespaces
            line = bytes.decode('utf-8').strip()
            weight = 0.0
            try:
                weight = float(line)
            except:
                pass
            print_d(weight)
            if is_new_relevant_weight(weight):
                save_and_set_new_relevant_weight(weight)
            elif should_reset_weight(weight, reset_time_tracker):
                reset_last_relevant_weight(reset_time_tracker)
            bytes = ser.readline()


def is_new_relevant_weight(weight: float) -> bool:
    """Return whether the given weight is higher than the last relevant"""
    return weight > (last_relevant_weight + NEW_RELEVANT_THRESHOLD)


def save_and_set_new_relevant_weight(weight: float):
    global last_relevant_weight
    last_relevant_weight = weight
    print_d(f"{time.time()}|{weight}")
    # TODO: Save new relevant weight to file


def should_reset_weight(current_weight: float, time_tracker: ResetTimeTracker) -> bool:
    """
    Returns whether the variable 'last_relevant_weight' should be reset or not.
    Also starts to track time if 'current_weight' is to low.
    """
    result = False
    # print_d(f"weight to small: {(current_weight < RESET_RELEVANT_WEIGHT_THRESHOLD)}; tt was reset: {time_tracker.was_reset()}")
    if (current_weight < RESET_RELEVANT_WEIGHT_THRESHOLD) and time_tracker.was_reset():
        time_tracker.begin()
    
    if time_tracker.is_timeout():
        print_d("resetting 'last_relevant_weight'")
        result = True
        time_tracker.reset()
    
    # print_d(f"start: {time_tracker.reset_start_time}; current: {int(time.time())}; delta: {int(time.time()) - time_tracker.reset_start_time}")
    # print_d(f"timeout: {time_tracker.is_timeout()}")
    
    return result


def reset_last_relevant_weight(time_tracker: ResetTimeTracker):
    """Resets the global variable 'last_relevant_weight' to RESET_RELEVANT_WEIGHT_THRESHOLD + 0.1."""
    global last_relevant_weight
    last_relevant_weight = 0.0


if __name__ == "__main__":
    main()
