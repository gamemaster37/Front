function newU(mail, password) {
    event.preventDefault();
    secondaryApp.auth().createUserWithEmailAndPassword(mail, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        Swal.fire({
            icon: 'error',
            title: errorMessage,
        });
    })
}