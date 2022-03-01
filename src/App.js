import logo from './logo.svg';
import { useEffect, useRef, useState } from 'react';
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './App.css';
import * as d3 from 'd3';
//import ScriptTag from 'react-script-tag/lib/ScriptTag';
//import ScriptTag from 'react-script-tag';
import { Helmet } from "react-helmet";


function App() {

  const [data, setData] = useState([{}])
  const [path, setPath] = useState([{}])
  const [caption, setCaption] = useState([{}])
  const [date, setDate] = useState([{}])

  useEffect(
    () => {
      fetch("/requests").then(
        res => res.json()
      ).then(
        data => {
          setData(data)
          // setPath(data.Path)
          // setCaption(data.Caption)
          // setDate(data.Date)
          console.log(data)
          // console.log(path)
          // console.log(caption)
          // console.log(date)
        }
      )
    }, [])


  return (
    <div>
      {data.map((posts)=>{
        const {index,Path,Caption,Date} = posts;
        return(
          <div>
            <p key = {index}>{Path}</p>
          </div>);
        
      })}
      <p></p>

    </div>

  );
}

export default App;
