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
import { Helmet } from "react-helmet";
import {Requests} from "./Requests.js"
import {Posts} from "./Posts.js"


function App() {
//   console.log(basejson)
  

//   const [data, setData] = useState([{}])
//   const [username, setUsername] = useState([{}])
//   // const [path, setPath] = useState([{}])
//   // const [caption, setCaption] = useState([{}])
//   // const [date, setDate] = useState([{}])

//   useEffect(
//     () => {
//       getData()
//     }, [])
// console.log(data)
  const [username, setUsername] = useState('@username');
  const [data, setData] = useState();
  const [post, setPost] = useState();
  const [update, setUpdate] = useState(false);

  let textInput = React.createRef();

  useEffect(()=> {
    console.log("Page Rendered")
    let didCancel = false;

    async function fetchUser() {
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
    }
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

  return (
    // <div>
    //     <Container>
          
    //       <Requests onNewUser = {user => setUsername(user)}/>
    //       <Posts data = {data}/>
    //       </Container>
    //       <div className="App">
    //  {
    //    basejson && basejson.length>0 && basejson.map((item)=><p>{item.path}</p>)
    //  }
    // </div>
    // </div >
    
    <div className="App">
      {data && (
      // data.map(renderData(data))
        // <>
        // <h1>{data.posts[0].caption[0]}</h1>
        // <p>{username}</p>
        // </>
        <>
        
        <div>
          <h1>{username}</h1>
          {data.posts.map (post => <div>
            
            <h2>{post.caption[0]}</h2>
            <p>{post.date[0]}</p>
            </div>)}
        </div>
        </>

      )
      }
      <input ref={textInput} type='text' placeholder={username}></input>
      <button onClick={() => {
        callBoth()
      }}>
        Click this
      </button>
    </div>


  );
}

export default App;