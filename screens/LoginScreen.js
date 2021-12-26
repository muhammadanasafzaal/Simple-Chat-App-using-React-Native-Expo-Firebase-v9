import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword  } from "firebase/auth";

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }

    //go to chat screen upon user login
    useEffect(() => {
        // const unsubscribe = auth.onAuthStateChanged;
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace('Users')

            } else {
              // User is signed out
              // ...
            }
          });

          return onAuthStateChanged
    }, [])

    return (
        <View style={styles.container}>
            <Input
            placeholder="Enter your email"
            label="Email"
            leftIcon={{type:'material', name: 'email'}}
            value={email}
            onChangeText={text => setEmail(text)}
            />
             <Input
            placeholder="Enter your password"
            label="Password"
            leftIcon={{type:'material', name: 'lock'}}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={signIn}>
                <Text style={styles.btnText}>Sign-in</Text>    
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Register')}>
                <Text style={styles.btnText}>Register</Text>    
            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen

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
    }
})
