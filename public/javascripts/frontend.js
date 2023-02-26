
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

    const postList = document.getElementById("post");
    
       
     


      postMaker.addEventListener("click", function(){
        fetch('/api/user/createPost',  {
          method: 'get',
          headers: {
            "Content-type": "application/html"
          }
        })
        .then(function(response) {
          if(response.ok) {
            console.log('Click was recorded');
            
          }
      })
    })
      

  }