function submitData(){
    var d = new Date();
    var n = d.getTime();
    var imgFile = document.getElementById("Img").files[0];
    if(imgFile !== undefined){
        var imgName = n+imgFile.name;
        var NickName = document.getElementById("NickName").value;
        var Education = document.getElementById("Education").value;
        var Detail = document.getElementById("Detail").value;
        var Teaching = document.getElementById("Teaching").value;
        var Subject = document.getElementById("Subject").value;
        var databaseRef = firebase.database().ref().child("Tutors");
        var storageRef = firebase.storage().ref('/images/'+imgName);
        var uploadTask = storageRef.put(imgFile);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,function progress(snapshot) {
            var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            
        },function error(err){
            alert("Add Tutor Fail");
        },function complete(){
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                databaseRef.push({
                    nickName:NickName,
                    Education:Education,
                    Detail:Detail,
                    Teaching:Teaching,
                    Subject:Subject,
                    img:downloadURL,
                    imgName:imgName
                });
                alert("Add Tutor Success");
                window.location.href = "tutor.html";
              });
        });
    }else{
        alert("Error")
    }
}

function LoadImg(event){
    if(event.target.files.length >  0){
        var src = URL.createObjectURL(event.target.files[0]);
        var preview = document.getElementById("Show");
        preview.src = src;
        preview.style.display = 'block';
    }
}

function removeTutor(e){
    var firebaseRef = firebase.database().ref("Tutors");
    var storageRef = firebase.storage().ref();
    firebaseRef.once('value').then(function(dataSnapshot){
        dataSnapshot.forEach(data =>{
          if(data.key === e){
                var val = data.val();
                var desertRef = storageRef.child('/images/'+val.imgName);
                desertRef.delete().then(function() {
                    firebaseRef.child(e).remove();
                    alert("Remove "+e+" success");
                    window.location.href = "tutor.html";
                }).catch(function(error) {

                });
          }
        })
      });
}

function updateTutor(){
    var d = new Date();
    var n = d.getTime();
    var ID = document.getElementById("ID").value;
    var imgFile = document.getElementById("ImgE").files[0];
    var firebaseRef = firebase.database().ref("Tutors");
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
        var NickName = document.getElementById("NickNameE").value;
        var Education = document.getElementById("EducationE").value;
        var Detail = document.getElementById("DetailE").value;
        var Teaching = document.getElementById("TeachingE").value;
        var Subject = document.getElementById("SubjectE").value;
        var databaseRef = firebase.database().ref().child("Tutors");
        var storageRef = firebase.storage().ref('/images/'+imgName);
        var uploadTask = storageRef.put(imgFile);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,function progress(snapshot) {
            var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            
        },function error(err){
            alert("Add Tutor Fail");
        },function complete(){
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                databaseRef.child(ID).set({
                    nickName:NickName,
                    Education:Education,
                    Detail:Detail,
                    Teaching:Teaching,
                    Subject:Subject,
                    img:downloadURL,
                    imgName:imgName
                });
                alert("Edit Tutor Success");
                window.location.href = "tutor.html";
              });
        });
    }else{
        firebaseRef.once('value').then(function(dataSnapshot){
            dataSnapshot.forEach(data =>{
              if(data.key === ID){
                    var val = data.val();
                    var NickName = document.getElementById("NickNameE").value;
                    var Education = document.getElementById("EducationE").value;
                    var Detail = document.getElementById("DetailE").value;
                    var Teaching = document.getElementById("TeachingE").value;
                    var Subject = document.getElementById("SubjectE").value;
                    var databaseRef = firebase.database().ref().child("Tutors");
                    databaseRef.child(ID).set({
                        nickName:NickName,
                        Education:Education,
                        Detail:Detail,
                        Teaching:Teaching,
                        Subject:Subject,
                        img:val.img,
                        imgName:val.imgName
                    });
                    alert("Edit Tutor Success");
                    window.location.href = "tutor.html";
              }
            })
        });
    }
}

