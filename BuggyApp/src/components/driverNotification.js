import React from "react";
import {StyleSheet, View,TouchableOpacity} from 'react-native';
import {Text,Avatar,Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons';

const DriverNotification = () => {
    const data = [
        {

        }
    ]


    return(
        <View>
             <View style={styles.profile}>
                    <Text variant="titleLarge">kaldkjfai</Text>
                    <View style={{flexDirection:"row",alignItems:'center',gap:20}}>
                    <Avatar.Text size={34} label="DV" />
                    </View>
                </View>
                <View style={styles.notificationCon}>
                    <View style={styles.flexbox}>
                        <Avatar.Text style={{backgroundColor:'#FF8A8A'}} size={36} label="JY" />
                        <Text style={styles.text} variant="titleLarge">#jakhdsjf</Text>
                        <Text style={styles.text} variant="titleLarge">From</Text>
                        <Text style={styles.text} variant="titleLarge">To</Text>
                        <Text style={styles.text} variant="titleLarge">count</Text>
                    </View>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profile:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        margin:10
    },
    flexbox:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        alignItems:'center',
        borderWidth:1.5,
        padding:10,
        margin:10,
        borderColor:'grey',
        borderRadius:5,

    },
    notificationCon:{
        margin:10,
        justifyContent:'center',
        alignItems:'center',
        maxHeight:100,
    },
    text:{
        fontWeight:'700',
    }
})

export default DriverNotification;