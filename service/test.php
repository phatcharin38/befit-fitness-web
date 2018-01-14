<!DOCTYPE html>
<html lang="en">

<head>
    <title>Test Firebase</title>
</head>
<body>
	<h1>Hello Firebase!</h1>
    <h2 id = "thisone"></h2>
</body>
</html>


<script src="https://www.gstatic.com/firebasejs/4.7.0/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC79XdDXH4vBaKHg3BiB2XHFRqhhYHJQAo",
    authDomain: "my-project-test1-a8257.firebaseapp.com",
    databaseURL: "https://my-project-test1-a8257.firebaseio.com",
    projectId: "my-project-test1-a8257",
    storageBucket: "my-project-test1-a8257.appspot.com",
    messagingSenderId: "128041947269"
  };
  firebase.initializeApp(config);

  var thisone = document.getElementById('thisone');
  var dbref = firebase.database().ref().child('text');
  dbref.on('value',snap => thisone.innerText = snap.val());

</script>
