
if (document.readyState !== "loading") {
    console.log("Document is ready");
    initializeCodeLogin();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      console.log("Document ready after waiting!");
      initializeCodeLogin();
    })
  }
  function initializeCodeLogin() {
    document.getElementById("login-form").addEventListener("submit", onSubmit);
}


function onSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

       //fetched /api/user/login route with given username and password and if login is
       //succesful store created token to localstorage and update posts  or give error like done with lecture materials.
        fetch('/api/user/login',  {
          method: 'POST',
          body: formData
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
            if(data.token) {
                storeToken(data.token);
                window.location.href="posts";
            } else {
                if (data.message) {
                    document.getElementById("error").innerHTML = data.message;
                }  else {
                    document.getElementById("error").innerHTML = "Very strange error!";
                }
            }

        })


}

function storeToken(token) {
  localStorage.setItem("auth_token", token);
}


       
            
          
      
    
      

  
