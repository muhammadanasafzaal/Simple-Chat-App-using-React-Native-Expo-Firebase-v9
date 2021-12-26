// import * as firebase from 'firebase';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { getDatabase, ref, child, onValue, get, collection, query, where, orderByChild,
  doc, setDoc, onSnapshot, orderBy, limit, limitToLast, 
  limitToFirst, getDocs, getDoc, snapshotEqual, addDoc, updateDoc } from "firebase/firestore";
 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjU-JckXjUmfVGKMg_9MSpyjrOWJW3H28",
  authDomain: "chat-app-b42e2.firebaseapp.com",
  projectId: "chat-app-b42e2",
  storageBucket: "chat-app-b42e2.appspot.com",
  messagingSenderId: "240831487455",
  appId: "1:240831487455:web:c37273fc9d38a43d3f386a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// if (firebase.apps.length === 0) {
//     app = firebase.initializeApp(firebaseConfig)
// }
// else {
//     app = firebase.app()
// }

const db = getFirestore();
const auth = getAuth();
// const app = initializeApp(firebaseConfig);


const registerUser = async (authParams) => {
  const { name, email, imageURL, password } = authParams
  
  const { user: { uid }} = await createUserWithEmailAndPassword(auth, email, password)
  await setDoc(doc(db, 'user', uid), {
    name, 
    email,
    imageURL
  })
}

async function getAllUsers() {
  const q = query(collection(db, "user"))
  const querySnapshot = await getDocs(q)
  const currentUsers = []
  querySnapshot.forEach(doc => {
    currentUsers.push({...doc.data(), id: doc.id})
  })
  return currentUsers
}

// const friendId = 'someId'
// const users = {[friend]: true} // to make value of a variable a key of obj
const checkAndCreateRoom = async (friendId) =>{
  return new Promise( async (resolve, reject)  =>  {
     //making both users key of an obj to apply queries on them 
      const currentUserId = auth.currentUser.uid
      const users = {[friendId]: true, [currentUserId]: true}; 
      console.log('users ==>', users)

      //create chatroom for whose friendid and user id are now true
      const q = query(collection(db, "chatrooms"), where(`users.${friendId}`, "==", true) ,where(`users.${currentUserId}`, 
      "==", true))
      const querySnapshot = await getDocs(q);
      let room = {};
      querySnapshot.forEach((doc) => {
        
        // doc.data() is never undefined for query doc snapshots
        
        // console.log('roomss ==>', doc.data());

        //doc.data only gets field values
        room = doc.data()
        //adding doc.id to the room object that already has doc field values
        room.id = doc.id
        console.log('rooms ==>', room);
      });

      if(!room.id){
          room = {
            users,
            createdAt: Date.now(),
            lastMessage: {},
          }
          await addDoc(collection(db, "chatrooms"), room ), {
            room: room.id 
            
          }

          console.log('new room -->',room)
          // const docRef = doc(db, "chatrooms", room);
          // const docSnap = await getDoc(docRef);

          // if (docSnap.exists()) {
          //   console.log("Room data:", docSnap.data());
          // } else {
          //   // doc.data() will be undefined in this case
          //   console.log("No such document!");
          // }
          // room.id
        //   await updateDoc(doc(db, "chatrooms"), {
        //     id: room.id
        // });
          // console.log('room id',room.id)
          // resolve(room);
      }
      else  {
        resolve(room)
      }
      // const docRef = await addDoc(collection(db, "chatrooms"), {
      //   users,
      //   createdAt: Date.now(),
      //   lastMessage: {}
        
      // });
      // console.log("Document written with ID: ", docRef.id);
  }) 
 
}

// async function getRoomInfo(id) {
//   const q = query(collection(db, "chatrooms", id))
//   const querySnapshot = await getDocs(q)
//   const currentRooms = []
//   querySnapshot.forEach(snapshot => {
//     currentRooms.push({...snapshot.data(), id: snapshot.id})
//   })
//   console.log('currentRooms -->', currentRooms)
//   return currentRooms
// }

async function getRoomInfo(roomId) {

  const docRef = doc(db, "chatrooms", roomId);
  const docSnap = await getDoc(docRef);
  console.log('room id from chat-->', roomId)
  console.log("doc id -->", doc.id)
  return { id: roomId, ...docSnap.data() }
}

const sendMessagetoDb = async (text, roomId) => {
  console.log('texts from firebase ==>', text)
  console.log('roomid from firebase ==>', roomId)
  const d = new Date();
  let hour = d.getHours();
  const message = { text, createdAt: Date.now(), userId: auth.currentUser.uid }
  // const message = { text, createdAt: hour, userId: auth.currentUser.uid }
  await addDoc(collection(db, "chatrooms", roomId, "messages"), message )
}

const getCurrentUserId = () => {
  return auth.currentUser.uid
}

export { db, auth, registerUser, getAllUsers, checkAndCreateRoom, getRoomInfo, sendMessagetoDb, getCurrentUserId }; 