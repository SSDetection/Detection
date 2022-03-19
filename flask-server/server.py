import time
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.chrome.options import Options
import os
import wget
from PIL import Image
import firebase_admin
from firebase_admin import credentials, firestore
import pyrebase
from flask import request
from flask import Flask, jsonify
from flask import request
import time
import os
#from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.chrome.options import Options
import json
import wget

config = {
  "apiKey": "AIzaSyDTht3F49SARp0XE1SyjQiTLpX_7osbYh4",
  "authDomain": "senior-capstone-8f433.firebaseapp.com",
  "databaseURL": "https://senior-capstone-8f433-default-rtdb.firebaseio.com",
  "projectId": "senior-capstone-8f433",
  "storageBucket": "senior-capstone-8f433.appspot.com",
  "messagingSenderId": "978452685993",
  "appId": "1:978452685993:web:5c34b8d79f2af2210e75b8"
  }

firebase_storage = pyrebase.initialize_app(config)
storage = firebase_storage.storage()

cred = credentials.Certificate('./ServiceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()


chrome_options = Options()
#chrome_options.add_argument("--headless")

PATH = "./chromedriver"
#PATH = "flask-server/chromedriver"
#/Users/robertsonbrinker/Documents/GitHub/Detection/flask-server
print("####",os.path.exists(PATH),"####")
#os.chmod(PATH, 755)


imagePaths = []
profileName = "volter43"
def download_profile(profileName):
    imagePaths.clear()
    driver = webdriver.Chrome(executable_path=PATH, options=chrome_options)
    driver.get("https://www.instagram.com/")

    username = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='username']")))
    password = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='password']")))
    # enter login information
    username.clear()
    password.clear()
    username.send_keys("volter43")
    password.send_keys("11900807zD")
    # click log in and dismiss any notifications
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))).click()
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Not Now')]"))).click()

#USUAL STUFF

    print("GIVEN NAME = ", profileName)
    # goes to instagram
   
    driver.get("https://www.instagram.com/" + profileName)
    posts = []
    # creates a directory named after the profile name
    if not os.path.isdir(profileName):
        os.mkdir(profileName)
    else:
        for f in os.listdir(profileName):
            os.remove(os.path.join(profileName, f))
    path = os.getcwd()
    path = os.path.join(path, profileName)

    links = driver.find_elements(By.TAG_NAME, "a")
    for link in links:
        post = link.get_attribute('href')
        if '/p/' in post:
            posts.append(post)
    previous_height = driver.execute_script("return document.body.scrollHeight")

    # scrolls to the bottom of the page
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(10)
        current_height = driver.execute_script("return document.body.scrollHeight")
        links = driver.find_elements(By.TAG_NAME, "a")
        for link in links:
            post = link.get_attribute('href')
            if '/p/' in post:
                posts.append(post)
        if current_height == previous_height:
            break
        previous_height = current_height

    posts = list(set(posts))
    with open(profileName + "Posts" + '.txt', "w") as output:
        output.write(str(posts))

    image_count = 0
    profileDict = {}
    dataList = []
    i=-1
    for post in posts:
        i=i+1
        doc_ref = db.collection(profileName+'-posts').document(str(i))
        driver.get(post)
        time.sleep(10)
        profileData = {}
        if driver.find_element(By.CSS_SELECTOR, "img[style='object-fit: cover;']") is not None:
            download_url = driver.find_element(By.CSS_SELECTOR, "img[style='object-fit: cover;']").get_attribute('src')
            save_as = os.path.join(path, profileName + str(image_count) + '.jpg')
            wget.download(download_url, save_as)
            profileData["Image"] = download_url
            image_count = image_count + 1

        if driver.find_element(By.XPATH, "//time[@class='_1o9PC']") is not None:
            date = driver.find_element(By.XPATH, "//time[@class='_1o9PC']").text
            profileData["Date"] = date

        if driver.find_element(By.XPATH, ".//span[@class = '']") is not None:
            comment = driver.find_element(By.XPATH, "//div[@class='C4VMK']//span[@class='_7UhW9   xLCgt      MMzan   "
                                                    "KV-D4           se6yk       T0kll ']")
            caption = comment.text
            profileData["Caption"] = caption
        dataList.append(profileData)
        
        image = Image.open(save_as)

        storage.child(profileName+"/"+profileName + str(image_count) + '.jpg').put(save_as)#profileName + str(image_count) + '.jpg'
        imagePaths.append(profileName+"/"+profileName + str(image_count) + '.jpg')
        #image.show()
        doc_ref.set({
        'pic':download_url,
        'caption':caption
    })
    profileDict = {"Data": dataList}
    print(profileDict)
    return profileDict

#download_profile("volter43")

if os.path.isdir(profileName):
        for f in os.listdir(profileName):
                imagePaths.append(profileName+"/"+f)


from flask import Flask, jsonify
app = Flask(__name__)

@app.route("/imagePaths")
def scrapperResults():
    return jsonify({'imagePaths': imagePaths})

@app.route("/members")
def members():
    return {"members": ["Member1","Member2","Member3"]}

results = {"Path": "x/y/z", "Caption":"kill", "Date": "12/2/2022"}, {"Path": "x/3424y/z", "Caption":"ki43ll", "Date": "12/23/2022"}

@app.route("/requests", methods = ['GET','POST'])
def requests():
    imagePaths.clear()
    data = request.get_json()
    print(type(data))
    print(data)
    profileName = data['username']
    print("NEWDATA",profileName)

    print("### Running ###")
    if os.path.isdir(profileName):
        print("FOLDER IS HERE")
        for f in os.listdir(profileName):
                imagePaths.append(profileName+"/"+f)
    else:
        download_profile(profileName)
        #print("WOULD DOWNLOAD HERE")
    print("### Finished ###")
    
    # data = {"posts":[
    # {
    #     "path": ["/picture2"],
    #     "caption": ["neckit"],
    #     "date": ["2/3/4"]
    # },
    # {
    #     "path": ["/picture2"],
    #     "caption": ["neckittt"],
    #     "date": ["2/33/4"]
    # },
    # {
    #     "path": ["/picture2"],
    #     "caption": ["u r noob"],
    #     "date": ["23/3/4"]
    # }]}
    return profileName
    
@app.route("/posts", methods = ['GET'])
def posts():
    data = {"Data":[
    {
        "Image": ["/picture1"],
        "Caption": ["kys"],
        "Date": ["2/2/2"]
        }
    ]}
    return data

if __name__ == "__main__":
    app.run(debug=True)

#auth = firebase_storage.auth()
#email = "robertsonbrinker@gmail.com"
#password = "8cBxjODWXbSvn021"

#user = auth.sign_in_with_email_and_password(email, password)
#url = storage.child("/Users/robertsonbrinker/Documents/GitHub/Detection/flask-server/volter43/volter430.jpg").get_url(user['idToken'])