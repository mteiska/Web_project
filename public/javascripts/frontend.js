
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
    
       
       
        fetch('/listPosts', {
            method : 'get',
            headers: {
                "Content-type": "application/json"
              }
            
          })
          .then(response => response.json())
          .then(data => {
        const ul = document.createElement("ul")
        for (i = 0; i < data.length; i++) {
            const node = document.createElement("li")
            node.setAttribute(text = data[i].postname)
            ul.appendChild(node);
        }
        const col = document.getElementById("col");
        col.appendChild(ul)

          })


 

  }