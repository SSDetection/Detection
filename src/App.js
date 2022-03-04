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

  const [data, setData] = useState([{}])
  const [username, setUsername] = useState([{}])
  // const [path, setPath] = useState([{}])
  // const [caption, setCaption] = useState([{}])
  // const [date, setDate] = useState([{}])

  useEffect(
    () => {
      fetch("/requests").then(
        res => res.json()
      ).then(
        data => {
          setData(data[1].caption)
          // setPath(data.Path)
          // setCaption(data.Caption)
          // setDate(data.Date)
          
          // console.log(path)
          // console.log(caption)
          // console.log(date)
        }
      )
    }, [])
console.log(data)

  return (
    <div>
        <Container>
          
          <Requests onNewUser = {user => setUsername(user)}/>
          </Container>


    </div >

  );
}

export default App;