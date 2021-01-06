

var scroll = window.requestAnimationFrame || function(callback){
    window.setTimeout(callback,1000/60)
};

var elementsToShow = document.querySelectorAll('.show-on-scroll');
function loop(){
    elementsToShow.forEach(function(element){
        if(isElementInViewport(element)){
            element.classList.add('fade-in');
        }else{
            element.classList.remove('fade-in');
        }
    });
    scroll(loop);
}
function isElementInViewport(el){
    if(typeof jQuery === "function" && el instanceof jQuery){
        el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return ((rect.top<=0 
            && rect.bottom >=0)
            ||
            (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight)&&rect.top <=(window.innerHeight || document.documentElement.clientHeight)) 
            || 
            (rect.top>=0&&rect.bottom <=(window.innerHeight || document.documentElement.clientHeight))
            );
}
loop();

function Popup(e){
    console.log(document.getElementById(e).style.display);
    if(document.getElementById(e).style.display==="flex"){
        document.getElementById(e).style.opacity = 0;
        document.getElementById(e).style.display = "none";
    }else{
        document.getElementById(e).style.display = "flex";
        document.getElementById(e).style.opacity = 1;
    }
    
}

window.onclick = function(e){
    if(e.target.className === "popup"){
        e.target.style.display = "none";
    }
}
