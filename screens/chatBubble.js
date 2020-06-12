import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

class ChatBubble extends React.Component {
    render() {
        return (
            <View style={{
                left: 5,
                marginVertical: 3,
                width: '100%',
            }}>
                <TouchableOpacity
                    key = {this.props.keyval} 
                    style={{ 
                    width: '50%',
                    minHeight: 35,
                    padding: 3,
                    borderRadius: 10,
                    paddingHorizontal: 30,
                    elevation: 2,
                    justifyContent: 'center',
                    }}
                    >
                    <Text>{this.props.val.pesan}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default ChatBubble