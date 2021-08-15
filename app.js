//grabbing the links
var inputs = document.querySelectorAll("input");
var buttons = document.querySelectorAll("button");
var payment = document.querySelector("#payment");
var error_x = document.querySelector("#error_x");
var error_y = document.querySelector("#error_y");
var error_z = document.querySelector("#error_z");
var table = document.querySelector("table");
var zero = document.querySelector("#zerodif");
var changeText=document.querySelector('h3');
var denominations = [1, 5, 10, 20, 100, 500, 2000];
var results = document.querySelectorAll(".de");
//end

//addEventListener Amount
buttons[0].addEventListener("click", () => {
  if (Number(inputs[0].value) > 0) {
    payment.style.display = "flex";
    buttons[1].style.display = "block";
    error_x.style.display = "none";
    buttons[0].style.display="none";
  } else {
    error_x.style.display = "block";
  }
});

//checking correct inputs
buttons[1].addEventListener("click", () => {
  var bill = inputs[0].value;
  var payment = inputs[1].value;
  clearNotes(results);
  if (Number(bill) > 0 && Number(payment > 0)) {
    if (Number(payment) >= Number(bill)) {
      table.style.display = "block";
      changeText.style.display="block";
      error_y.style.display = "none";
      error_z.style.display = "none";
      calculateNotes(bill, payment);
    } else {
      table.style.display = "none";
      changeText.style.display="none";
      error_z.style.display = "block";
      error_y.style.display = "none";
    }
  } else {
    error_y.style.display = "block";
    error_z.style.display = "none";
    table.style.display = "none";
    changeText.style.display="none" ;
  }
});

//calculate each denomincation notes
function calculateNotes(bill, payment) {
  var changeMoney = payment - bill;
  changeText.textContent=`Change notes for: ${changeMoney}`
  if (changeMoney === 0) {
    zero.style.display = "block";
    table.style.display = "none";
    return;
  }//each note checked with denomination value
  for (var i = denominations.length - 1; i >= 0; i--) {
    changeMoney = compare(changeMoney, denominations[i], i);
  }
}
//compare the remaining amount 
function compare(remainAmt, denom, index) {
  if (remainAmt >= denom) {
    var noOfNotes = Math.floor(remainAmt / denom);
    remainAmt = remainAmt - denom * noOfNotes;
    //parallely changing the text content
    results[index].textContent = noOfNotes;
  }
  return remainAmt;
}

function clearNotes(results){
    for(var x of results){
        x.textContent='';
    }
}