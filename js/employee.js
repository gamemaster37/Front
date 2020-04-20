function newEmployee(mail, password, company) {
    event.preventDefault();
    var aux=true
    secondaryApp.auth().createUserWithEmailAndPassword(mail, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        Swal.fire({
            icon: 'error',
            title: errorMessage,
        });
        aux=false
    }).then(() => {
        // autenticacion con firebase
        if (aux) {
            secondaryApp.auth().onAuthStateChanged(function (user) {
                if (user) {
                    var uid = localStorage['uid'];
                    var suid = secondaryApp.auth().currentUser.uid;
                    firebase.database().ref("Employee/"+suid).set(Object.fromEntries(Object.entries(
                        {company:uid,
                            ...company
                        }
                        )));
                    Swal.fire({
                        icon: 'success',
                        title: 'usuario registrado',
                    }).then(function(){window.location = "list.html";});
                }
            });
        }
    });
}