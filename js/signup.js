function signup(mail, password, company) {
    event.preventDefault();
    var aux=true
    firebase.auth().createUserWithEmailAndPassword(mail, password).catch(function (error) {
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
            firebase.auth().signInWithEmailAndPassword(mail, password).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    uid = firebase.auth().currentUser.uid;
                    firebase.database().ref("Company/" + uid).set(Object.fromEntries(Object.entries(company)));
                    Swal.fire({
                        icon: 'success',
                        title: 'usuario registrado, ya puede ingresar',
                    }).then(function(){window.location = "list.html";});
                }
               
            });
        }
    });
}