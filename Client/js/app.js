


function OpenModel(key){ 
    document.getElementById(key).style.display = "block";
}

function CloseModel(key){ 
    document.getElementById(key).style.display = "none";
}

window.onclick = function(e){
    if(e.target.className === "model"){
        e.target.style.display = "none";
    }
}