 var config = {
     apiKey: "AIzaSyA9NsFW-KbXpdvgcZSBO1w6MNeZ6tm20uE",
     authDomain: "train-project-59b28.firebaseapp.com",
     databaseURL: "https://train-project-59b28.firebaseio.com",
     projectId: "train-project-59b28",
     storageBucket: "",
     messagingSenderId: "918823124885"
 };
 firebase.initializeApp(config);
 var database = firebase.database();


 $("#add-Train").on("click", function (event) {
     event.preventDefault();
     var trainName = $("#name-input").val().trim()
     var trainDestination = $("#destination-input").val().trim()
     var trainFirstTime = $("#firstTrain-input").val().trim()
     var trainFrequency = $("#frequency-input").val().trim()

     database.ref('/trainData').push({
         trainName: trainName,
         trainDestination: trainDestination,
         trainFirstTime: trainFirstTime,
         trainFrequency: trainFrequency
     })

 })

 database.ref('/trainData').on("child_added", function (snapshot) {

     var name = snapshot.val().trainName;
     var destination = snapshot.val().trainDestination;
     var time = snapshot.val().trainFirstTime;
     var frequency = snapshot.val().trainFrequency;

     var convertTimeOne = moment(time, "HH:mm").subtract(1, "years");


     var diffTime = moment().diff(moment(convertTimeOne), "minutes");

     var timeRemainder = diffTime % frequency;

     var tMinutesTillTrain = frequency - timeRemainder;
     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     var nextArrival = moment(nextTrain).format("hh:mm");

     $("tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
         nextArrival + "</td><td>" + frequency + "</td><td>" + time + "</td></tr>");
 })