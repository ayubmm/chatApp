import React, {useState, useEffect} from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
    ScrollView,
    Alert
} from 'react-native';
import axios from 'axios'
import ChatBubble from './chatBubble'


function ChatProf(props) {

    const [Pesan, setPesan] = useState([]);
    const ID = props.route.params.user_id;
    const NAME = props.route.params.user_name;
    const [Chat, setChat] = useState('');
    const [Update, setUpdate] = useState(true)
    
    useEffect(() => {
        
        AsyncStorage.getItem('Token').then(res=> {

            axios.get(`https://yub-chat.herokuapp.com/api/pesan/${ID}`, {
                headers: {
                    "Authorization": `Bearer ${res}`
                }
            }
            )
            .then((res) => {
                let Messages = res.data;
                console.log(Messages)
                const MessagesArr = Array.from(Object.keys(Messages), k=>[`${k}`, Messages[k]]);
                // console.log(MessagesArr[10][1].pesan);
                
                // looping array pertama 
                for (let x = 0; x< MessagesArr.length;x++){
                    // console.log("test "+x)
                    // console.log(MessagesArr[x][1].pesan)
                    Pesan.push(MessagesArr[x][1])
                }

                setPesan(Pesan)
                console.log(Pesan)

                Pesan.sort((a, b) => {return a.id-b.id});
                console.log(Pesan)
    
                let renderedPesan = Pesan.map((item, index) => {
                                    
                    if(item.pesan!=null && item.from_id!==ID) {
                        return (
                            <View   style={{
                                        right: 5,
                                        marginVertical: 3,
                                        width: '100%',
                                        flexDirection: 'row-reverse'
                            }}
                                    key = {item.id}
                            >
                                <TouchableOpacity
                                    style={{ 
                                        width: '50%',
                                        minHeight: 35,
                                        padding: 3,
                                        borderRadius: 10,
                                        paddingHorizontal: 30,
                                        elevation: 2,
                                        justifyContent: 'center',
                                        backgroundColor: '#0095ff'
                                    }}
                                    onLongPress={() => {
                                        Alert.alert(
                                            "Delete Message?",
                                            "Are you sure you want to delete this message",
                                            [
                                                {
                                                text: "Cancel",
                                                onPress: () => console.log("Cancel Pressed"),
                                                style: "cancel"
                                                },
                                                { text: "OK",
                                                onPress: () => {
                                                            console.log("OK Pressed");
                                                            AsyncStorage.getItem('Token').then(res=> {
                                                            
                                                                axios.delete(`https://yub-chat.herokuapp.com/api/pesan/${item.id}`, {
                                                                    headers: {
                                                                        "Authorization": `Bearer ${res}`
                                                                    }
                                                                })
                                                                .then(res => console.log(res))
                                                                .catch(err => console.log(err))
                                                            })
                                                        }
                                                }
                                            ],
                                            { cancelable: true }
                                            );
                                    }}
                                    >
                                    <Text>{item.pesan}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }else if(item.pesan!=null && item.from_id===ID) {
                        return (
                            <ChatBubble key={item.id} keyval={item.id} val={item}/>
                        )
                    }
                
                })
    
                setPesan(renderedPesan)
    
            })
            .catch((err) => {console.log(err)})
        
        })


        }, [Update])

            return (
                <View style = {styles.container}>
                    <View style={{elevation: 1, width: '100%'}}> 
                        <TouchableOpacity 
                            style = {{
                                width: '30%',
                                height: 50,
                                padding: 4,
                                borderWidth: 1,
                                borderColor: 'green',
                                borderRadius: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginVertical: 6,
                                marginLeft: 3
                            }}
                            onPress={() => console.log(ID)}
                        >
                                <Text>{NAME}</Text>

                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{
                        marginBottom: 85
                    }}>
                        {Pesan}
                    </ScrollView>
                    <View style = {styles.textInputContainer}>
                        <TextInput
                            style = {styles.textInput}
                            placeholder = 'Type your message'
                            multiline = {true}
                            value = {Chat}
                            onChangeText = {setChat}
                        />
                        <TouchableOpacity 
                            style = {styles.sendButton}
                            onPress = {() => {
                                
                                AsyncStorage.getItem('Token').then(res=> {
                                
                                console.log(res)

                                const dataInput = {
                                    pesan : Chat,
                                    to_id : ID,
                                    is_read : '0'
                                }

                                axios.post(`https://yub-chat.herokuapp.com/api/pesan`, dataInput,{
                                    headers: {
                                        "Authorization": `Bearer ${res}`
                                    }
                                }
                                )

                                .then(res => {
                                        console.log(res);
                                        setUpdate(!Update);
                                    })

                                .catch(err => console.log(err))

                                setChat('')
                                })
                            }
                            }
                            >
                            <Text style = {styles.sendText}>Send</Text>
                        </TouchableOpacity>      
                    </View>

                </View>
            )
}

export default ChatProf

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white'
    },
    textInputContainer : {
        minHeight : 65,
        maxHeight : 165,
        width : '100%',
        backgroundColor : '#0165df',
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent : 'space-evenly',
        bottom:0,
        position:'absolute',
        paddingVertical: 15
    },
    textInput : {
        minHeight : 55,
        maxHeight : 155,
        width : '75%',
        backgroundColor : 'white',
        borderRadius : 10,
        fontSize : 18,
        paddingLeft: 15,
    },
    sendButton : {
        height : 54,
        width : '20%',
        backgroundColor : 'white',
        borderRadius : 50,
        alignItems : 'center',
        justifyContent : 'center',
        elevation: 20
    },
    sendText :{
        fontSize : 18
    }
})