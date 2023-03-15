import sys
import subprocess

exit_message = """Invalid number of arguments
[Usage]
    start   all | 0-3         
    stop    all | 0-3"""

scripts = ["device_1.py", "device_2.py", "device_3.py"]
process = []

if (len(sys.argv) != 3):
    print(exit_message)
    quit()

if((sys.argv[1] != "start") and (sys.argv[1] != "stop")):
    print(sys.argv[1] + ": is not a command")
    quit()
    
if(sys.argv[1] == "start"):
    if (sys.argv[2] == "all"):
        for script in scripts:
            process.append(subprocess.call(["python", script]))


print("good")