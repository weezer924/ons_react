import firebase from 'firebase/app'

const firebaseConfig = {
	apiKey: '',
	authDomain: '',
	databaseURL: '',
	projectId: '',
	storageBucket: '',
	messagingSenderId: '',
	appId: ''
}

try {
  firebase.initializeApp(firebaseConfig)
} catch (error) {
  console.log(error.message)
}
