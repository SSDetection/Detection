from flask import Flask, jsonify
from flask import request
import requests
import time
import urllib.request
import os
import selenium.common.exceptions
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.chrome.options import Options
import json
import wget
import tensorflow as tf
from PIL import Image
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
# executable_path="/Users/robertsonbrinker/Documents/GitHub/Detection/flask-server/chromedriver.exe"
# "C:\\Users\\Andrew\\Downloads\\chromedriver_win32\\chromedriver.exe"



def download_profile(profileName):
    driver.get("https://www.instagram.com/")

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
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable(
    (By.CSS_SELECTOR, "button[type='submit']"))).click()
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable(
    (By.XPATH, "//button[contains(text(), 'Not Now')]"))).click()

    # goes to instagram
    
    driver.get("https://www.instagram.com/" + profileName)
    posts = []
    # creates a directory named after the profile name
    if not os.path.isdir(profileName):
        os.mkdir(profileName)
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
    with open(profileName + "Posts" + '.txt', "w") as output:
        output.write(str(posts))

    image_count = 0
    dataList = []
    for post in posts:
        driver.get(post)
        time.sleep(4)
        profileData = {}
        if driver.find_element(By.CSS_SELECTOR, "img[style='object-fit: cover;']") is not None:
            download_url = driver.find_element(By.CSS_SELECTOR, "img[style='object-fit: cover;']").get_attribute('src')
            save_as = os.path.join(path, profileName + str(image_count) + '.jpg')
            wget.download(download_url, save_as)
            profileData["Image"] = download_url
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
    profileDict = {"Data": dataList}
    fileString = json.dumps(profileDict)
    jsonFile = open("data.json", "w")
    jsonFile.write(fileString)
    return profileDict

app = Flask(__name__)

# Mebers API Route
print("### Running ###")
# results = download_profile()
print("### Finished ###")
print("###", "###")


@app.route("/scrapperResults")
def scrapperResults():
    return jsonify({'results': results})

results = {"Path": "x/y/z", "Caption":"kill", "Date": "12/2/2022"}, {"Path": "x/3424y/z", "Caption":"ki43ll", "Date": "12/23/2022"}
@app.route("/requests", methods = ['GET','POST'])
def requests():
    data = request.get_json()
    print(type(data))
    print(data)
    newdata = download_profile(data['username'])
    print(newdata)
    
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
    return newdata

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


 #{1: { "path": "x/y/z", "caption":"kill", "date": "12/2/2022"}, 2:{ "path": "zz/y/z", "caption":"dog", "date": "2/34/2022"}, 3:{ "path": "zz/ysdf/z", "caption":"dosdfg", "date": "2/34/20222"}}

if __name__ == "__main__":
    app.run(debug=True)
