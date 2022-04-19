import React from "react";

function clearBoxes() {
    document.getElementById("Text1").value = " ";
    document.getElementById("Text2").value = " ";
    document.getElementById("Text3").value = " ";
    document.getElementById("Text4").value = " ";
    document.getElementById("Text5").value = " ";

}

function Submit() {
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
            <h1>Submit your own Design!</h1>
            <p>
            <strong>Suggested Solution: </strong>
            </p>
            <textarea id="Text1" cols="80" rows="5"></textarea>
            <p>
            <strong>Who is the User: </strong> </p>
            <textarea id="Text2" cols="80" rows="5"></textarea>
            <p>
            <strong>Why this Design: </strong> </p>
            <textarea id="Text3" cols="80" rows="5"></textarea>
            <p>
            <strong>Values and Opinions: </strong>  </p>
            <textarea id="Text4" cols="80" rows="5"></textarea>
            <p>
            <strong>Image URL: </strong>  </p>
            <textarea id="Text5" cols="80" rows="1"></textarea>
            <p>
            <button onClick={() => {clearBoxes()}}>Submit</button>
            <br></br>
                We typically review submissions and add them to the archive within a week.
            </p>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Submit;