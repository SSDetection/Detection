from flask import Flask, jsonify
from flask import request
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
# from selenium.webdriver.chrom.options import Options


def download_profile():
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
    profileName = "volter43"
    driver.get("https://www.instagram.com/" + profileName)
    posts = []
    links = driver.find_elements(By.TAG_NAME, "a")
    for link in links:
        post = link.get_attribute('href')
        if '/p/' in post:
            posts.append(post)
    previous_height = driver.execute_script(
        "return document.body.scrollHeight")

    while True:
        driver.execute_script(
            "window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(10)
        current_height = driver.execute_script(
            "return document.body.scrollHeight")
        links = driver.find_elements(By.TAG_NAME, "a")
        for link in links:
            post = link.get_attribute('href')
            if '/p/' in post:
                posts.append(post)
        if current_height == previous_height:
            break
        previous_height = current_height

    posts = list(set(posts))
    # with open(profileName + "Posts" + '.txt', "w") as output:
    #    output.write(str(posts))

    # source_links = {}
    source_links = []
    i = 0

    for post in posts:
        driver.get(post)
        time.sleep(10)
        try:
            ele = driver.find_element(
                By.CSS_SELECTOR, "img[style='object-fit: cover;']")
        except NoSuchElementException:
            pass
        try:
            if ele is not None:
                download_url = driver.find_element(
                    By.CSS_SELECTOR, "img[style='object-fit: cover;']").get_attribute('src')
                source_links.append(download_url)
                # source_links[i]=download_url
                i = i+1
        except NoSuchElementException:
            pass

    return source_links

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
    data['username1'] = 'endrit'
    print(data)
    print(data.get("username"))
    data = {"posts":[
    {
        "path": ["/picture2"],
        "caption": ["neckit"],
        "date": ["2/3/4"]
    },
    {
        "path": ["/picture2"],
        "caption": ["neckittt"],
        "date": ["2/3/4"]
    }]}
    return data

@app.route("/posts", methods = ['GET'])
def posts():
    data = {"posts":[
    {
        "path": ["/picture1"],
        "caption": ["kys"],
        "date": ["2/2/2"]
        }
    ]}
    return data


 #{1: { "path": "x/y/z", "caption":"kill", "date": "12/2/2022"}, 2:{ "path": "zz/y/z", "caption":"dog", "date": "2/34/2022"}, 3:{ "path": "zz/ysdf/z", "caption":"dosdfg", "date": "2/34/20222"}}

if __name__ == "__main__":
    app.run(debug=True)