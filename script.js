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
    let URL = `http://www.boredapi.com/api/activity?type=${typeForm.val()}`;
    

  console.log();
  console.log(peopleForm.val());
  console.log(priceForm.val());


  $.ajax({
    url: URL,
  }).then(
    (data) => {
      $("#typeData").text(`Type: ${data.type}`)
      $("#activityData").text(`Activity: ${data.activity}`);
    },
    (error) => {
      console.log("bad request", error);
    }
  );
});
