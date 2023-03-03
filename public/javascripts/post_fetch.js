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
    document.getElementById("post-form").addEventListener("submit", fetch_post);
   
}
//Fetches crete post, lecture material is used as base
//authToken is gotten from localstorage and sent for authentication
function fetch_post(event){
    event.preventDefault();
    const formdata = new FormData(event.target);
    const authToken = localStorage.getItem("auth_token");
    if(!authToken) return;

    fetch("/api/user/createPost", {
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



