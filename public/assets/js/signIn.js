function signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
        const user = result.user
        console.log('login success', user)
        window.location.href = "dashboard.html";
    })
    .catch(error => {
        console.log('login failed', error)
    })
}