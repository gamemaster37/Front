function addQuestion(question) {
  var uid = localStorage["uid"];
  firebase
    .database()
    .ref("Company/" + uid + "/questions")
    .set(question);
}

async function getQuestion() {
  // Find all dinosaurs whose height is exactly 25 meters.
  var company = await firebase
    .database()
    .ref("Employee/" + localStorage["uid"])
    .once("value");
  company = company.val()["company"];
  var questions = await firebase
    .database()
    .ref("Company/" + company)
    .once("value");
  questions = questions.val()["questions"];
  return questions;
}

function addAnswer(answer) {
  firebase
    .database()
    .ref("Employee/" + localStorage["uid"] + "/questionary")
    .set(answer)
    .then(function () {
      window.location = "test_r.html?uid=" + localStorage["uid"];
    });
}

async function getResults(uid) {
  var results = await firebase
    .database()
    .ref("Employee/" + uid + "/questionary")
    .once("value");
  results = results.val();
  return results;
}

async function deleteResults(uid) {
  var results = await firebase
    .database()
    .ref("Employee/" + uid + "/questionary");
  results = results.remove();
}

async function gestTest(uid) {
  // Find all dinosaurs whose height is exactly 25 meters.
  var employee = [];
  var company = await firebase.database().ref("Employee/");
  var answer = await company.orderByChild("questionary/date").once("value");
  await answer.forEach((ans) => {
    if (ans.val().questionary) {
      if (ans.val().company == uid) {
        employee.push({
          key: ans.key,
          ...ans.val(),
        });
      }
    }
  });
  return employee;
}

async function onTest(uid) {
  // Find all dinosaurs whose height is exactly 25 meters.
  var employee = [];
  var company = await firebase.database().ref("Employee/");
  var answer = await company
    .orderByChild("questionary/date")
    .on("child_changed", function () {
      console.log(message(uid));
    });
}
