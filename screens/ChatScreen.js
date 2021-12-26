import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { signOut } from "firebase/auth";
import { auth, db } from '../config/firebase';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat'
import { getDatabase, ref, child, onValue, get, query, orderByChild,
     doc, setDoc, onSnapshot, orderBy, limit, limitToLast, 
     limitToFirst, collection, getDocs, snapshotEqual  } 
     from "firebase/firestore"; 

const ChatScreen = ({navigation}) => {

    const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //   setMessages([
    //     {
    //       _id: 1,
    //       text: 'Hello developer',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,z
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    //   ])
    // }, [])

    // useLayoutEffect(() => {
    //     // const q = query(collection(db, "chats", "chatRoom"));
    //     const unsubscribe = onSnapshot(doc(db, "chats", "chatRoom"), (snapshot) => setMessages(
    //         snapshot.docs.map(doc => ({
    //     _id: doc.data()._id,
    //     createdAt: doc.data().createdAt.toDate(),
    //     text: doc.data().text,
    //     user: doc.data().user,
    //     }))
    //     ));
    //     const q = query(collection(db, "chats", "chatRoom"));
    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //     const allChats = [];
    //     querySnapshot.forEach((doc) => {
    //         allChats.push(doc.data().name);
    //     });
    //     console.log("Current cities in CA: ", cities.join(", "));
    //     });
    //     return unsubscribe;
    //     }, [])
  
    // const  onSend =  useCallback((messages = []) => {
    //   setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    //   const {
    //       _id,
    //       createdAt,
    //       text,
    //       user
    //   } = messages[0]
    //   setDoc(doc(db,'chats', 'chatRoom'), {
          
    //     id: _id,
    //     time: createdAt,
    //     message: text,
    //     user: user
    //   })
    // }, [])
  

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{marginLeft:20}}>
                    <Avatar
                    rounded
                    source={{
                        uri: auth?.currentUser?.photoURL
                    }}>

                    </Avatar>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={{marginRight:30}}
                onPress={logOut}>
                    <AntDesign name="logout" size={14} color="black" />
                </TouchableOpacity>
            )
        })

    }, [])
    
    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.replace('Login')
          }).catch((error) => {
            // An error happened.
          });
    }

    return (
        <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        //setting id to be current user's email id
        user={{
          _id: auth?.currentUser?.email,
          name: auth?.currentUser?.displayName,
          avatar: auth?.currentUser?.photoURL
        }}
      />
    )
}

export default ChatScreen
