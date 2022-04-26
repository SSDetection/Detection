import React from "react";
import { getFirestore,  collection, getDocs, doc, setDoc, query, where  } from "firebase/firestore"
import { initializeApp } from "firebase/app";

async function clearBoxes() {
    await setDoc(doc(archiveRef), {
        quote: false,
        picture: false, 
        what: document.getElementById("Text1").value, 
        who: document.getElementById("Text2").value, 
        why: document.getElementById("Text3").value, 
        values: document.getElementById("Text4").value,
        header: "Possible Entries",
        text: document.getElementById("Text1").value,
    });
    
    document.getElementById("Text1").value = " ";
    document.getElementById("Text2").value = " ";
    document.getElementById("Text3").value = " ";
    document.getElementById("Text4").value = " ";
    document.getElementById("Text5").value = " ";
    document.getElementById("congrats").textContent = "Thank you for submitting!";
}

const config = {
    apiKey: "AIzaSyDTht3F49SARp0XE1SyjQiTLpX_7osbYh4",
    authDomain: "senior-capstone-8f433.firebaseapp.com",
    databaseURL: "https://senior-capstone-8f433-default-rtdb.firebaseio.com",
    projectId: "senior-capstone-8f433",
    storageBucket: "senior-capstone-8f433.appspot.com",
    messagingSenderId: "978452685993",
    appId: "1:978452685993:web:5c34b8d79f2af2210e75b8"
  }
const firebaseApp = initializeApp(config);
const db = getFirestore();
const archiveRef = collection(db, "archive")




function Submit() {
  return (
    <div className="white lightgreyback fulldisplay">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div>{/*class="col-lg-5"*/}
            <h1>Submit your own Design!</h1>
            <p>We will review your and add it to the archive!</p>
            <p>
            <strong>Suggested Solution: </strong>
            </p>
            <textarea id="Text1" cols="80" rows="5"></textarea>
            <p>
            <strong>Who is the User: </strong> </p>
            <textarea id="Text2" cols="80" rows="5"></textarea>
            <p>
            <strong>Why this Design: </strong> </p>
            <textarea id="Text3" cols="80" rows="5"></textarea>
            <p>
            <strong>Values and Opinions: </strong>  </p>
            <textarea id="Text4" cols="80" rows="5"></textarea>
            <p>
            <strong>Image URLs (include mutliple links for multiple pictures): </strong>  </p>
            <textarea id="Text5" cols="80" rows="1"></textarea>
            <p>
            <button className="white lightgreyback" onClick={() => {clearBoxes()}}>submit</button>
            <p id="congrats" className="green"></p>
            <br></br>
            </p>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Submit;