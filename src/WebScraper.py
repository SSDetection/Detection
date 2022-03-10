import time

from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait

import os
import wget

driver = webdriver.Chrome(executable_path="C:\\Users\\Andrew\\Downloads\\chromedriver_win32\\chromedriver.exe")
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
    # goes to instagram
    profileName = "volter43"
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
    profileDict = {}
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
    print(profileDict)
    return profileDict


download_profile()
