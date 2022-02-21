import time
import urllib.request
import os
import selenium.common.exceptions
from selenium.common.exceptions import NoSuchElementException
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.chrome.options import Options

#from selenium.webdriver.chrom.options import Options
chrome_options = Options()
chrome_options.add_argument("--headless")

#PATH = "./chromedriver"
PATH = "/Users/robertsonbrinker/Downloads/chromedriver"
#/Users/robertsonbrinker/Documents/GitHub/Detection/flask-server
print("####",os.path.exists(PATH),"####")
#os.chmod(PATH, 755)
driver = webdriver.Chrome(executable_path=PATH, options=chrome_options)
#executable_path="/Users/robertsonbrinker/Documents/GitHub/Detection/flask-server/chromedriver.exe"
#"C:\\Users\\Andrew\\Downloads\\chromedriver_win32\\chromedriver.exe"

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

def download_profile():
    profileName = "volter43"
    driver.get("https://www.instagram.com/" + profileName)
    posts = []
    links = driver.find_elements(By.TAG_NAME, "a")
    for link in links:
        post = link.get_attribute('href')
        if '/p/' in post:
            posts.append(post)
    previous_height = driver.execute_script("return document.body.scrollHeight")

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
    #with open(profileName + "Posts" + '.txt', "w") as output:
    #    output.write(str(posts))

    #source_links = {}
    source_links = []
    i=0
    
    for post in posts:
        driver.get(post)
        time.sleep(10)
        try:
            ele = driver.find_element(By.CSS_SELECTOR, "img[style='object-fit: cover;']")
        except NoSuchElementException:
           pass
        try:
            if ele is not None:
                download_url = driver.find_element(By.CSS_SELECTOR, "img[style='object-fit: cover;']").get_attribute('src')
                source_links.append(download_url)
                #source_links[i]=download_url
                i=i+1
        except NoSuchElementException:
                pass
            
            
    return source_links

from flask import Flask, jsonify
app = Flask(__name__)

# Mebers API Route
print("### Running ###")
results = download_profile()
print("### Finished ###")
print("###",results,"###")

@app.route("/scrapperResults")
def scrapperResults():
    return jsonify({'results': results})

@app.route("/members")
def members():
    return {"members": ["Member1","Member2","Member3"]}

if __name__ == "__main__":
    app.run(debug=True)