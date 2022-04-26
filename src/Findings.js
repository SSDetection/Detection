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
          <h1>Notable Values</h1>
           <p>
<strong>Privacy vs Safety (Students): </strong>
 
Do students, who are presumably the main group of people who would be monitored by an AI at school, do they value their personal privacy or public safety more?  A majority of students interviewed were willing to be monitored by an AI on their social media for the sake of public safety though, of course there are exceptions.  many voiced the idea that only law enforcement or school administrators should be the ones to have access to the data the AI collects and interprets.  others reason that they already have no privacy so “who cares”.  Oddly, only a few brought up explicitly consenting to letting an AI monitor students, though very few also brought explicitly NOT consenting.  Lastly, Some think developers only just need a small fraction of people to consent to an AI monitoring them to get the information through everyone else.
<br></br>
<br></br>
<em>
“Everyone has a personal boundary of how much they’ll disclose…We shouldn’t restrict what people want to give, but there should be options.”
</em>
           </p>
           <p>
<strong>Cost and Effectiveness (Law Enforcement and School Administration): </strong>
One key argument that we’ve heard: is AI the best course of action as opposed to hardware solutions like Secure Vestibules, more security guards, bullet proof glass, etc.?  Is AI even worth it, literally?  These are the kinds of decisions administrators and police have to make, especially in light of limited monetary resources in the public school system.  Police and School Administrators not only want assurance that the software will work reliably for the beginning, but they put a premium on it being reasonably priced.  Here are some quotes to express this view.   
<br></br>
<br></br>
<em>
“[Social Sentinel] was $10,000 a year of our budget for the service.  If you miss [hundreds of posts], what are you not capturing?  It isn’t worth $10,000 to be part of this”
<br></br>
<br></br>
“Wouldn’t it be better to put resources into better doors locks or more security guards?  These are the types of questions you ask yourself as a leader.  I have to allocate resources so do I put in better door locks or another security guard instead?...and every superintendent I know would say they need something permanent.”
</em>
           </p>
           <p>
<strong>The Indispensability of Counselors: </strong>
When asked who should have access to any alerts or data from a potential social media scraping AI, participants, whether students, parents, faculty, or police, consistently asked that counselors be among those that receive the data.  By many, if not most, counselors are seen as integral to any solution to school shootings.  Multiple participants saw having “more counselors” and “better trained counselors” as more important than having AI.  So a big takeaway is that counselors need to be involved in the development and implementation of AI systems to prevent school shootings. 
<br></br>
<br></br>
<em>
“I want more counselors for sure...and that information should defineitly go to counselors.”
</em>
           </p>
          
            <br></br>
            <br></br>

            <h1>Notable Designs</h1>
            <p>
            <strong>Social Media Scraper: </strong>The most common design is an AI that constantly scans social media profiles to detect warning signs.  Surprisingly most people are ok with this in one way or another are even suggest it.  
            </p>
            <img width="400" src="https://firebasestorage.googleapis.com/v0/b/senior-capstone-8f433.appspot.com/o/OUrchivePics%2FBrendanFraser.png?alt=media&token=4187760d-53a5-46f2-a529-d9c4fe60af5a"></img>
            <p>
            <strong>Hardware Solutions using AI: </strong>Multiple participants said they would feel safer and actually wanted everyone to go through a metal detector that uses AI to identify weapons in people's backpacks.  This is similar to a TSA security system, but more than one particpant wanted this to be a daily procedure at schools.
            </p>
            <img width="400" src="https://firebasestorage.googleapis.com/v0/b/senior-capstone-8f433.appspot.com/o/OUrchivePics%2FMetal%20Detector.png?alt=media&token=fc9fbb8b-0e4b-468c-a655-c32fc568fb06"></img>
            <p>
            <strong>Sentiment Analysis with Facial Recognition:</strong>An AI conducts a sentiment analysis of not only the text of a student's social media account but the colors and their face, seeing if they appear happy or not.  This idea was proposed earlier in the porject os no picture is available.  A number of particpants have brought up the role color could play in AI detecting threats, though other students fear that this could lead to prejudice due to humans having a wide range of skin colors.  Model training would need to be especially careful to have a waide range of subjects.  
            </p>
            <img width="400" ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Findings;