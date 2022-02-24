
// Set the date we're counting down to
var countDownDate = new Date("May 5, 2022 12:00:00").getTime();

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



// Subscribe function with event listener
const formValue = document.querySelector('button');

function subscribe(){
  let users = document.getElementById("myForm").elements[0].value;

  fetch('localhost:3000/api/subscribe', {
    method: "POST",
    body: JSON.stringify(users),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
}

formValue.addEventListener('click', subscribe);