
from importlib.resources import path

from flask import Flask, jsonify
from flask import request
import time

from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.chrome.options import Options
import os

from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import firebase_admin
from firebase_admin import storage as admin_storage, credentials, firestore
import pyrebase
from pyrebase.pyrebase import storage  
from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.chrome.options import Options

import wget
import tensorflow as tf

from PIL import Image #pip install pillow
import numpy as np # linear algebra
from skimage import transform

new_model = tf.keras.models.load_model('gun_model.h5')

def load(filename):
   np_image = Image.open(filename)
   np_image = np.array(np_image).astype('float32')/255
   np_image = transform.resize(np_image, (224, 224, 1))
   np_image = np.expand_dims(np_image, axis=0)
   return np_image


# from selenium.webdriver.chrom.options import Options
options = Options()
options.add_argument("--headless")

# PATH = "./chromedriver"
PATH = "./chromedriver"
# /Users/robertsonbrinker/Documents/GitHub/Detection/flask-server
print("####", os.path.exists(PATH), "####")
# os.chmod(PATH, 755)
driver = webdriver.Chrome(service=Service(
ChromeDriverManager().install()), options=options)
# executable_path=".\\chromedriver.exe"
# driver = webdriver.Chrome(executable_path)


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

auth = firebase_storage.auth()


cred = credentials.Certificate('./ServiceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

user = auth.sign_in_with_email_and_password('endritzenuni112@gmail.com', 'SSDetection123!1234')


captions = []
imagePaths = []




def download_profile(profileName):
    driver.get("https://www.instagram.com/")
    driver.implicitly_wait(10)

    username = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='username']")))
    password = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='password']")))


    # enter login information
    username.clear()
    password.clear()
    username.send_keys("volter43")
    password.send_keys("11900807zD")
    # click log in and dismiss any notifications
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))).click()
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Not Now')]"))).click()

    #USUAL STUFF

    
    # goes to instagram
   
    driver.get("https://www.instagram.com/" + profileName)
    posts = []

    # creates a directory named after the profile name
    if not os.path.isdir(profileName):
        os.mkdir(profileName)
    else:
        for f in os.listdir(profileName):
            os.remove(os.path.join(profileName, f))
    
    

    links = driver.find_elements(By.TAG_NAME, "a")
    for link in links:
        post = link.get_attribute('href')
        if '/p/' in post:
            posts.append(post)
    previous_height = driver.execute_script("return document.body.scrollHeight")

    # scrolls to the bottom of the page
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(5)
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
    image_count = 0
    dataList = []
    i=-1
    for post in posts:
        i=i+1
        doc_ref = db.collection(profileName+'-posts').document(str(i))
        driver.get(post)
        time.sleep(4)
        profileData = {}
        if driver.find_element(By.CSS_SELECTOR, "img[style='object-fit: cover;']") is not None:
            download_url = driver.find_element(By.CSS_SELECTOR, "img[style='object-fit: cover;']").get_attribute('src')

            # imagepath = os.path.relpath(profileName+ '/' + profileName + str(image_count) + '.jpg')
            save_as = os.path.relpath(profileName+ '/' + profileName + str(image_count) + '.jpg')

            wget.download(download_url, save_as)
            firebaseimg = storage.child(profileName+"/"+profileName + str(image_count) + '.jpg')
            firebaseimg.put(save_as)
            firebaseimg = storage.child(profileName+"/"+profileName + str(image_count) + '.jpg')
            url = firebaseimg.get_url(user['idToken'])
            
            profileData["Image"] = url
            image_count = image_count + 1
            image = load(save_as)
            num = "{:.2f}".format((new_model.predict(image)[0][0]) * 100)
            profileData["Accuracy"] = num

        if driver.find_element(By.XPATH, "//time[@class='_1o9PC']") is not None:
            date = driver.find_element(By.XPATH, "//time[@class='_1o9PC']").text
            profileData["Date"] = date

        if driver.find_element(By.XPATH, ".//span[@class = '']") is not None:
            comment = driver.find_element(By.XPATH, "//div[@class='C4VMK']//span[@class='_7UhW9   xLCgt      MMzan   "
                                                    "KV-D4           se6yk       T0kll ']")
            caption = comment.text
            profileData["Caption"] = caption
        dataList.append(profileData)
    

        
        #image.show()

        # doc_ref.set({
        # 'pic':download_url,
        # 'caption':caption
        # })
        # captions.append(caption)
    

    profileDict = {"Data": dataList}

    # fileString = json.dumps(profileDict)
    # jsonFile = open("../public/data.json", "w")
    # jsonFile.write(fileString)
    return profileDict


app = Flask(__name__)
def testfunc():
    results = {'Data': [{'Image': 'zuni.115/zuni.1150.jpg', 'Accuracy': '49.86', 'Date': 'JANUARY 28', 'Caption': 'Planning on adding some attachments later #palmettostatearmory #guns #cz #9mm #ar #ar15 #czp07 #556nato #leapoldoptics #rifles #suppressor'}, {'Image': 'zuni.115\\zuni.1151.jpg', 'Accuracy': '43.35', 'Date': 'JANUARY 30', 'Caption': 'Finally Bought a Sig red dot for my AR from Glick-Twins. #palmettostatearmory #guns #cz #9mm #ar #ar15 #czp07 #556nato #leapoldoptics #rifles #suppressor #glicktwins'}, {'Image': 'zuni.115\\zuni.1152.jpg', 'Accuracy': '48.72', 'Date': 'JANUARY 28', 'Caption': 'Got a flashlight that my big bro gave me. Bout to attach this to my AR. #palmettostatearmory #guns #cz #9mm #ar #ar15 #czp07 #556nato #leapoldoptics #rifles #suppressor'}]}
    return results





@app.route("/requests", methods = ['GET','POST'])
def requests():
    data = request.get_json()
    print(type(data))
    print(data)
    profileName = data['username']
    
    print("### Running ###")
    newdata = download_profile(profileName)    
    print("### Finished ###")
    print(newdata)

    return newdata
    


if __name__ == "__main__":
    app.run(debug=True)

#auth = firebase_storage.auth()


#user = auth.sign_in_with_email_and_password(email, password)
#url = storage.child("/Users/robertsonbrinker/Documents/GitHub/Detection/flask-server/volter43/volter430.jpg").get_url(user['idToken'])
