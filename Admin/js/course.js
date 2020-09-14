function submitData(){
    var d = new Date();
    var n = d.getTime();
    var imgFile = document.getElementById("img-file").files[0];
    if(imgFile !== undefined){
        var imgName = n+imgFile.name;
        var NameCourse = document.getElementById("NameCourse").value;
        var Course = document.getElementById("Course").value;
        var databaseRef = firebase.database().ref().child("Courses");
        var storageRef = firebase.storage().ref('/images/'+imgName);
        var uploadTask = storageRef.put(imgFile);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,function progress(snapshot) {
            var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            
        },function error(err){
            alert("Add Course Fail");
        },function complete(){
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                databaseRef.push({
                    NameCourse:NameCourse,
                    Course:Course,
                    img:downloadURL,
                    imgName:imgName
                });
                alert("Add Course Success");
                window.location.href = "course.html";
              });
        });
    }else{
        alert("Error")
    }
}

function loadimg(event){
    if(event.target.files.length >  0){
        var src = URL.createObjectURL(event.target.files[0]);
        var preview = document.getElementById("img-show");
        preview.src = src;
        preview.style.display = 'block';
    }
}

function removeCourse(e){
    var firebaseRef = firebase.database().ref("Courses");
    var storageRef = firebase.storage().ref();
    firebaseRef.once('value').then(function(dataSnapshot){
        dataSnapshot.forEach(data =>{
          if(data.key === e){
                var val = data.val();
                var desertRef = storageRef.child('/images/'+val.imgName);
                desertRef.delete().then(function() {
                    firebaseRef.child(e).remove();
                    alert("Remove "+e+" success");
                    window.location.href = "course.html";
                }).catch(function(error) {

                });
          }
        })
      });
}

function updateCourse(){
    var d = new Date();
    var n = d.getTime();
    var ID = document.getElementById("ID").value;
    var imgFile = document.getElementById("img-file").files[0];
    var firebaseRef = firebase.database().ref("Courses");
    var NameCourse = document.getElementById("NameCourse").value;
    var Course = document.getElementById("Course").value;
    if(imgFile !== undefined){
        firebaseRef.once('value').then(function(dataSnapshot){
            dataSnapshot.forEach(data =>{
              if(data.key === ID){
                    var val = data.val();
                    var desertRef = storageRef.child('/images/'+val.imgName);
                    desertRef.delete().then(function() {
                      }).catch(function(error) {
                      });
              }
            })
          });
        var imgName = n+imgFile.name;
        
        var databaseRef = firebase.database().ref().child("Courses");
        var storageRef = firebase.storage().ref('/images/'+imgName);
        var uploadTask = storageRef.put(imgFile);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,function progress(snapshot) {
            var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            
        },function error(err){
            alert("Edit Course Fail");
        },function complete(){
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                databaseRef.child(ID).set({
                    NameCourse:NameCourse,
                    Course:Course,
                    img:downloadURL,
                    imgName:imgName
                });
                alert("Edit Course Success");
                window.location.href = "course.html";
              });
        });
    }else{
        firebaseRef.once('value').then(function(dataSnapshot){
            dataSnapshot.forEach(data =>{
              if(data.key === ID){
                    var val = data.val();
                    var databaseRef = firebase.database().ref().child("Courses");
                    databaseRef.child(ID).set({
                        NameCourse:NameCourse,
                    Course:Course,
                        img:val.img,
                        imgName:val.imgName
                    });
                    alert("Edit Course Success");
                    window.location.href = "course.html";
              }
            })
        });
    }
}