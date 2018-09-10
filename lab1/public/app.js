document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('signin-button').addEventListener('click', function(event) {
    event.preventDefault()
    blockstack.redirectToSignIn()
  })

  document.getElementById('signout-button').addEventListener('click', function(event) {
    event.preventDefault()
    blockstack.signUserOut(window.location.href)
  })

  document.getElementById('getFile').addEventListener('click', function(event){
    event.preventDefault()
    var filename = document.getElementById('filename').value
    document.getElementById('content').value = ''
    blockstack.getFile(filename, {decrypt : false})
      .then(
        function(file){
          document.getElementById('content').value = file
        },
        function(file){
          console.log('getfile failed for %s', filename);
        }
      )
  })

  document.getElementById('putFile').addEventListener('click', function(event){
    event.preventDefault()
    var filename = document.getElementById('filename').value
    var blob = document.getElementById('content').value
    blockstack.putFile(filename, blob,{decrypt : false})
      .then(
        function(){
          console.log('put file suggess for %s', filename);
          // clean the text area
          document.getElementById('content').value = ''
        },
        function(file){
          console.log('putFile failed for %s', filename);
        }
      )
  })


  function showProfile(profile) {
    var person = new blockstack.Person(profile)
    document.getElementById('heading-name').innerHTML = person.name() ? person.name() : "Nameless Person"
    if(person.avatarUrl()) {
      document.getElementById('avatar-image').setAttribute('src', person.avatarUrl())
    }
    document.getElementById('section-1').style.display = 'none'
    document.getElementById('section-2').style.display = 'block'
  }

  if (blockstack.isUserSignedIn()) {
    var profile = blockstack.loadUserData().profile
      showProfile(profile)
      console.log("ud: %o", blockstack.loadUserData());
  } else if (blockstack.isSignInPending()) {
    blockstack.handlePendingSignIn().then(function(userData) {
      window.location = window.location.origin
    })
  }
})
