function addQuestion (question) {
    var uid=localStorage['uid']
    firebase.database().ref("Company/" + uid+"/questions").set(question);
}