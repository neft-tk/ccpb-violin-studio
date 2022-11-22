const createNoteForm = document.querySelector("#newLessonNoteForm");
createNoteForm.addEventListener("submit", e=>{
    e.preventDefault();
    console.log('Prevented Default');
    const noteObj = {
        title:document.querySelector("#newLessonNoteTitle").value,
        body:document.querySelector("#newLessonNoteBody").value,
    }

    console.log(noteObj);
    fetch("/api/notes/", {
        method:"POST",
        body:JSON.stringify(noteObj),
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