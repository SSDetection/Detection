import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import './App.css';
import { getStorage, ref, getDownloadURL, deleteObject} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { wait } from '@testing-library/user-event/dist/utils';
import 'firebase/storage';  
import logo from './logo.svg';
import { useEffect, useRef, useState } from 'react';
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Container } from "semantic-ui-react";
import { Carousel } from 'react-responsive-carousel';
import * as d3 from 'd3';
import { getFirestore,  collection, getDocs, doc, setDoc, query, where  } from "firebase/firestore"


//var nestDict = {};



async function executeQuery(q) {
    var dexDict = {};
    console.log("query execution running")
    const querySnapshot = await getDocs(q);
    console.log("results obtained", querySnapshot)
    var i = 0;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      var docArr = [];

      if(typeof dexDict[doc.data().header] === "undefined"){
        dexDict[doc.data().header] = i;
        i++;
      }

      if(typeof docArr[i] === "undefined"){
        docArr[i] = [doc.id];
      }
      else{
        docArr[i].push(doc.id);
      }


      /*if(typeof nestDict[doc.data().question] === "undefined"){
        nestDict[doc.data().question] = [doc.id];
      }
      else{
        nestDict[doc.data().question].push(doc.id);
      }*/


    });
}

function Archive() {
    let textInput = React.createRef();
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

    /*
    await setDoc(doc(archiveRef, "1"), {
        session: 1,
        position: "parent", 
        sex: "male", 
        age: 59,
        quotes: {privacy:["privacy is good"]},
        artifact: "link_to_url_of_pic_here" });
    await setDoc(doc(archiveRef, "2"), {
        session: 1,
        position: "parent", 
        sex: "female", 
        age: 59,
        quotes: {privacy:["privacy is good"]},
        artifact: "link_to_url_of_pic_here" });
    await setDoc(doc(archiveRef, "3"), {
        session: 2,
        position: "police", 
        sex: "male", 
        age: 59,
        quotes: {privacy:["privacy is good"]},
        artifact: "link_to_url_of_pic_here" });
    await setDoc(doc(archiveRef, "4"), {
        session: 3,
        position: "administrator", 
        sex: "male", 
        age: 59,
        quotes: {privacy:["privacy is good"]},
        artifact: "link_to_url_of_pic_here" });
    await setDoc(doc(archiveRef, "5"), {
        session: 1,
        position: "parent", 
        sex: "male", 
        age: 59,
        quotes: {privacy:["privacy is good"]},
        artifact: "link_to_url_of_pic_here" });
    */





    const [q, setQ] = useState(query(archiveRef, where("quote","in",[true, false])));
    console.log("query crafted", q);

    const [quotesChecked, setQuotesChecked] = useState(true);
    const [picturesChecked, setPicturesChecked] = useState(true);
    const [studentsChecked, setStudentsChecked] = useState(true);
    const [parentsChecked, setParentsChecked] = useState(true);
    const [administrationChecked, setAdministrationChecked] = useState(true);
    const [counselorsChecked, setCounselorsChecked] = useState(true);
    const [policeChecked, setPoliceChecked] = useState(true);
    const [technologistsChecked, setTechnologistsChecked] = useState(true);

    const [fax, setFax] = useState([]);
    const [unfilteredFax, setUnfilteredFax] = useState([]);

    useEffect(() => {//this needs to be called every time the button is pushed
      const getFax = async () => {
        console.log("q being about to be queried", q)
        const data = await getDocs(q);
        setFax(data.docs.map((doc)=>({ ...doc.data(), id: doc.id })));
        setUnfilteredFax(data.docs.map((doc)=>({ ...doc.data(), id: doc.id })));
      }
      getFax();
      console.log("fax set from data", fax);
    }, [q]);

    //filter fax in accoradnce with search
    function filterFax(termsString){
      var filteredFax = [];
      var terms = termsString.trim().replace(",","").replace(".","").replace("?","").toLowerCase().split(" ");
      console.log("fax before being filtered",fax)
      terms.forEach(term => {
        unfilteredFax.forEach(doc => {
          if ((doc.header.toLowerCase().includes(term.toLowerCase()) || 
          doc.text.toLowerCase().includes(term.toLowerCase())) && 
          (!filteredFax.includes(doc))){
            filteredFax.push(doc);
          }
        });
      }); 

      //sort the filteredFax according to the jacard's coeff of the quote?  question?  (whichever one is greater)
      //for each fax in filteredFax calculate the score
      var jaccDict = {};
      filteredFax.forEach(f => {
        //obtain jaccard's for id and question
        var qos = calculateScore(terms, f.text.trim().replace(",","").replace(".","").replace("?","").toLowerCase().split(" "));
        var qss = calculateScore(terms, f.header.trim().replace(",","").replace(".","").replace("?","").toLowerCase().split(" "));
        jaccDict[f.id]=qss+qos;


      });
      //then sort filteredFax by the score 
      filteredFax.sort(function(a, b){  
        return jaccDict[b.id] - jaccDict[a.id];
      });

      setFax(filteredFax);
      console.log("fax filtered", filteredFax)
    }

    function calculateScore(a, b){
      var union = [...new Set([...a, ...b])];
      console.log("union is", union)
      const intersection = a.filter(value => b.includes(value));
      console.log("intersection is", intersection)
      var coeff = (intersection.length)/(union.length)
      return coeff
    }

    //form the nest
    const [nest, setNest] = useState({});
    const [picDict, setPicDict] = useState({});
    const [designDict, setDesignDict] = useState({});

    useEffect(()=>{
      var docDict = {};
      var tempPicDict = {};
      console.log(fax, "fax changed")
      fax.forEach((doc) => {

        if(doc.picture){
          tempPicDict[doc.text] = doc.url;
          setPicDict(tempPicDict);
        }

        if(typeof docDict[doc.header] === "undefined"){
          docDict[doc.header] = [doc.text];
        }
        else{
          docDict[doc.header].push(doc.text);
        }

      });

      setNest(docDict);
      console.log("nest set")

    },[fax]);

    const updateQuery = (e) => {
      var includedRoles = [];
      const id = e.target.id;
      const checked = e.target.checked;
      var tempquote = quotesChecked;
      var temppicture = picturesChecked;
      var tempstudent = studentsChecked;
      var tempparent = parentsChecked;
      var tempadministration = administrationChecked;
      var tempcounselors = counselorsChecked;
      var temppolice = policeChecked;
      var temptechnologists = technologistsChecked;
      switch(id) {//update the states
        case "quotesCB":
          setQuotesChecked(checked);
          tempquote = checked;
          break;
        case "picturesCB":
          setPicturesChecked(checked);
          temppicture = checked;
          break;
        case "studentsCB":
          setStudentsChecked(checked);
          tempstudent = checked;
          break;
        case "parentsCB":
          setParentsChecked(checked);
          tempparent = checked;
          break;
        case "administrationCB":
          setAdministrationChecked(checked);
          tempadministration = checked;
          break;
        case "counselorsCB":
          setCounselorsChecked(checked);
          tempcounselors = checked;
          break;
        case "policeCB":
          setPoliceChecked(checked);
          temppolice = checked;
          break;
        case "technologistsCB":
          setTechnologistsChecked(checked);
          temptechnologists = checked;
          break;
        default:
          setQ(query(archiveRef, where("quote","in",[true, false])));
      }
      //construct the includedRoles array based off of the states

      if(tempstudent){
        includedRoles.push("student");
      }
      if(tempparent){
        includedRoles.push("parent");
      }
      if(tempadministration){
        includedRoles.push("administration");
      }
      if(tempcounselors){
        includedRoles.push("counselor");
      }
      if(temppolice){
        includedRoles.push("police");
      }
      if(temptechnologists){
        includedRoles.push("technologist");
      }
      console.log("ROLES", includedRoles)

      //accounting for how compound queries are logical AND
      if (tempquote && temppicture){
        setQ(query(archiveRef,where("role","in",includedRoles)));
      }
      if (tempquote && !temppicture){
        setQ(query(archiveRef,where("quote","==",true), 
                            where("role","in",includedRoles)));
      }
      if (!tempquote && temppicture){
        setQ(query(archiveRef,where("picture","==",true), 
                            where("role","in",includedRoles)));
      }
      if (!tempquote && !temppicture){
        setQ(query(archiveRef,where("quote","==",false), 
                            where("picture","==",false), 
                            where("role","in",includedRoles)));
      }

    };




  return (

    <div className = "all">

          <header className="App-header ">

            <div className="App smallpadding">
              <input className="marginright" type='text' placeholder="ex. privacy gun school" id="inputBox" ref={textInput}></input>
              <button className="white lightgreyback" onClick={() => {filterFax(textInput.current.value)}}>
                search
              </button>





            </div>

          </header>

          <div className="sidebyside body">

            {/* Side Bar */}
            <div className="sidebar">

                <h3>Media</h3>
                <input className="marginright" type="checkbox" id="quotesCB" defaultChecked="true" onClick={(e) => {updateQuery(e);}}></input>
                <label for="quotesCB"> Quotes</label>

                <br></br>
                <input className="marginright" type="checkbox" id="picturesCB" onClick={(e) => {updateQuery(e);}} defaultChecked="true"></input>
                <label for="picturesCB"> Pictures</label>

                <br></br>
                <br></br>

                <h3>Roles</h3>
                <input className="marginright" type="checkbox" id="studentsCB" onClick={(e) => {updateQuery(e);}} defaultChecked="true"></input>
                <label for="studentsCB"> Students</label>

                <br></br>
                <input className="marginright" type="checkbox" id="parentsCB" onClick={(e) => {updateQuery(e);}} defaultChecked="true"></input>
                <label for="parentsCB"> Parents</label>

                <br></br>
                <input className="marginright" type="checkbox" id="administrationCB" onClick={(e) => {updateQuery(e);}} defaultChecked="true"></input>
                <label for="administrationCB"> Administration</label>

                <br></br>
                <input className="marginright" type="checkbox" id="conselorsCB" onClick={(e) => {updateQuery(e);}} defaultChecked="true"></input>
                <label for="conselorsCB"> Counselors</label>

                <br></br>
                <input className="marginright" type="checkbox" id="policeCB" onClick={(e) => {updateQuery(e);}} defaultChecked="true"></input>
                <label for="policeCB"> Police</label>

                <br></br>
                <input className="marginright" type="checkbox" id="technologistsCB" onClick={(e) => {updateQuery(e);}} defaultChecked="true"></input>
                <label for="technologistsCB"> Technologists</label>

                <br></br>
                <input className="marginright" type="checkbox" id="otherCB" name="otherCB" value="otherCB" defaultChecked="true"></input>
                <label for="otherCB"> Other</label>

                <br></br>
            </div>

            {/* Main */}
            <div className="display darkgreyback padding">

            {console.log("main renders")}
            {(typeof nest === 'undefined') ? (
              <p>Loading...</p>
              ) : (
              Object.keys(nest).map((header, j) => (
                <div className="rounded lightgreyback margin padding">
                  <h3 className="center">
                    <u><b>
                      {header}
                    </b></u>
                  </h3>


                  {(typeof nest[header] === 'undefined') ? (
                      <p>Loading...</p>
                    ) : (
                      nest[header].map((quote, i) => (
                        <div className="grid-container paddingleft">
                          <div className="grid-item paddingbottom">

                            {(typeof quote === 'undefined') ? (
                              <p>Loading...</p>
                            ) : (
                              quote.split("\\").map((section, i) => (
                                <div>
                                  <p className="marginright font"> 
                                    <strong>{section.split("]")[0].split("-")[0]}</strong> - {section.split("]")[0].split("-")[1]}
                                  </p>

                                  {(typeof section === 'undefined') ? (
                                    <p>Loading...</p>
                                  ) : (
                                    section.split("]").slice(1).map((subsection, i) => (
                                      <li>
                                        <strong>{subsection.split("-")[0]}</strong> - {subsection.split("-")[1]}
                                      </li>
                                     ))
                                  )}
                                 <br></br>
                                 <br></br>
                                </div>
                              ))
                            )}
                          </div>
                          <div>
                          {(typeof picDict[quote] === 'undefined') ? (
                            <p>Loading...</p>
                          ) : (
                            picDict[quote].map((url, i) => (
                              <img src={url} className="grid-item paddingbottom" width="100%"></img>
                            ))
                          )}
                          </div>

                        </div>


                      ))
                    )}

                    <br></br>

                </div>
              ))
              )}
        </div>
      </div>

          </div>

  );
}

export default Archive;

/*BASIC LOOP FORMAT
{(typeof array === 'undefined') ? (
  <p>Loading...</p>
) : (
  array.map((item, i) => (
    
    item.whatever
  ))
)}
*/