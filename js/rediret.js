async function initApp() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      Swal.fire({
        icon: 'success',
        title: 'Singin In',
      }).then(() => {
        retu()
      });
    }
  }, function (error) {
    console.log(error);
  });
};
async function retu() {
  var is = await isEmployee();
  if (is) {
    var redic = "?uid=" + localStorage.uid;
    window.location = "test.html" + redic;
  } else { window.location = "list.html"; }
}

async function isEmployee() {
  // Find all dinosaurs whose height is exactly 25 meters.
  var ref = await firebase.database().ref("Employee/");
  var result = false;
  await ref.once("value")
    .then(function (results, err) {
      Object.entries(results.val()).forEach(element => {
          console.log(element)
        if (element[0] == localStorage["uid"]) {
            result = true
          }
      });;
    })
  return result;
}

async function getCompany() {
    // Find all dinosaurs whose height is exactly 25 meters.
    var ref = await firebase.database().ref("Company/");
    var result = "";
    await ref.once("value")
      .then(function (results, err) {
       Object.entries(results.val()).forEach(element => {
          if (element[0] == localStorage["uid"]) {
              result = element[1]
            }
        });;
      })
    return result;
  }