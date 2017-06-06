// Initialize Firebase
var config = {
  apiKey: "AIzaSyCjkfmg2MFFocIDBdQuplLOOflyD2roLQM",
  authDomain: "sna-final.firebaseapp.com",
  databaseURL: "https://sna-final.firebaseio.com",
  projectId: "sna-final",
  storageBucket: "sna-final.appspot.com",
  messagingSenderId: "296131393218"
};
firebase.initializeApp(config);
var provider = new firebase.auth.FacebookAuthProvider();
var db          = firebase.database() ;
var rootRef     = db.ref() ;
var usersRef    = db.ref("users");

$(document).ready(function(){
  firebase.auth().onAuthStateChanged(function(user) {
    var vm=this;
      if (user){
        // save usr public data  (*1)
        var userData = user.toJSON();
        usersRef
          .child (userData.uid)
          .update(userData)
          .catch(errorCallback)
        // update vue to login status

      }else{
        // update vue to logout status
      }
    })
})

var errorCallback = function(error){ alert(error.message)}

$('.log-in').click(function(){

  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  var user = result.user;
  console.log(token);
  console.log(user);
  $('.log-in').css('display','none')
  $('.loged').css('display','block')
}).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  var email = error.email;
  var credential = error.credential;
});
})
