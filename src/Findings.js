import React from "react";

function Findings() {
  return (
    <div className="about">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div >{/*class="col-lg-5"*/}
            <h1>Recurring Values</h1>
            <p>
            <strong>Privacy: </strong>Most stakeholders were willing to sacrifice privacy for the greater good, so long as the data collected isn’t public information.
            </p>
            <p>
            <strong>Data in the “Right Hands”: </strong>If data is going to be collected and available, it should only be accessible by law enforcement or school administrators.
            </p>
            <p>
            <strong>Mental Health Improvements: </strong>Many felt that there needed to be greater support for mental health at schools through counselors. 
            </p>
          
            <br></br>
            <br></br>

            <h1>Notable Designs</h1>
            <p>
            <strong>Social Media Scraper: </strong>The most common design was an AI that constantly scans social media profiles to detect warning signs.
            </p>
            <p>
            <strong>Tangible Solution: </strong>Metal detector, secure vestebules, etc.  A participant suggested using a metal detector esque system to scan backpacks to detect weapons.
            </p>
            <p>
            <strong>Culture Changes: </strong>More counselors, put the “Bible back in the home” one participant said–multiple participants felt that the issue could be fixed through improving the support system for students at schools.
            </p>
 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Findings;