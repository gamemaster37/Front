initApp = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            Swal.fire({
                icon: 'success',
                title: 'Singin In',
            }).then(()=>{window.location = "list.html";});  
        }
    }, function (error) {
        console.log(error);
    });
};
window.addEventListener('load', function () {
    initApp();
});