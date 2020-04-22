const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.disableUsr = functions.https.onCall((data, context) => {
    return functions.app.admin.auth().updateUser(data.uid, { disabled: true }).then(() => {
        return {
            message: "Success! " + data.uid + " have been disabled"
        }
    }).catch(err => {
        return err;
    });
});

exports.enableUsr = functions.https.onCall((data, context) => {
    return functions.app.admin.auth().updateUser(data.uid, { disabled: false }).then(() => {
        return {
            message: "Success! " + data.uid + " have been enabled"
        }
    }).catch(err => {
        return err;
    });
});

exports.deleteUsr = functions.https.onCall((data, context) => {
    return functions.app.admin.auth().deleteUser(uid).then(() => {
        return {
            message: "Success! " + data.uid + " have been deleted"
        }
    }).catch(err => {
        return err;
    });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

