let typeForm = $("#type");
let peopleForm = $("#participants");
let priceForm = $("#price");

$("#randomActivity").click(function () {
  let URLrandom = "http://www.boredapi.com/api/activity/";
  $.ajax({
    url: URLrandom,
  }).then(
    (data) => {
      console.log(data.price);
      $("#typeData").text(`Type: ${data.type}`);
      $("#activityData").text(`Activity: ${data.activity}`);
      //   format price
      if (data.price == 0.0) {
        $("#priceData").text(`Price: free`);
      } else if (data.price <= 0.3) {
        $("#priceData").text(`Price: low`);
      } else if (data.price <= 0.5) {
        $("#priceData").text(`Price: medium `);
      } else {
        $("#priceData").text(`Price: high`);
      }
    },
    (error) => {
      console.log("bad request", error);
    }
  );
});
// random button

$("#submitForm").click(function () {
  let price = priceForm.val();
  let priceVal = "";
  let randomNum = 0;
  let lowArr = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];
  console.log(price);
  if (price == "free") {
    priceVal = free;
    price = 0.0;
  } else if (price == "low") {
    //   generate random number to select a value from low prices array
    priceVal = "low";
    randomNum = Math.floor(Math.random() * 3);
    // from 0 to 2 index
    price = lowArr[randomNum];
  } else if (price == "medium") {
      priceVal = "medium"
    //   3 to 4 index
    randomNum = Math.floor(Math.random() * 2) + 3;
    price = lowArr[randomNum];
  } else {
    randomNum = Math.floor(Math.random() * 3) + 5;
    price = lowArr[randomNum];
    priceVal = "high"
  }

  let URL = `http://www.boredapi.com/api/activity?type=${typeForm.val()}&price=${price}&participants=${peopleForm.val()}`;

  console.log(peopleForm.val());

  $.ajax({
    url: URL,
  }).then(
    (data) => {
      $("#typeData").text(`Type: ${data.type}`);
      $("#activityData").text(`Activity: ${data.activity}`);
      $("#priceData").text(`Price: ${priceVal}`);
    },
    (error) => {
      console.log("bad request", error);
    }
  );
});
