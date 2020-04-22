async function getEmployees() {
  // Find all dinosaurs whose height is exactly 25 meters.
  var ref = await firebase.database().ref("Employee");
  let results = await new Promise((resolve, reject) =>
    ref
      .orderByChild("company")
      .equalTo(localStorage["uid"])
      .once("value")
      .then(function (results, err) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
  );
  return results;
}

function newEmployee(mail, password, company) {
  event.preventDefault();
  var aux = true;
  secondaryApp
    .auth()
    .createUserWithEmailAndPassword(mail, password)
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      Swal.fire({
        icon: "error",
        title: errorMessage,
      });
      aux = false;
    })
    .then(() => {
      // autenticacion con firebase
      if (aux) {
        secondaryApp.auth().onAuthStateChanged(function (user) {
          if (user) {
            var uid = localStorage["uid"];
            var suid = secondaryApp.auth().currentUser.uid;
            firebase
              .database()
              .ref("Employee/" + suid)
              .set(
                Object.fromEntries(Object.entries({ company: uid, ...company }))
              )
              .then(function () {
                Swal.fire({
                  icon: "success",
                  title: "usuario registrado",
                }).then(function () {
                  window.location = "list.html";
                });
              });
          }
        });
      }
    });
}

function disableEmp(uid) {
  const disableurs = firebase.functions().httpsCallable('disableUsr');
  disableurs({uid:uid}).then(result=>{
      console.log(result);
  });

}

function enableEmp(uid) {
  const disableurs = firebase.functions().httpsCallable('enableUsr');
  disableurs({uid:uid}).then(result=>{
      console.log(result);
  });
}

function deleteEmpl(uid) {
  firebase
    .database()
    .ref("Employee/" + uid).set(null).then(function () {
      const deleteurs = firebase.functions().httpsCallable('deleteUsr');
      deleteurs({ uid: uid }).then(result => {
        console.log(result);
        window.location = "list.html"
      });
    });

}

function updateEmployee(suid, company) {
  event.preventDefault();
  firebase
    .database()
    .ref("Employee/" + suid)
    .update(Object.fromEntries(Object.entries({ company })))
    .then(function () {
      Swal.fire({
        icon: "success",
        title: "usuario registrado",
      }).then(function () {
        window.location = "list.html";
      });
    });
}
