import { db } from "../../../../config/firebase"
import { getFirestore, onSnapshot, setDoc, doc, addDoc, collection, query, getDocs, where, orderBy } from "firebase/firestore";

// const CONSTANTS = {
//         updateMessages: 'UPDATE_MESSAGES',
        
// }


const getMessages = (roomId) => {

    // console.log('getMessages action called ==>', roomId)
    return dispatch => {
        const q = query(collection(db, "chatrooms", roomId, "messages"), orderBy('createdAt', 'asc') );
        onSnapshot(q, snaps => {
         const messages = [];

            snaps.forEach(doc => {
            // Create an HTML entry for each document and add it to the chat
            const obj = {...doc.data(), id: doc.id}
            messages.push(obj)
          });

          dispatch({
              type: 'UPDATE_MESSAGES',
              data: messages
          })
        });
             
    }
}


export {
    getMessages,
    
}