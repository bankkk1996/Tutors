function loadimg(event){
    if(event.target.files.length >  0){
        var src = URL.createObjectURL(event.target.files[0]);
        var preview = document.getElementById("img-show");
        preview.src = src;
        preview.style.visibility = 'visible';
    }
}