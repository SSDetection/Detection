import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import './App.css';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
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
//import ScriptTag from 'react-script-tag/lib/ScriptTag';
//import ScriptTag from 'react-script-tag';
//import { Helmet } from "react-helmet";
//import {Requests} from "./Requests.js"
//import {Posts} from "./Posts.js"


function App() {

  const [username, setUsername] = useState('username');
  const [dataE, setDataE] = useState();
  const [post, setPost] = useState();
  const [update, setUpdate] = useState(false);

  let textInput = React.createRef();

  function callBoth(){
    setUsername(textInput.current.value)
    setUpdate((prevState)=> !prevState);
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


  useEffect(() => {
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
}, [username]);

  //SERVER STUFF
  const [servData, setData] = useState([{}])

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

  //Create a reference with an initial file path and name

  const imagePaths = Object.values(servData)[0];
  var imagePathsArr = Object.values(imagePaths);
 
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

console.log(nestedPaths);


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

  // Events
  function addTodo(event) {
    event.preventDefault();
    const next = [...todos, todoText.current.value];
    setTodos(next);
    localStorage.setItem('todos', JSON.stringify(next));
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
          <input ref={textInput} type='text' placeholder={username}></input>
          <button onClick={() => {
            callBoth()
          }}>
            Search
          </button>
        </div>

        <form action="/action_page.php" class="sidebyside right" align="right">
          <label for="cars">Sort Posts by</label>
          <select name="cars" id="cars">
            <optgroup label="Sorting Options">
              <option value="Latest Posts">Latest Posts</option>
              <option value="Score">Score</option>
            </optgroup>
          </select>
          <br></br>
          <input type="submit" value="Sort"></input>
        </form>

      </header>

      <div class="sidebyside body">
        {/* Side Bar */}
        <div class="sidebar">
          <h1>@{username}</h1>
          <h1 class="orange">
            Interest Level: Medium
          </h1>
          <div class="sidebyside font10 orange">
            <ul>
              <li>knives</li>
              <li>guns</li>
              <li>threatening speech</li>
            </ul>
            <ul>
              <li>1 potential</li>
              <li>2 potential</li>
              <li>5 potential</li>
            </ul>
          </div>


          <h6>Percentage of Gun Posts for @Shooterboy</h6>
          <svg width={width} height={height}></svg>


          <div id="d3-container" class="redback">
            <h6>Percentage of Posts with Guns</h6>

          </div>
        </div>
        {/* Main */}

        

        <div class="display">

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
                                <p class="analysis"><span class="green">clear, {i+1}</span></p>
                                <img id={'photo' + (i + 1)} class="center" />
                                <p class="comment">example</p>
                              </div>
                            ))
                          )}

                      </div>

                    ))
                  )}

            <p>break</p>

            {(typeof servData.imagePaths === 'undefined') ? (
                <p>Loading...</p>
              ) : (
                servData.imagePaths.map((imagePath, i) => (
                  <div class="sidebyside">
                    <div class="result centercontent">
                      <p class="analysis"><span class="green">clear, {((((i)*3) + i)+1)}</span></p>
                      <img id={'photo' + ((((i)*3) + i)+1)} class="center" />
                      <p class="comment">example</p>
                    </div>
                    <div class="result centercontent">
                      <p class="analysis"><span class="green">clear, {((((i)*3) + i)+2)}</span></p>
                      <img id={'photo' + ((((i)*3) + i)+2)} class="center" />
                      <p class="comment">example</p>
                    </div>
                    <div class="result centercontent">
                      <p class="analysis"><span class="green">clear, {((((i)*3) + i)+3)}</span></p>
                      <img id={'photo' + ((((i)*3) + i)+3)} class="center" />
                      <p class="comment">example</p>
                    </div>
                    <div class="result centercontent">
                      <p class="analysis"><span class="green">clear, {((((i)*3) + i)+4)}</span></p>
                      <img id={'photo' + ((((i)*3) + i)+4)} class="center" />
                      <p class="comment">example</p>
                    </div>
                  </div>
                ))
              )}
         


          <div class="sidebyside">
            {(typeof servData.imagePaths === 'undefined') ? (
                <p>Loading...</p>
              ) : (
                servData.imagePaths.map((imagePaths, i) => (

                  <div class="result centercontent">
                    <p class="analysis"><span class="green">clear, {i+1}</span></p>
                    <img id={'photo' + (i + 1)} class="center" />
                    <p class="comment">example</p>
                  </div>
                ))
              )}
          </div>

          <div class="sidebyside">
            <div class="result centercontent">
              <p class="analysis"><span class="green">clear</span></p>
              <img src="https://instagram.fdet3-1.fna.fbcdn.net/v/t51.2885-15/e35/65822034_350668148947846_4694153716710752181_n.jpg?_nc_ht=instagram.fdet3-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=3cqE4brA-0wAX9v7yJj&edm=AABBvjUBAAAA&ccb=7-4&ig_cache_key=MjA4NDY3MTM2NjIyMTc5ODIyNA%3D%3D.2-ccb7-4&oh=00_AT9eE7oCMDoXMbrqIjTeG2h-rI5kxykL9gC9asR_cVcQ_g&oe=621B1BCD&_nc_sid=83d603" class="center" width="400" height="400" />
              <p class="comment">All your base are belong to us</p>
            </div>

            <div class="result centercontent">
              <p class="analysis"><span class="red">language</span></p>
              <img src={pic} class="center" />
              <p class="comment">spoiler alert thanos <span class="red">dies</span></p>
            </div>

            <div class="result centercontent">
              <p class="analysis"><span class="red">gun</span></p>
              <img src="https://www.instagram.com/p/CBqFrrCHVM7/media/?size=t" class="center" alt="Broken !"></img>
              <p class="comment">at the range</p>
            </div>

            <div class="result centercontent">
              <p class="analysis"><span class="red">knife</span></p>
              <img src="https://instagram.fdet3-1.fna.fbcdn.net/v/t51.2885-15/36592903_475617912890786_5820267975613087744_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fdet3-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=SjiJtNrVxjYAX8oDdhv&edm=AABBvjUBAAAA&ccb=7-4&ig_cache_key=MTgyNDM5MzA3MTk4MTIxMTIwMQ%3D%3D.2-ccb7-4&oh=00_AT8znZwKcQAh0OboHHR2_KpbiQorjqC-nEzo66s_L2xVAw&oe=6230BF3B&_nc_sid=83d603" class="center" />
              <p class="comment">my new kunai</p>
            </div>
          </div>

          <div class="sidebyside">
            <div class="result centercontent">
              <p class="analysis"><span class="green">clear</span></p>
              <img src="/Users/robertsonbrinker/Documents/GitHub/Detection/flask-server/volter43/volter430.jpg" class="center" />
              <p class="comment">no u</p>
            </div>

            <div class="result centercontent">
              <p class="analysis"><span class="green">clear</span></p>
              <img src="flask-server/volter43/volter430.jpg" class="center" />
              <p class="comment">who else misses dan the train man</p>
            </div>

            <div class="result centercontent">
              <p class="analysis"><span class="red">language gun</span></p>
              <img src="https://firebasestorage.googleapis.com/v0/b/senior-capstone-8f433.appspot.com/o/Users%2Frobertsonbrinker%2FDocuments%2FGitHub%2FDetection%2Fflask-server%2Fvolter43%2Fvolter430.jpg?alt=media&token=ac551e73-6f73-4289-b064-24897afbc9bb" class="center" />
              <p class="comment">suns out guns out or I get <span class="red">hangry</span></p>
            </div>

            <div class="result centercontent">
              <p class="analysis"><span class="green">clear</span></p>
              <img src="yeet" class="center" />
              <p class="comment">nice pic huh</p>
            </div>
          </div>

          <div class="sidebyside">
            <div class="result centercontent">
              <p class="analysis"><span class="green">clear</span></p>
              <img id="myimg2" class="center" />
              <p class="comment">example</p>
            </div>

            <div class="result centercontent">
              <p class="analysis"><span class="red">language</span></p>
              <img id="0" class="center" />
              <p class="comment">another example <span class="red">dies</span></p>
            </div>

            <div class="result centercontent">
              <p class="analysis"><span class="red">language</span></p>
              <img src="https://picsum.photos/99/102/?random" class="center" />
              <p class="comment">happy <span class="red">dies</span> in the movies</p>
            </div>

            <div class="result centercontent">
              <p class="analysis"><span class="red">language</span></p>
              <img src="https://picsum.photos/99/99/?random" class="center" />
              <p class="comment">another excusse to say<span class="red">dies</span></p>
            </div>
          </div>
        </div>
      </div>

      <div>
        {(typeof servData.imagePaths === 'undefined') ? (
          <p>Loading...</p>
        ) : (
          servData.imagePaths.map((imagePaths, i) => (

            <div class="result centercontent">
              <p class="analysis"><span class="green">clear, {i}</span></p>
              <img id={'photo' + (i + 1)} class="center" />
              <p class="comment">example</p>
            </div>
          ))
        )}
      </div>


      <div class="carousel">
        <Carousel thumbWidth={thumbwidth}>
          <div>
            <img src="https://picsum.photos/800/401/?random" />
            <p className="legend">Pic 1</p>
          </div>
          <div>
            <img src="https://picsum.photos/800/402/?random" />
            <p className="legend">Pic 2</p>
          </div>
          <div>
            <img src="https://picsum.photos/800/400/?random" />
            <p className="legend">Pic 3</p>
          </div>
        </Carousel>
      </div>

      <div className="row">
        <div className="column">
          <img src="https://picsum.photos/300/100/?random" />
          <img src="https://picsum.photos/300/200/?random" />
          <img src="https://picsum.photos/300/300/?random" />
          <img src="https://picsum.photos/300/400/?random" />
          <img src="https://picsum.photos/300/301/?random" />
          <img src="https://picsum.photos/300/201/?random" />
          <img src="https://picsum.photos/300/101/?random" />
        </div>
        <div className="column">
          <img src="https://picsum.photos/300/104/?random" />
          <img src="https://picsum.photos/300/204/?random" />
          <img src="https://picsum.photos/300/304/?random" />
          <img src="https://picsum.photos/300/402/?random" />
          <img src="https://picsum.photos/300/302/?random" />
          <img src="https://picsum.photos/300/202/?random" />
          <img src="https://picsum.photos/300/102/?random" />
        </div>
      </div>

      <ul>
        {todos.map(todo => (<li >{todo}</li>))}
      </ul>

      <div class="summary">
        <div>
          <h1 class="green">Interest Level : Low</h1>
          <p>A low interest level indicates a lack of the presence of these things on a user's instagram profile:</p>
          <div class="sidebyside">
            <ul>
              <li>knives</li>
              <li>guns</li>
              <li>threatening speech</li>
            </ul>
            <ul>
              <li>0 potential appearence(s)</li>
              <li>0 potential appearence(s)</li>
              <li>1 potential appearence(s)</li>
            </ul>
          </div>
        </div>
        <div>
          <img src="https://picsum.photos/300/299/?random" />
          <p># of posts vs time</p>
        </div>

      </div>

      <div class="summary">
        <div>
          <img src="https://picsum.photos/300/301/?random" />
        </div>
        <div>
          <h1>@username</h1>
          <p>this is where the user bio is displayed where <span class="red">aggresive</span> words are colored</p>
          <div class="sidebyside">
            <ul>
              <li>knives</li>
              <li>guns</li>
              <li>threatening speech</li>
            </ul>
            <ul>
              <li>0 potential appearence(s)</li>
              <li>0 potential appearence(s)</li>
              <li>1 potential appearence(s)</li>
            </ul>
          </div>
        </div>
        <div>
          <h1>+1</h1>
        </div>
      </div>

      <div class="summary">
        <div>
          <img src="https://picsum.photos/300/300/?random" />
        </div>
        <div>
          <h1>caption:</h1>
          <p>Can you believe I caught this on camera!</p>
          <div class="sidebyside">
            <ul>
              <li>knives</li>
              <li>guns</li>
              <li>threatening speech</li>
            </ul>
            <ul>
              <li>0 potential appearence(s)</li>
              <li>0 potential appearence(s)</li>
              <li>0 potential appearence(s)</li>
            </ul>
          </div>
        </div>
        <div>
          <h1>+0</h1>
        </div>
      </div>

      <div>

        {(typeof servData.members === 'undefined') ? (
          <p>Loading...</p>
        ) : (
          servData.members.map((members, i) => (
            <p>{members}</p>
          ))
        )}


      </div>

      

    </div>
  );
}

export default App;
