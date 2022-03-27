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
import './App.css';
import * as d3 from 'd3';
import { getFirestore,  collection, getDocs } from "firebase/firestore"
//import ScriptTag from 'react-script-tag/lib/ScriptTag';
//import ScriptTag from 'react-script-tag';
//import { Helmet } from "react-helmet";
//import {Requests} from "./Requests.js"
//import {Posts} from "./Posts.js"


function App() {
  //var captions = [];
  const [username, setUsername] = useState('username');
  const [dataE, setDataE] = useState();
  const [post, setPost] = useState();
  const [update, setUpdate] = useState(false);

  let textInput = React.createRef();

  function callBoth(){
    setUsername(textInput.current.value);
    //setUpdate((prevState)=> !prevState);
    fetchFromRequests();
    getImages();
    //captions = getCollection(textInput.current.value);
  }

  function fetchFromRequests(){
    console.log("this shit running")
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({username})
      };
      fetch('/requests', requestOptions)
          .then(response => response.json())
          .then(data => setData(data))
          console.log(data)
  }
  
  useEffect(()=> {
    console.log("Page Rendered")
    let didCancel = false;

    /*async function fetchUser() {
      if (!didCancel) {
        let response = await fetch('/posts')
        let userPosts = await response.json()
        setData(userPosts)
        console.log(data)
      }
    }
  fetchUser();
    
    return () => {
      didCancel = true;
    }*/
  }, []);

  /*useEffect(() => {
    // POST request using fetch inside useEffect React hook
    if (username !== "username"){
      console.log("this shit running")
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({username})
      };
      fetch('/requests', requestOptions)
          .then(response => response.json())
          .then(data => setData(data))
          console.log(data)
          // renderData(data);
    }
// this username means everytime it changes this useeffect gets run
}, [username]);*/

  //SERVER STUFF
  const [servData, setData] = useState([{}])
  const [servCapData, setCapData] = useState([{}])

  useEffect(() => {
    fetch("/imagePaths").then(
      res => res.json()
    ).then(
      servData => {
        setData(servData)
        console.log(servData)
      }
    )
  }, [username]);

  useEffect(() => {
    fetch("/captions").then(
      res => res.json()
    ).then(
      servData => {
        setCapData(servData)
        console.log(servData)
      }
    )
  }, [username]);

  const captions = Object.values(servCapData)[0];
  var captionsArr = Object.values(captions);

  console.log("servData", servData.imagePaths)
  var pic = "https://instagram.fdet3-1.fna.fbcdn.net/v/t51.2885-15/e35/37857780_671801903168144_2183731892077985792_n.jpg?_nc_ht=instagram.fdet3-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=OA9SgZiiqUMAX-xgCOH&tn=XWaIxGnaRJOZZYYQ&edm=AABBvjUBAAAA&ccb=7-4&ig_cache_key=MTgzMDE3NDY5MDc4NDUxMjg4NA%3D%3D.2-ccb7-4&oh=00_AT9N_A82hAjIhvnG8bVKnVIag3dbYpJ2UJ_By1rmevR_WA&oe=621AE7F7&_nc_sid=83d603"

  // Set the configuration for your app
  // TODO: Replace with your app's config object
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

  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage(firebaseApp);
  const db = getFirestore();
  //Create a reference with an initial file path and name

  const imagePaths = Object.values(servData)[0];
  var imagePathsArr = Object.values(imagePaths);

  var first = imagePathsArr[0]
  if(typeof first!='undefined'){
    document.getElementById("usernameHeader").innerHTML = "@"+first.split("/")[0];
    document.getElementById("inputBox").value = first.split("/")[0];
  }
  
  
  
  function getImages(){
    const promises = [];

    imagePathsArr.forEach(imagePath => {
      const promise = getDownloadURL(ref(storage, imagePath))
        .catch(err => {
          console.log('error', err);
          return "";
        })
        .then(fileUrl => {
          return fileUrl;
        });
      promises.push(promise);
    });

    Promise.all(promises)
      .catch(err => {
        console.log('error', err);
      })
      .then(urls => {
        for (var i = 0; i <= urls.length - 1; i++) {
          if (urls[i] != '') {
            document.getElementById('photo' + (i + 1)).src = urls[i];
          }
        }
      });
  }

  const promises = [];

  imagePathsArr.forEach(imagePath => {
    const promise = getDownloadURL(ref(storage, imagePath))
      .catch(err => {
        console.log('error', err);
        return "";
      })
      .then(fileUrl => {
        return fileUrl;
      });
    promises.push(promise);
  });

  Promise.all(promises)
    .catch(err => {
      console.log('error', err);
    })
    .then(urls => {
      for (var i = 0; i <= urls.length - 1; i++) {
        if (urls[i] != '') {
          document.getElementById('photo' + (i + 1)).src = urls[i];
        }
      }
    });
 
//Create Nested Image Path
var nestedPaths = [];
var nest = [];
var imageIndex = 0;

for (var i = 0; i <= (imagePathsArr.length - 1)/4; i++) {
  if(imagePathsArr[((4*i))]){
    nest[((4*i))]=imagePathsArr[((4*i))];
  }
  if(imagePathsArr[((4*i)+1)]){
    nest[((4*i)+1)]=imagePathsArr[((4*i)+1)];
  }
  if(imagePathsArr[((4*i)+2)]){
    nest[((4*i)+2)]=imagePathsArr[((4*i)+2)];
  }
  if(imagePathsArr[((4*i)+3)]){
    nest[((4*i)+3)]=imagePathsArr[((4*i)+3)];
  }
  nestedPaths[i]=nest;
  nest=[];
}

function tryResetFolderInStorage(inputName){
  var allGone = false;
  var i=0
  while(!allGone){
    console.log("DELETE")
    // Create a reference to the file to delete
    const profileRef = ref(storage, inputName+'/'+inputName+i+'.jpg');
    console.log(profileRef);
    // Delete the file
    deleteObject(profileRef).then(() => {
      // File deleted successfully
    }).catch((error) => {
      allGone = true;
      // Uh-oh, an error occurred!
    });
    i=i+1
    if(i>10){
      allGone=true;
    }
  }
}

/*async function getCollection(inputName){
  var captions = [];
  const querySnapshot = await getDocs(collection(db, inputName+"-posts"));
  console.log(querySnapshot);
  querySnapshot.forEach((doc) => {
    captions[doc.id]=doc.data().caption;
    // doc.data() is never undefined for query doc snapshots
  });
  return captions
}
captions = getCollection(username);
*/

//if caption contains these words then set the color (green or red)
const nonowords = ["Die", "kill", "death", "bomb", "life", "live", "gun", "weapon", "murder", "slay", 
"execute", "hit", "massacre", "slaughter", "wipe out", "annihilate", "erase", "eradicate", "exterminate", 
"finish", "obliterate", "neutralize", "sacrifice", "suffer", "waste", "shoot", "shoot up", "school", "class", 
"injure", "hurt", "harm", "damage", "suicide", "save", "saved", "revenge", "taking out", "no remorse", "emotions", 
"violence", "violent", "attack", "died", "hell", "bullet", "weapons", "bullets", "shoot", "shot", "shooting", 
"officer", "police", "last", "shooter", "don’t come to school", "stay home", "blood", "bleed", "bleeding", 
"bled", "trouble", "danger", "warning", "warn", "no remorse", "dead"];

var captionColorArr = ["green","green","green","green","green","green","green","green","green","green","green","green"];
var captionColorIndex = 0;
var threateningSpeechCount = 0;
var interestColor = "lightlightgrey";
var interestText = "NULL";
var redPresent = false;
var captionsArrChecked = false;
captionsArr.forEach(caption => {
  captionColorArr[captionColorIndex] = ["green","clear"];
  nonowords.forEach(nonoword => {
    if(caption.includes(nonoword)){
      captionColorArr[captionColorIndex]=["red","language"];
      interestText = "SOME";
      interestColor = "red";
      threateningSpeechCount++;
      redPresent=true;
    }
  });
  captionsArrChecked = true;
  captionColorIndex = captionColorIndex+1;
});

if(!redPresent && captionsArrChecked ){
  interestText="NONE";
  interestColor="green";
}

console.log("captionColorArr",captionColorArr)

  //BAR GRAPH

  data = [
    { name: '@kpoterek', score: 0 },
    { name: '@andrewmiller', score: 75 },
    { name: '@ezenuni', score: 50 },
    { name: '@jjchan', score: 25 },
    { name: '@rbrinker', score: 10 },
    { name: '@profz', score: 75 },
    { name: '@stafford', score: 9 },
  ];

  var width = 200;
  var height = 200;
  var margin = { top: 20, bottom: 20, left: 1, right: 1 };

  var svg = d3.select('#d3-container')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);

  const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)

  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top])

  svg
    .append("g")
    .attr("fill", 'red')
    .selectAll("rect")
    .data(data.sort((a, b) => d3.descending(a.score, b.score)))
    .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d.score))
    .attr('title', (d) => d.score)
    .attr("class", "rect")
    .attr("height", d => y(0) - y(d.score))
    .attr("width", x.bandwidth());

  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .attr("font-size", '6px')
  }

  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].name))
      .attr("font-size", '6px')
  }

  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();/**/


  //PIE CHART

  // Step 3
  var svg = d3.select("svg");
  var width = 200;
  var height = 200;
  var radius = 100;

  // Step 1        
  var data = [{ name: "Gun", share: 75 },
  { name: "No Gun", share: 25 }];

  var g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // Step 4
  var ordScale = d3.scaleOrdinal()
    .domain(data)
    .range(['blue', 'yellow', 'green', 'red', 'pink']);

  // Step 5
  var pie = d3.pie().value(function (d) {
    return d.share;
  });

  var arc = g.selectAll("arc")
    .data(pie(data))
    .enter();

  // Step 6
  var path = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);

  arc.append("path")
    .attr("d", path)
    .attr("fill", function (d) { return ordScale(d.data.name); });

  // Step 7
  var label = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);

  arc.append("text")
    .attr("transform", function (d) {
      return "translate(" + label.centroid(d) + ")";
    })
    .text(function (d) { return d.data.name; })

  useEffect(() => {
    /*
      This is going to run once when the App is first rendered.
      All of our D3 code, which will edit the elements on our DOM, will be put here.
      
      If you wanted to run this code in response to a certain action, such as a buttonPress event,
      you can put in the appropriate function.
    */
  }, [])

  // State
  const [todos, setTodos] = useState([]);

  // Binding
  const todoText = useRef();

  // Side Effects / Lifecycle
  useEffect(() => {
    const existingTodos = localStorage.getItem('todos');
    setTodos(existingTodos ? JSON.parse(existingTodos) : []);
  }, []);

  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    if (username !== "@username"){
      console.log("this shit running")
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({username})
      };
      fetch('/requests', requestOptions)
          .then(response => response.json())
          .then(data => setData(data))
          console.log(data)
          // renderData(data);
    }
// this username means everytime it changes this useeffect gets run
}, [username]);
  
  function callBoth(){
    setUsername(textInput.current.value)
    setUpdate((prevState)=> !prevState);
  }

  var thumbwidth = 500

  return (

    <div >
{
      <div className="App">
      {data && (
        // data.map(renderData(data))
          // <>
          // <h1>{data.posts[0].caption[0]}</h1>
          // <p>{username}</p>
          // </>

          

          <>
          
          <div>
          
           
            { 
              //{data.Data.map (post => <div>   
              //<h2>{post.Caption}</h2>
              //<p>{post.Date}</p>
              //</div>)}
            }
          </div>
          </>

        )
        }
        
      </div> 
}
      <header className="App-header ">

        <div className="App">
          
          <input ref={textInput} type='text' placeholder={username} id="inputBox"></input>
          <button className="white lightgreyback" onClick={() => {
            callBoth()
          }}>
            Download
          </button>
          <button className="white lightgreyback" onClick={() => {
            tryResetFolderInStorage(textInput.current.value)
          }}>
            DELETE
          </button>

          <form className="App" action="/action_page.php" class="sidebyside right" align="right">
          <label for="cars">sort posts by </label>
          <select name="cars" id="cars" className="white lightgreyback">
            <optgroup label="Sorting Options" className="white lightgreyback">
              <option value="Latest Posts">Latest Posts</option>
              <option value="Score">Score</option>
            </optgroup>
          </select>
          
          <input type="submit" value="Sort"></input>
        </form>


        </div>

        

      </header>

      <div class="sidebyside body">
        {/* Side Bar */}
        <div class="sidebar">
          <h1 id="usernameHeader">@{username}</h1>
          <h1 class={interestColor}>
            Interest Level: {interestText}
          </h1>
          <div class="sidebyside font10">
          <img src = "/../flask-server/volter43/volter431.jpg"></img>
            <ul>
              <li>knives</li>
              <li>guns</li>
              <li>threatening speech</li>
            </ul>
            <ul>
              <li>1 potential</li>
              <li>2 potential</li>
              <li>{threateningSpeechCount} potential</li>
            </ul>
          </div>


          <h6>Percentage of Gun Posts for @{username}</h6>
          <svg width={width} height={height}></svg>


          <div id="d3-container" class="midgreyback">
          <h6># of Posts Over Time</h6>

          </div>
        </div>
        {/* Main */}

        

        <div class="display darkgreyback">


            {(typeof nestedPaths === 'undefined') ? (
                    <p>Loading...</p>
                  ) : (
                    nestedPaths.map((imagePath, j) => (
                      <div class="sidebyside">

                        {(typeof nestedPaths[j] === 'undefined') ? (
                            <p>Loading...</p>
                          ) : (
                            nestedPaths[j].map((imagePaths, i) => (

                              <div class="result centercontent">
                                <p class="analysis"><span class={captionColorArr[i][0]}>{captionColorArr[i][1]}</span></p>
                                <img id={'photo' + (i + 1)} class="center" />
                                <p class="comment">{captionsArr[i]}</p>
                              </div>
                            ))
                          )}

                      </div>

                    ))
                  )}



        {/*<div>
        {(typeof servData.imagePaths === 'undefined') ? (
          <p>Loading...</p>
        ) : (
          servData.imagePaths.map((imagePaths, i) => (
            <div class="result centercontent midgreyback">
              <p class="analysis"><span class={captionColorArr[i]}>CLEAR</span></p>
              <img id={'photo' + (i + 1)} class="center" />
              <p class="comment">{captionsArr[i]}</p>
            </div>
          ))
        )}
      </div>*/}




            

          
        </div>
      </div>

      


      

      

    </div>
  );
}

export default App;