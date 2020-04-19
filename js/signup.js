function signup(company) {
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(company.mail, company.password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
    // autenticacion con firebase
    firebase.auth().signInWithEmailAndPassword(company.mail, company.password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            uid = firebase.auth().currentUser.uid;
            firebase.database().ref("Company/"+uid).set(Object.fromEntries(Object.entries(company)));
        }
    });
    Swal.fire({
        icon: 'success',
        title: 'usuario registrado, ya puede ingresar',
    });
}