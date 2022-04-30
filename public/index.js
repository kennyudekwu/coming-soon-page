
// Set the date we're counting down to
var countDownDate = new Date("June 1, 2022 12:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var currentDate = new Date().getTime();

  // Find the distance between currentDate and the count down date
  var distance = countDownDate - currentDate;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="counter"
  document.getElementById("counter").innerHTML = days + " days: " + hours + " hrs: "
  + minutes + " mins:  " + seconds + " secs ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("counter").innerHTML = "EXPIRED";
  }
}, 1000);



async function postFormDataAsJson({url, formData}) {
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);

  const fetchOptions = {
    method: "POST",
    headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
    body: formDataJsonString,
  };

  const response = await fetch(url, fetchOptions);

  if(!response.ok){
    // pop up a modal stating the reason for the error to the user based on the server's response(s)
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  // only display the "email sent" modal only if the server responds with a 200 success status code

  return response.json();
}

async function subscribe(event){
  event.preventDefault();

  const form = event.currentTarget;
  const url = form.action;

  try{
    const formData = new FormData(form);

    const responseData = await postFormDataAsJson({ url, formData });

    let modal =  $('#exampleModal').modal('show');
    if(modal){
          let formError = document.getElementById("formError");
          formError.style.display = "none";
    }

    // console.log({responseData});
  } catch (error) {
    // console.log(error);
        let formError = document.getElementById("formError");
        if (formError.innerText == "") {
          // console.log("I'm inside the if block...");
          // console.log(formError.innerText);
          formError.innerText = error;
          formError.style.color = "rgb(255, 91, 91)";
          formError.style.fontWeight = "700";
          fadeIn();
        }
        setTimeout(fadeOut, 2500);

        function fadeOut() {
          formError.innerText = "";
          // console.log("Fading out...")
          $("#formError").fadeOut();
        }


        function fadeIn() {
          // console.log("Fading In now...")
          $("#formError").fadeIn();
        }
        // setTimeout(fadein, 5000);

        // console.log('Innertext: ', formError.innerText);
  }
}

const formValue = document.getElementById("myForm");
formValue.addEventListener('submit', subscribe);
