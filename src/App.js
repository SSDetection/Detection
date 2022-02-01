import logo from './logo.svg';
import { useEffect, useRef, useState } from 'react';
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './App.css';

function App() {

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

      <header className="App-header">

        <form onSubmit={addTodo} align="center">
          <input type="text" placeholder="Enter name here" ref={todoText} />
          <input type="submit" value="Search" />
        </form>

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
        
      </header>

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
        <div>
          <form action="/action_page.php">
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

    </div>

  );
}

export default App;