/* eslint-disable prettier/prettier */
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useContext} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {StyleSheet, View, Image, Text, Alert} from 'react-native';
import {Context} from '../context/ContextProvider';
import { registerUser } from '../HttpRequests/user';

function Singup({navigation}) {
  const [newUser,setNewUser] = React.useState({
    name:"",
    password:"",
    confirmpass:"",
    email:""
  });

  const register = async() => {
    if(newUser.confirmpass === newUser.password){
      const status = await registerUser(newUser);
      console.log(status,"staus");
      if(status.success){
        Alert.alert("registration succesfull");
        navigation.navigate('Login');
      }
      else{
        Alert.alert("check the details entered");
      }
    }
    else{
     console.log('validate password');
    }
  }

 
   
  return (
    <SafeAreaView>
      <View style={stylesheet.container}>
        <View style={stylesheet.ImageContainer}>
          <Image
            style={stylesheet.image}
            source={require('../assests/vit.png')}
          />
        </View>
        <View style={stylesheet.LoginContainer}>
        <TextInput
            mode="outlined"
            label="Full Name"
            right={<TextInput.Affix text="/100" />}
            style={stylesheet.textInput}
            onChangeText={(text)=>setNewUser({...newUser,name:text})}
          />
          <TextInput
            mode="outlined"
            label="College Email"
            right={<TextInput.Affix text="/100" />}
            onChangeText={(text)=>setNewUser({...newUser,email:text})}
            style={stylesheet.textInput}
          />
          <TextInput
            mode="outlined"
            label="Set Password"
            right={<TextInput.Affix text="/100" />}
            onChangeText={(text)=>setNewUser({...newUser,password:text})}
          />
           <TextInput
            mode="outlined"
            label="Confirm Password"
            right={<TextInput.Affix text="/100" />}
            onChangeText={(text)=>setNewUser({...newUser,confirmpass:text})}
          />

          <View style={stylesheet.buttoncont}>
            <Button
              onPress={register}
              contentStyle={{height: 50}}
              mode="contained"
              buttonColor="black"
              textColor="white">
              Singup
            </Button>
            <Button  
            onPress={()=>navigation.navigate('Login')}
            contentStyle={{height: 50}} 
            mode="text" 
            textColor="black">
              Already have an account?Login
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  ImageContainer: {
    height: '30%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
  LoginContainer: {
    width: '90%',
    flex:1,
    margin: 10,
    gap: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    color: 'black',
  },
  buttoncont: {
    height: '200px',
    width: '200px',
    marginTop: 10,
    gap: 10,
  },
});

export default Singup;
