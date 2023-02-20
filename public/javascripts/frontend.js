
if (document.readyState !== "loading") {
    console.log("Document is ready");
    initializeCode();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      console.log("Document ready after waiting!");
      initializeCode();
    })
  }

  function initializeCode() {

    const loginButton = document.getElementById("signup");
    loginButton.addEventListener("click", function(){
       
       
        // fetch('/api/user/register', {
        //     method : 'get',
        //     headers: {
        //         "Content-type": "application/json"
        //       }
            
        //   })

    })
 

  }