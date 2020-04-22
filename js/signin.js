function signin(userio) {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(userio.mail, userio.password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        Swal.fire({
            icon: 'error',
            title: errorMessage,
        });
    })
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            firebase.auth().currentUser.getIdToken().then(function (idToken) {
                localStorage.uid = firebase.auth().currentUser.uid;
                uid = firebase.auth().currentUser.uid;
                Swal.fire({
                    icon: 'success',
                    title: 'usuario registrado, ya puede ingresar',
                }).then(function () { window.location = "list.html"; });
            });
        }
    });
}