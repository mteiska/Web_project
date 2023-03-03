if (document.readyState !== "loading") {
    console.log("Document is ready");
    initialize_code();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      console.log("Document ready after waiting!");
      initialize_code();
    })
  }

  function initialize_code() {
    document.getElementById("comment-form").addEventListener("submit", comment_post);
   
}
//Fetches create comment, lecture material is used as base
//authToken is gotten from localstorage and sent for authentication
function comment_post(event){
    event.preventDefault();
    const formdata = new FormData(event.target);
    console.log(formdata);
    const authToken = localStorage.getItem("auth_token");
    if(!authToken) return;
    //Get post id from url that comment is added to.
    const url = window.location.pathname 
    const url_params = url.split('/');
    const id = url_params[url_params.length-1];

    fetch(`/api/user/createComment/${id}`, {
        headers: {
            "authorization": "Bearer " + authToken,
            'Accept': 'application/json'
        }, 
        method: "post",
        body: formdata
          })
          .then((response) => response.text())
          .then((page) => {
            //Reload the page to see newest comment
            location.reload()
          })
  
          
            
        
        .catch((e) => {
            console.log("error" + e);
        })

}