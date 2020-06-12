import React, {useState} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput
} from 'react-native';
import axios from 'axios'

function Register({navigation}) {

    const [Username, setUsername] = useState('');
    const [Phone, setPhone] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassw, setConfirmPassw] = useState('');

        return(
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <Text style = {styles.title}>This is Register screen</Text>
                </View>
                
                <View style = {styles.body}>
                <ScrollView> 
                        <View style = {styles.inputContainer}>
                            <Text style = {styles.inputTitle}>Username</Text>
                            <TextInput
                                style = {styles.textInput}
                                placeholder = 'Username'
                                onChangeText={setUsername}
                                value={Username}
                                />
                        </View>
                        <View style = {styles.inputContainer}>
                            <Text style = {styles.inputTitle}>Phone Number</Text>
                            <TextInput
                                style = {styles.textInput}
                                placeholder = 'Phone Number'
                                onChangeText={setPhone}
                                value={Phone}
                                />
                        </View>
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
                        <View style = {styles.inputContainer}>
                            <Text style = {styles.inputTitle}>Re-enter Password</Text>
                            <TextInput
                                style = {styles.textInput}
                                placeholder = 'Password'
                                onChangeText={setConfirmPassw}
                                value={ConfirmPassw}
                                />
                        </View>
                       
            

                        <TouchableOpacity   style = {styles.loginButton}
                                            onPress = {()=>{
                                                const dataInput = {
                                                    name:Username,
                                                    phone:Phone,
                                                    email:Email,
                                                    password:Password,
                                                    confirm_password:ConfirmPassw

                                                }
                                                axios.post('http://yub-chat.herokuapp.com/api/register', dataInput)
                                                .then((response)=>{console.log(response),
                                                    alert('Please Login', navigation.navigate('Login'))})
                                                .catch((error)=>console.log(error))
                                                }}
                                            >
                            <Text style = {styles.loginButtonText}>Register</Text>
                        </TouchableOpacity>

                        <View>
                            <Text>Already have an account? Please
                                <Text   style = {styles.loginText} 
                                        onPress = {() => navigation.navigate('Login')}
                                        > Log in</Text>
                            </Text>
                        </View>
                    </ScrollView>
                </View>
               
            </View>
        )
    }

export default Register;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white'
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
    loginText : {
        fontWeight : 'bold',
        color : '#0165df',
        fontSize : 17
    },
    
}
)