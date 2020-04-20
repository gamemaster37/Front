// var answer = {
//     answer : [4,2,1,3,1],
//     grade : 100
// }
function addAnswer(answer) {
    firebase
    .database()
    .ref("Employee/" + uid + "/questionary")
    .set(answer);
}