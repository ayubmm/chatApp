import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Modal,
    AsyncStorage
} from 'react-native';
import axios from 'axios'

class Chat extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            token : '',
            modalVisible: false,
            userData: [],
            usersData: [],
            renderedData: null
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    logout(){
        AsyncStorage.removeItem('Token')
        .then((res)=> {
            console.log(res);
            this.props.navigation.navigate('Login');
        })
    }


    render() {

        return (

            <View style={styles.container}>

                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}

                >
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => { this.setModalVisible(!this.state.modalVisible); }}
                            style={styles.modalClose}
                        >
                            <Image source={require('../pics/back-arrow.webp')} style={styles.modalCloseImage} />
                        </TouchableOpacity>

                        <Image source={require('../pics/anonymous.jpg')} style={styles.profImgModal} />
                    </View>
                </Modal>
                <View style={styles.headerCont}>
                    <View style={styles.header}>
                        <Text style = {styles.title}>ONE-Chat</Text> 
                        <TouchableOpacity onPress={()=> 
                            {this.logout()}
                            }>
                            <Text style={styles.logout}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.header2}>
                        <View style={styles.menuChat}>
                            <Text style={styles.menuTitle}>Chats</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.body}>
                    <ScrollView>
                        {/* <TouchableOpacity
                            style={styles.chat}
                            onPress={() => { this.props.navigation.navigate('profChat'), this.state.usersData }}
                        >
                            <TouchableOpacity style={styles.profImgContainer}
                                onPress={() => { this.setModalVisible(true); }}
                            >
                                <Image source={require('../pics/anonymous.jpg')} style={styles.profImg} />
                            </TouchableOpacity>
                            <View style={styles.chatInfo}>
                                <Text style={styles.profName}>Anonymous</Text>
                                <Text style={styles.profChat}>Hello there...</Text>
                            </View>
                        </TouchableOpacity> */}
                        {this.state.renderedData}
                    </ScrollView>
                </View>

            </View>

        )
    }
    
    componentDidMount() {

        AsyncStorage.getItem('Token')
        .then((res) => {
            axios.get('https://yub-chat.herokuapp.com/api/user-profil', {
            headers: {
                "Authorization": `Bearer ${res}`
            }
            })
                .then((res) => {
                    this.setState({ userData: res.data });
                    console.log(this.state.userData)
                    // if(this.state.userData.status=='Token is Expired') {
                    //     this.props.navigation.navigate('Login')
                    // }
                })
                .catch(err => console.log(err))
            
            axios.get('https://yub-chat.herokuapp.com/api/users', {
                headers: {
                    "Authorization": `Bearer ${res}`
                }
            })
                .then((res) => {
                    this.setState({ usersData: res.data });
                    console.log(this.state.usersData);
                    let chats = this.state.usersData.map((item, index) => {
                        return (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.chat}
                            onPress={() => { 
                                this.props.navigation.navigate('profChat', {
                                    user_id: item.id,
                                    user_name: item.name
                                }) 
                            }}
                        >
                            <TouchableOpacity style={styles.profImgContainer}
                                onPress={() => { this.setModalVisible(true); }}
                            >
                                <Image source={{uri:item.avatar}} style={styles.profImg} />
                            </TouchableOpacity>
                            <View style={styles.chatInfo}>
                                <Text style={styles.profName}>{item.name}</Text>
                                <Text style={styles.profChat}>ID : {item.id}, Email : {item.email}</Text>
                            </View>
                        </TouchableOpacity>
                        )
                    }
                    );
                    this.setState({renderedData: chats});
                })
                .catch(err => console.log(err))
        });

        
    }
}


export default Chat;

const styles = StyleSheet.create({
    cicle: {
        height: 50,
        width: 50,
        borderRadius: 30,
        backgroundColor: 'black'
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerCont: {
        elevation: 12,
        backgroundColor: '#0165df'
    },
    header: {
        height: 70,
        backgroundColor: '#0165df',
        paddingLeft: 15,
        paddingTop: 10,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header2: {
        height: 25,
        backgroundColor: '#0165df',
    },
    menuChat: {
        height: '100%',
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 3,
        borderBottomColor: 'white'
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'flex-start',
    },
    menuTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    searchImg: {
        height: 23,
        width: 23,
        resizeMode: 'contain'
    },
    body: {
        flex: 5
    },
    chat: {
        height: 75,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    top: {
        height: 72,
        width: 72,
        resizeMode: 'cover',
        borderRadius: 360,
    },
    profImgContainer: {
        height: 80,
        width: 90,
        resizeMode: 'cover',
        borderRadius: 360,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profImg: {
        height: 60,
        width: 60,
        resizeMode: 'cover',
        borderRadius: 360,
    },
    profImgModal: {
        height: '40%',
        width: '100%',
        resizeMode: 'contain',
    },
    chatInfo: {
        flex: 1,
        paddingLeft: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        marginRight: 15,
        justifyContent: 'center'
    },
    profName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    profChat: {
        fontSize: 13,
        color: 'gray'
    },
    modalClose: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        alignSelf: 'flex-start'
    },
    modalCloseImage: {
        height: 50,
        width: 50,
    },
    logout : {
        fontSize:18,
        color: 'red',
        fontWeight: '400'
    }
}
)