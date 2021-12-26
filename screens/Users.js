import React, { useLayoutEffect, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import { signOut } from "firebase/auth";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { auth, db } from '../config/firebase';
import { getAllUsers, checkAndCreateRoom } from '../config/firebase'

const Users = ({navigation}) => {

    const [users, setUsers] = useState([])

    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.replace('Login')
          }).catch((error) => {
            // An error happened.
          });
    }
    const gotoChat = async (item) => {
        
        const { id, name } = item
        const room = await checkAndCreateRoom(id);
        console.log('room ==>', room)
        // console.log('id from user comp -->', id)
        navigation.navigate('Chat', {
            userId: room.id,
            userName: name
        })
    }

    useEffect(async() => {
        const allUsers = await getAllUsers();
        console.log('all users from firebase -->', allUsers)
        setUsers(allUsers)
    }, [])

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
        <ScrollView style={{flex:1, }}>
            {/* <Text>Chat Screen</Text> */}
            <View style={styles.userList}>
            {users.map(item => {
              return <> 
                    {/* <Image src={item.imageUrl} /> */}
                    <Text style={styles.user} onPress={()=> gotoChat(item)}>{item.name}</Text>
                </>
            })}
            </View>
        </ScrollView >
    )
}

export default Users


const styles = StyleSheet.create({
    button:{
        width: 200,
        marginTop: 20,
        backgroundColor: '#000',
        padding:10
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
        padding: 10,
        marginTop:20,
                
    },
    user: {
        fontSize:20,
        marginVertical:10,
        color:'#000',
        borderRadius:5,
        textAlign:'center',
        backgroundColor:'#fff',
        paddingVertical:10
    }

})
