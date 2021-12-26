import React, { useLayoutEffect, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import { signOut } from "firebase/auth";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Input, Button } from 'react-native-elements';
import { auth, db } from '../config/firebase';
import { getAllUsers, getRoomInfo, sendMessagetoDb, getCurrentUserId } from '../config/firebase'
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from '../store/chat/actions/chatAction';
import { getFirestore, query, collection } from "firebase/firestore"
import moment from "moment";


const ChatScreen2 = ({route, navigation}) => {



    var width = Dimensions.get('window').width*0.9; //full width
    var height = Dimensions.get('window').height*0.8; //full height
    const db = getFirestore();


    const  { userId, userName } = route.params
    // here userId is our roomId
 
    const [users, setUsers] = useState([])
    const [roomData, setRoomData] = useState()
    const [text, setText] = useState('')
    const [chatData, setChatData] = useState([])


    const currentMessages = useSelector(state => state.chatReducer.messages)
    console.log('messages from chatroom -->', currentMessages)
    // setChatData(() => chatData)
    
    
    const dispatch = useDispatch()
    const sendMessagesToRedux = (userId) => {
        console.log('roomid from dispatch -->', userId)
        dispatch(getMessages(userId))
    }
      

     
    useEffect(async() => {
        // try {
        //     const q = query(collection(db, "chatrooms", userId, "messages"), orderBy('createdAt', 'asc'));
      
        //     onSnapshot(q, (querySnapshot) => {
        //       const copyDataArray = [];
        //       querySnapshot.forEach((doc) => {
        //         copyDataArray.push(doc.data());
        //       });
        //       console.log("copyDataArray: ", copyDataArray);
        //       setChatData(copyDataArray)
        //       dispatch(getMessages(copyDataArray))
        //     });
        //   }
        //   catch (error) {
        //     console.log("Chat realtime error", error)
        //   }

        const allUsers = await getAllUsers();
        console.log('all users from firebase -->', allUsers)
        setUsers(allUsers)
        
        await RoomInfo();
        sendMessagesToRedux(userId)
        
        // setChatData(allMessages) 
        // console.log('all chats -->', chatData)

        //Calling all chats from redux

    }, [])

    const RoomInfo = async () =>{
        try{
            const room = await getRoomInfo(userId)
            console.log('room id ==>', userId)
            console.log('room info from chat -->', room )
            setRoomData(room)
        }catch(e) {
            console.log('error --> ', e )
        }
    }
    



    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.replace('Login')
          }).catch((error) => {
            // An error happened.
          });
    }


    const sendMessage = async () => {
        
        console.log('text from sendMessage --> ', text)
        console.log('roomid from sendMessage --> ', userId)
        setText('')
     await sendMessagetoDb(text, userId) 
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            // headerLeft: () => (
            //     <View style={{marginLeft:20}}>
            //         <Avatar
            //         rounded
            //         source={{
            //             uri: auth?.currentUser?.photoURL
            //         }}>

            //         </Avatar>
            //     </View>
            // ),
            headerRight: () => (
                <TouchableOpacity style={{marginRight:30}}
                onPress={logOut}>
                    <AntDesign name="logout" size={14} color="black" />
                </TouchableOpacity>
            )
        })

    }, [])

    
    return (
       <> 
       
       {/* <TouchableOpacity 
       style={styles.button}
       onPress={() => navigation.goBack()}
       >
           <Text style={styles.btnText}>Go back</Text>
       </TouchableOpacity> */}

        <ScrollView style={{flex:1, }}>
           
            <View style={styles.chatList}>
                {currentMessages == null ?
                console.log('no data found')
                :
                currentMessages.map(message=>{
                    const isCurrentUserMessage =  message.userId === getCurrentUserId()
                    return <View style={{
                        alignItems: isCurrentUserMessage ? 'flex-end' : 'flex-start',
                        fontSize:20,
                        borderRadius:10,
                        width: width,
                        marginVertical:5,
                        
                        }}>
                        <View style={{
                            backgroundColor: isCurrentUserMessage ? '#5c5c5c' : '#ececec',
                            padding:10,
                            borderRadius:10,
                            maxWidth:250
                        }}>    
                        {/* <Text  style={styles.chatinfo}>{message.userId}</Text> */}
                            <Text style={{
                                marginTop:10,
                                color: isCurrentUserMessage ? '#fff' : '#000',
                                fontSize:18,
                                fontWeight:'bold'
                            }}>{message.text}</Text>
                            <Text style={{
                                color: isCurrentUserMessage ? '#d9d9d9' : '#727272',
                                fontSize:12,
                                textAlign:'right'
                            }}>{moment(message.createdAt).format("HH:MM:SS")}</Text>
                        </View>
                    </View>
                })}
            </View>
             {/* <Text>Chat Screen</Text> */}
             
            {/* <Text>{JSON.stringify(userId)}</Text>
            <Text>{JSON.stringify(userName)}</Text> */}
          
        </ScrollView>
          <View style={styles.bottomView}>
          <Input
           placeholder="Type your text here..."
           leftIcon={{type:'material', name: 'message'}}
           onChangeText={text => setText(text)}
           />
           <TouchableOpacity style={styles.button} onPress={sendMessage}>
               <Text style={styles.btnText} >Send</Text>    
           </TouchableOpacity>
           </View>
        </>   
        
    )
}

export default ChatScreen2


const styles = StyleSheet.create({
    bottomView: {
        width: '100%',
        height: 150,
        paddingBottom:10,
        backgroundColor:'#fff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
      },
    button:{
        width: 200,
        backgroundColor: '#000',
        padding:10,
        alignItems:'center',
        textAlign:'center'
    },
    btnText: {
        color:'#fff',
        textAlign:'center'
    },
    container: {
        flex:1,
        alignItems:'center',
        padding: 10
    },
    userList: {
        alignItems:'center',
        padding: 10,
        backgroundColor:'#fff',
        marginTop:10
    },
    user: {
        fontSize:20,
        marginHorizontal:10,
        color:'#000',
        borderRadius:5
    },
    chatList: {
        
        alignItems:'center',
        padding: 10,
        marginTop:10,
        paddingBottom:150,

        // height: 500
        
    },
    chat: {
        backgroundColor:'#fff',
        fontSize:20,
        marginVertical:10,
        marginHorizontal:10,
        padding:10,
        color:'#000',
        borderRadius:10
    },
    chatinfo: {
        color:'#000',
        fontSize:16
    },
    message: {
        marginTop:10,
        color:'#000',
        fontSize:18,
        fontWeight:'bold'
    },
    timestamp: {
        color:'#727272',
        fontSize:12,
        textAlign:'right'
    }

})
