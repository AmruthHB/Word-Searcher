// axios and send request to python backend
// 3 pieces of data: grid, words, image
const solver = document.getElementById('solver-btn')


checkValid = (wordsElem,heightElem,widthElem,imgElem) =>{
    let errorIndicate = {
        searchWords: "",
        height: "",
        width: "",
        img: "",
        valid: true
    }

    let heightAsNum = parseInt(heightElem.value);
    let widthAsNum = parseInt(widthElem.value);
    console.log(heightAsNum);

    if(!(imgElem.files[0])){
        errorIndicate.valid = false;
        errorIndicate.img = "Enter a valid Image";
    }

    if(Number.isInteger(heightAsNum) === false){
        errorIndicate.valid = false;
        errorIndicate.height = "Enter height as integer";

    }

    if(Number.isInteger(widthAsNum) === false){
        errorIndicate.valid = false;
        errorIndicate.width = "Enter width as integer";
        
    }

    if(!(wordsElem.value) || /^\s*$/.test(wordsElem.value) === true){
        errorIndicate.valid = false;
        errorIndicate.searchWords = "Please enter some words";
        
    }
    return errorIndicate;
    
};

errorRender = (errorObj) =>{
    let errorDiv = document.getElementById('errors');
    errorDiv.style.display = "block";
    for(let prop in errorObj){
        if(!(typeof errorObj[prop] == "boolean")){
            let errorMsg = "<p class = 'my-0 text-danger'>"+errorObj[prop]+"</p>";
            errorDiv.innerHTML += errorMsg;
        }
    }

    setTimeout(()=>{
        errorDiv.innerHTML = '';
    }, 2000);


};


sendRequest = (obj) =>{
    let jsonObj = JSON.stringify(obj);
    let testObj = {
        query:'my dog eats logs'
    }
    let poo = JSON.stringify(testObj);
    console.log(JSON.stringify(testObj))
    const xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:5000/";
    //console.log(jsonObj);
    xhr.open("GET",url);
    xhr.onload = (e) => {
        
           console.log(xhr.responseText);
        
    };
    
    xhr.send(poo);
};

solver.addEventListener("click", () => {
    const searchWords = document.getElementById('search-words');
    const imgDrop = document.getElementById('crossword-upload');
    const gridHeight = document.getElementById('g-height');
    const gridWidth = document.getElementById('g-width');

    let validity = checkValid(searchWords,gridHeight,gridWidth,imgDrop);
    if(validity.valid === false){
        errorRender(validity);   
    }else{
        let reader = new FileReader();
        let encodedImg = "";
        reader.onload = (e) =>{
            encodedImg = e.target.result;
            let reqObj = {
                gHeight: parseInt(gridHeight.value),
                gWidth: parseInt(gridWidth.value),
                search: searchWords.value.split(","),
                img : encodedImg
            };

            //console.log(reqObj);
            sendRequest(reqObj)
        }
        reader.readAsDataURL(imgDrop.files[0]);
    }
});

