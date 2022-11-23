const createFutureEventForm = document.querySelector("#newFutureEventForm");
createFutureEventForm.addEventListener("submit", e=>{
    e.preventDefault();
    console.log('Prevented Default');
    const eventObj = {
        title:document.querySelector("#newFutureEventTitle").value,
        body:document.querySelector("#newFutureEventBody").value,
        date:document.querySelector("#newFutureEventDate").value,
    }

    console.log(eventObj);
    fetch("/api/events/", {
        method:"POST",
        body:JSON.stringify(eventObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res => {
        console.log(res);

        if(res.ok){
            location.reload()
        } else {
            alert("error posting to notes")
        }
    })    
})