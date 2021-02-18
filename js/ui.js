// Global UI Elements
const searchDiv = document.getElementById('words-to-search');
const typeDiv = document.getElementById('type-in-words');
const imageUpload = document.getElementById('crossword-upload');
const initialRender = document.getElementById('original-crossword-view');
const solvedRender = document.getElementById('solved-crossword-view');
///console.log("poo");


// functions

// load rendering
loadButtonState = () => {
    searchDiv.style.display = "none";
    typeDiv.style.display = "none";
}

loadImgPreviewState = () =>{
    let initLink = "https://lh3.googleusercontent.com/proxy/50822HTCbMCQmA0sLtn5PaBb_DjgMZsSrkCyOON6ThD30h0BxRHBzc-RP9gcaWGHEjpogjUgfT0"
    initialRender.setAttribute("src",initLink);
    solvedRender.setAttribute("src",initLink);
}

// event listeners

// external event listeners (not in HTML)
imageUpload.addEventListener("change", (e) =>{

    if(e.target.files && e.target.files[0]){
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.addEventListener("load", (e)=>{
            initialRender.setAttribute("src",e.target.result);
        });
        reader.readAsDataURL(file);
        
    }

});


// internal event listeners (in HTML)
searchWord = () => {
    //let wordFind = 
    if (searchDiv.style.display == "none") {
        searchDiv.style.display = "block";
    } else {
        searchDiv.style.display = "none";
    }
};

typeWord = () => {
    //let wordType = 
    if (typeDiv.style.display == "none") {
        typeDiv.style.display = "block";
    } else {
        typeDiv.style.display = "none";
    }
};



// main
loadButtonState();
loadImgPreviewState();