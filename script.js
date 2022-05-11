let typeForm = $("#type");
let peopleForm = $("#participants");
let priceForm = $("#price");

// function to generate type specific image
function findImage(dataType) {
  switch (dataType) {
    case "music":
      $("img").attr(
        "src",
        "https://images.pexels.com/photos/1001850/pexels-photo-1001850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      );

      break;
    case "education":
      $("img").attr(
        "src",
        "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      );

      break;
    case "recreational":
      $("img").attr(
        "src",
        "https://images.pexels.com/photos/9621129/pexels-photo-9621129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      );

      break;
    case "social":
      $("img").attr(
        "src",
        "https://images.pexels.com/photos/207896/pexels-photo-207896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      );

      break;
    case "diy":
      $("img").attr(
        "src",
        "https://images.pexels.com/photos/3972016/pexels-photo-3972016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      );

      break;
    case "charity":
      $("img").attr(
        "src",
        "https://images.pexels.com/photos/6590920/pexels-photo-6590920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      );

      break;
    case "relaxation":
      $("img").attr(
        "src",
        "https://images.pexels.com/photos/258330/pexels-photo-258330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      );

      break;
    case "busywork":
      $("img").attr(
        "src",
        "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      );

      break;
    case "cooking":
      $("img").attr(
        "src",
        "https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      );

      break;

    default:
  }
}

// random button finds a random activity, no parameters required
$("#randomActivity").click(function () {
  let URLrandom = "https://www.boredapi.com/api/activity/";
  $.ajax({
    url: URLrandom,
  }).then(
    (data) => {
      $("#errorbox").text("");
      findImage(`${data.type}`);
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
// non random search button, requires specific search parameters

$("#submitForm").click(function () {
  let price = priceForm.val();
  let priceVal = "";
  let randomNum = 0.0;
  let URL = "";
  let lowArr = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];

  if (price == "free") {
    priceVal = "free";
    price = 0.0;
  } else if (price == "low") {
    //   generate random number to select a value from low prices array
    priceVal = "low";
    randomNum = Math.floor(Math.random() * 3);
    // from 0 to 2 index
    price = lowArr[randomNum];
  } else if (price == "medium") {
    priceVal = "medium";
    //   3 to 4 index
    randomNum = Math.floor(Math.random() * 2) + 3;
    price = lowArr[randomNum];
  } else {
    randomNum = Math.floor(Math.random() * 3) + 5;
    price = lowArr[randomNum];
    priceVal = "high";
  }

  if (typeForm.val() === "any") {
    URL = `https://www.boredapi.com/api/activity?price=${price}&participants=${peopleForm.val()}`;
    console.log("any ran");
  } else {
    URL = `https://www.boredapi.com/api/activity?type=${typeForm.val()}&price=${price}&participants=${peopleForm.val()}`;
    console.log("not any ran");
  }

  $.ajax({
    url: URL,
  }).then(
    (data) => {
      if (data.type == undefined) {
        $("#errorbox").text(
          "there was an error, try different search parameters"
        );
        $("#typeData").text(`Type: `);
        $("#activityData").text(`Activity: `);
        $("#priceData").text(`Price: `);
        $("img").attr(
          "src",
          "https://images.pexels.com/photos/1888015/pexels-photo-1888015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        );
      } else {
        findImage(`${data.type}`);

        $("#errorbox").text("");

        $("#typeData").text(`Type: ${data.type}`);
        $("#activityData").text(`Activity: ${data.activity}`);
        $("#priceData").text(`Price: ${priceVal}`);
      }
    },
    (error) => {
      console.log("bad request", error);
    }
  );
});
