import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { auth, db} from '../config/firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { registerUser } from '../config/firebase';

const RegisterScreen = ({navigation}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [imageURL, setImageURL] = useState('')


    const signUp = async () => {
        try{
            await registerUser( { name, email, imageURL, password } )
            alert('Account created successfully');
            // navigation.popTotop();
        }
        catch (e) {
            alert(e.message);
        }
    }

    return (
        <View style={styles.container}>
            <Input
            placeholder="Enter your name"
            label="Name"
            leftIcon={{type:'material', name: 'badge'}}
            value={name}
            onChangeText={text => setName(text)}
            />
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
            <Input
            placeholder="Enter your image URL"
            label="Profile Picture"
            leftIcon={{type:'material', name: 'face'}}
            value={imageURL}
            onChangeText={text => setImageURL(text)}
            
            />

            
            <TouchableOpacity style={styles.button}>
                <Text style={styles.btnText} onPress={signUp}>Register</Text>    
            </TouchableOpacity>
        </View>
    )
}

export default RegisterScreen

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
