import logo from './logo.svg';
import { useEffect, useRef, useState } from 'react';
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './App.css';
import * as d3 from 'd3';
//import ScriptTag from 'react-script-tag/lib/ScriptTag';
//import ScriptTag from 'react-script-tag';
import {Helmet} from "react-helmet";


function App() {

  //SERVER STUFF
  const [servData,setData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(
      servData => {
        setData(servData)
        console.log(servData)
      }
    )
  },[])

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
  var margin = { top: 20, bottom: 20, left: 1, right: 1};
  
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
  var data = [{name: "Gun", share: 75}, 
            {name: "No Gun", share: 25}];

  var g = svg.append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // Step 4
  var ordScale = d3.scaleOrdinal()
                  .domain(data)
                  .range(['blue','yellow','green','red','pink']);

  // Step 5
  var pie = d3.pie().value(function(d) { 
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
  .attr("fill", function(d) { return ordScale(d.data.name); });

  // Step 7
  var label = d3.arc()
              .outerRadius(radius)
              .innerRadius(0);
    
  arc.append("text")
  .attr("transform", function(d) { 
            return "translate(" + label.centroid(d) + ")"; 
    })
  .text(function(d) { return d.data.name; })

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

  var thumbwidth=500

  return (
    <div >

      <header className="App-header ">

        <form onSubmit={addTodo} class="center" align="center">
          <input type="text" placeholder="Enter name here" ref={todoText} />
          <input type="submit" value="Search" />
        </form>

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
          <h1>@username</h1>
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

          <div class="sidebyside">
            <div class="result centercontent">
              <p class="analysis"><span class="green">clear</span></p>
              <img src="https://picsum.photos/100/100/?random" class="center"/>
              <p class="comment">All your base are belong to us</p>
            </div>

            <div class="result centercontent">
              <p class="analysis"><span class="red">language</span></p>
              <img src="https://picsum.photos/100/99/?random" class="center"/>
              <p class="comment">spoiler alert thanos <span class="red">dies</span></p>
            </div>

            <div class="result centercontent">
              <p class="analysis"><span class="red">gun</span></p>
              <img src="https://picsum.photos/100/101/?random" class="center"/>
              <p class="comment">at the range</p>
            </div>

            <div class="result centercontent">
              <p class="analysis"><span class="red">knife</span></p>
              <img src="https://picsum.photos/100/102/?random" class="center"/>
              <p class="comment">my new kunai</p>
            </div>
          </div>

          <div class="sidebyside">
            <div class="result centercontent">
              <p class="analysis"><span class="green">clear</span></p>
              <img src="https://picsum.photos/101/101/?random" class="center"/>
              <p class="comment">no u</p>
            </div>

            <div class="result centercontent">
              <p class="analysis"><span class="green">clear</span></p>
              <img src="https://picsum.photos/101/100/?random" class="center"/>
              <p class="comment">who else misses dan the train man</p>
            </div>

            <div class="result centercontent">
              <p class="analysis"><span class="red">language gun</span></p>
              <img src="https://picsum.photos/101/99/?random" class="center"/>
              <p class="comment">suns out guns out or I get <span class="red">hangry</span></p>
            </div>

            <div class="result centercontent">
              <p class="analysis"><span class="green">clear</span></p>
              <img src="https://picsum.photos/101/102/?random" class="center"/>
              <p class="comment">nice pic huh</p>
            </div>
          </div>

          <div class="sidebyside">
            <div class="result centercontent">
              <p class="analysis"><span class="green">clear</span></p>
              <img src="https://picsum.photos/99/100/?random" class="center"/>
              <p class="comment">example</p>
            </div>

            <div class="result centercontent">
              <p class="analysis"><span class="red">language</span></p>
              <img src="https://picsum.photos/99/101/?random" class="center"/>
              <p class="comment">another example <span class="red">dies</span></p>
            </div>

            <div class="result centercontent">
              <p class="analysis"><span class="red">language</span></p>
              <img src="https://picsum.photos/99/102/?random" class="center"/>
              <p class="comment">happy <span class="red">dies</span> in the movies</p>
            </div>

            <div class="result centercontent">
              <p class="analysis"><span class="red">language</span></p>
              <img src="https://picsum.photos/99/99/?random" class="center"/>
              <p class="comment">another excusse to say<span class="red">dies</span></p>
            </div>
          </div>
          
          

        </div>
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
        {todos.map(todo => (<li key={todo}>{todo}</li>))}  
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
          <img src="https://picsum.photos/300/299/?random"/>
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
        ):(
          servData.members.map((member,i) => (
            <p key={i}>{member}</p>
          ))
        )}
        
       
      </div>
        
    </div>
  );
}

export default App;
