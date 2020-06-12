import React, {useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    AsyncStorage,
    Image
} from 'react-native';
import axios from 'axios'
// for future AsyncStorage use :
// import AsyncStorage from '@react-native-community/async-storage'


function Login({navigation}) {

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    

        console.log(Email);

        return(
            
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <Text style = {styles.title}>This is Login screen</Text>
                </View>
                
                <View style = {styles.body}>
                    
                        <View style = {styles.inputContainer}>
                            <Text style = {styles.inputTitle}>Email</Text>
                            <TextInput
                                style = {styles.textInput}
                                placeholder = 'Email'
                                onChangeText={setEmail}
                                value={Email}
                                />
                        </View>
        
                        <View style = {styles.inputContainer}>
                            <Text style = {styles.inputTitle}>Password</Text>
                            <TextInput
                                style = {styles.textInput}
                                placeholder = 'Password'
                                onChangeText={setPassword}
                                value={Password}
                                />
                        </View>
       
                        <TouchableOpacity   style = {styles.loginButton}
                                            onPress = {() => {
                                                const dataInput = {
                                                    email: Email,
                                                    password: Password
                                                }

                                                axios.post("https://yub-chat.herokuapp.com/api/login", dataInput)
                                                        .then((response)=> {console.log(response);
                                                            AsyncStorage.setItem('Token', response.data.token);
                                                            if(response.status==200){
                                                                navigation.navigate('Chat')
                                                            }
                                                        })
                                                        .catch(err=>{ console.log(err)})
                                                        
                                                        }}
                                                >
                            <Text style = {styles.loginButtonText}>Log in</Text>
                        </TouchableOpacity>

                        <View>
                            <Text>If you don't have an account please
                                
                                <Text   style = {styles.registerText} 
                                        onPress = {() => navigation.navigate('Register')}> register</Text>
                            </Text>
                        </View>
                </View>
                
            </View>
        )
    }
 
export default Login;

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    header : {
        flex : 1,
        backgroundColor : '#0165df',
        alignItems : 'center',
        justifyContent :'center'
    },
    title : {
        fontSize:26,
        color : 'white',
        fontWeight : 'bold'
    },
    body : {
        flex : 8,
        paddingVertical: 20,
        backgroundColor : 'white'
    },
    textInput : {
        height : 45,
        borderWidth : 1,
        borderColor : '#0165df',
        borderRadius : 10,
        width : 275,
        alignSelf :'center',
        fontSize : 15
    },
    inputContainer : {
        height : 100,
        width : 250,
        alignSelf :'center'
    },
    inputTitle : {
        fontSize : 17,
        fontWeight:'bold',
        color : '#0165df'
    },
    loginButton : {
        alignItems : 'center',
        width : 200,
        alignSelf : 'center',
        height : 50,
        backgroundColor : '#0165df',
        justifyContent : 'center',
        marginVertical: 40,
        borderRadius : 50
    },
    loginButtonText : {
        fontWeight : 'bold',
        fontSize : 19,
        color : 'white'
    },
    registerText : {
        fontWeight : 'bold',
        color : '#0165df',
        fontSize : 17
    },
    
}
)