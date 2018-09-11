document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('signin-button').addEventListener('click', function(event) {
    event.preventDefault()
    const origin = window.location.origin
    blockstack.redirectToSignIn(origin, origin + '/manifest.json', ['store_write', 'publish_data'])
  })

  document.getElementById('signout-button').addEventListener('click', function(event) {
    event.preventDefault()
    blockstack.signUserOut(window.location.href)
  })

  document.getElementById('getFile').addEventListener('click', function(event){
    event.preventDefault()
    var filename = document.getElementById('filename').value
    var username = document.getElementById('username').value
    document.getElementById('content').value = ''
    blockstack.getFile(filename, {decrypt :false, username : username})
      .then(
        function(file){
          document.getElementById('content').value = file
        },
        function(e){
          console.log(`${username}: ${filename}`);
          console.log('getfile failed for %s', e);
        }
      )
  })

  document.getElementById('putFile').addEventListener('click', function(event){
    event.preventDefault()
    var filename = document.getElementById('filename').value
    var blob = document.getElementById('content').value
    blockstack.putFile(filename, blob, {encrypt : false})
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


  function showUsername(username) {
    document.getElementById('heading-name').innerHTML = username ? username : "undefined user"
    document.getElementById('section-1').style.visibility = 'hidden' 
    document.getElementById('section-2').style.visibility = 'visible'
  }

  if (blockstack.isUserSignedIn()) {
    var username = blockstack.loadUserData().username
    console.log(blockstack.loadUserData())
    showUsername(username)
  } else if (blockstack.isSignInPending()) {
    blockstack.handlePendingSignIn().then(function(userData) {
      window.location = window.location.origin
    })
  }
})
