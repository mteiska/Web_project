if (document.readyState !== "loading") {
    console.log("Document is ready");
    //comment_fetch();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      console.log("Document ready after waiting!");
      comment_fetch();
    })
  }

 function comment_fetch() {
    var comment_ids = document.getElementById("helper").getAttribute("data");
    console.log(comment_ids)
    fetch(`/api/user/getComments`,  {
        method: 'post',
        headers: {
          "Content-type": "application/json"
        },
        body: comment_ids
      }).then(response => response.json())
        .then(data => {
        let commentAmount = data.length;
        for (i = 0; i < commentAmount; i++){
            let listElem = document.createElement("li");
            let textNode = document.createTextNode(data[i].comment_text)
            listElem.appendChild(textNode)
            const comment_div = document.getElementById("comments")
            comment_div.appendChild(listElem)
        }

        
    })

  }
