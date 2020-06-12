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
import { create } from 'react-test-renderer';



function Splash({navigation}) {

    AsyncStorage.getItem('Token')
    .then(res => {

            console.log(res);

            axios.get('https://yub-chat.herokuapp.com/api/user-profil', {
                headers: {
                    "Authorization": `Bearer ${res}`
                }
            })

                .then((res) => {

                    console.log(res.data.status);

                    if(res.data.status){
                        navigation.navigate('Login')
                    }else{
                        navigation.navigate('Chat')
                    }

                })

                .catch(err => console.log(err))
    })
    return (
        <View style={styles.container}>
            <Image 
                source={require('../pics/logo.jpeg')} 
                style={styles.img}
                />
        </View>
    )
    

}

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: '80%',
        resizeMode: 'contain'
    }
})