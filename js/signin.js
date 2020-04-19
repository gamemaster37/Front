function signin(user) {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(user).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            firebase.auth().currentUser.getIdToken().then(function(idToken) {
                localStorage.auth = idToken;
                localStorage.uid = firebase.auth().currentUser.uid;

                uid = firebase.auth().currentUser.uid;
                firebase.database().ref("users/" + uid).update({
                    "name": $("#nameUser").val(),
                    "status": "0",
                    "uid": uid,
                    "challenge": false,
                    "statusChallenge": false
                });
            });
            window.location = "triqui.html";
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Usuario y/o contraseña son incorrectos',
            });
        }
    });
}