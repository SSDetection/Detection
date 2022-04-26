import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import './App.css';
import 'firebase/storage';
import { useEffect, useState, useRef } from 'react';
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import './App.css';
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import Chart from 'chart.js/auto';


const month = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

const d = new Date();
let currMonth = month[d.getMonth()];
let currYear = d.getFullYear();




function App() {

  let months = { "JANUARY": 0, "FEBRUARY": 0, "MARCH": 0, "APRIL": 0, "MAY": 0, "JUNE": 0, "JULY": 0, "AUGUST": 0, "SEPTEMBER": 0, "OCTOBER": 0, "NOVEMBER": 0, "DECEMBER": 0 };

  const [username, setUsername] = useState('username');
  const [data, setData] = useState();
  const [graphData, setGraphData] = useState([months["JANUARY"], months["FEBRUARY"], months["MARCH"], months["APRIL"]]);
  const [pieData, setPieData] = useState([])

  const [graph, setGraph] = useState({
    labels: month,
    datasets: [{
      label: 'Frequency',
      data: graphData,
      backgroundColor: [
        'rgba(255, 26, 104, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(0, 0, 0, 0.2)'
      ],
      borderColor: [
        'rgba(255, 26, 104, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0, 0, 0, 1)'
      ],
      borderWidth: 1
    }]
  });

  const [pieChart, setPieChart] = useState({
    labels: ['Yes', 'No'],
    datasets: [{
      label: 'Frequency',
      data: pieData,
      backgroundColor: [
        'rgba(255, 26, 104, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(0, 0, 0, 0.2)'
      ],
      borderColor: [
        'rgba(255, 26, 104, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0, 0, 0, 1)'
      ],
      borderWidth: 1
    }]
  });

  let textInput = React.createRef();

  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    if (username !== "username") {
      console.log("App running")
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      };
      fetch('http://68.183.136.191:5000/requests', requestOptions)
        .then(response => response.json())
        .then(data => {
          setData(data);
          setGraphData(setMonthData(data));
          setPieData(getAccuracyList(data));
          console.log(data);
          console.log(pieData);
        })
    }
    // this username means everytime it changes this useeffect gets run
  }, [username]);

  //this little thing makes sure the useEffect below it only runs when the graphdata variable changes instead of on start as well
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else {
    setGraph({
      labels: getMonthList(currMonth),
      datasets: [{
        label: 'Frequency',
        data: graphData,
        backgroundColor: [
          'rgba(255, 26, 104, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
          'rgba(255, 26, 104, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 0, 0, 1)'
        ],
        borderWidth: 1
      }]
    });
  }
  }, [graphData]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else {
    setPieChart({
      labels: ["Yes","No"],
      datasets: [{
        label: 'Frequency',
        data: pieData,
        backgroundColor: [
          'rgba(255, 26, 104, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
          'rgba(255, 26, 104, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 0, 0, 1)'
        ], 
        borderWidth: 1
      }]
    });
    console.log('here')
  }
  }, [pieData]);


  function getMonthList(currMonth) {
    let monthArr = []
    let monthnum = month.indexOf(currMonth)
    for (let i = 0; i < 6; i++) {
      if (monthnum < 0) {
        monthnum = 11
      }
      monthArr.unshift(month[monthnum])
      monthnum -=1
      
    }
    console.log(monthArr)
    return monthArr
  }

  function getAccuracyList(datapoints){
    let yes = 0;
    let no = 0;
    const yesorno = datapoints.Data.map(
      function (index) {
        let array = index.Accuracy[0];
        if  (array[0] >= 80) {
          yes++;
        }
        else{
          no++;
        }

        return [yes, no];
      }
    )
    return [yes, no];
  }

  function setMonthData(datapoints) {
    
    const labelsmonth = datapoints.Data.map(
      function (index) {
        let array = index.Date.split(' ');
        if ((array[0] in months && array.length === 2) || array[2] === currYear) {
          months[array[0]] = months[array[0]] + 1;
        }

        return array[0] + array[2];
      })
    return months
  }

  function changeUsername() {
    setUsername(textInput.current.value)

  }

  return (


    <div className="App">
      <header className="App-header ">


        <div className = "smallpadding App">

          <input ref={textInput} type='text' placeholder="@username" id="inputBox" className="marginright"></input>

          <button className="white lightgreyback" onClick={() => {
            changeUsername()
          }}>
            search
          </button>
        </div>
      </header>

      <div className="sidebyside body">
        {/* Side Bar */}
        <div className="sidebar">
          <h1 id="usernameHeader">@{username}</h1>

          <h2 className='interestColor'>
            Interest Level: NULL
          </h2>

          <div className="sidebyside font10 negativepadding">

            <ul>
              <li>knives</li>
              <li>guns</li>
              <li>threatening speech</li>
            </ul>
            <ul>
              <li>1 potential</li>
              <li>2 potential</li>
              <li>3 potential</li>
            </ul>
          </div>


          
          
          

          <h6>Percentage of Gun Posts for @{username}</h6>
            <div>
              <PieChart chartData={pieChart}/>
            </div>



          <div id="d3-container" className="midgreyback">
            <h6># of Posts Over Time</h6>
              <div>
                <BarChart chartData={graph} />
              </div>

          </div>
        </div>



        <div className="display darkgreybackcard">

          {data && (
            <>

              <div className="lightlightgreycard">

                {data.Data.map(post => <div className="lightgreybackcard">
                  <img className="card_image" src={post.Image} width="200" height="200"></img>
                  <p>{post.Caption}</p>
                  <p>{post.Date}</p>
                  <p>Model Confidence: {post.Accuracy}%</p>
                </div>)}
              </div>
            </>

          )
          }

          <div className="lightlightgrey">
            <div className="lightgreyback">
              <img className="card_image" src="https://firebasestorage.googleapis.com/v0/b/senior-capstone-8f433.appspot.com/o/OUrchivePics%2FBenPic.jpg?alt=media&token=ee326d9c-4674-4747-bc27-7f5033b40280" width="200" height="200"></img>
              <p><font color="green">post.Caption</font></p>
              <p>post.Date</p>
              <p>Model Confidence: post.Accuracy%</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;