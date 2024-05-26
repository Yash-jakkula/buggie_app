/* eslint-disable prettier/prettier */
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useContext} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {StyleSheet, View, Image, Text,Alert} from 'react-native';
import {Context} from '../context/ContextProvider';
import {fetchUser} from '../HttpRequests/userAuthentication';
import { userActions } from '../state/auth-slice/user-slice';
import { useDispatch } from 'react-redux';
import config from '../../config';

function Login({navigation}) {
const dispatch = useDispatch();
  const [credentials,setCredentials] = React.useState({
    username:"",
    password:""
  })

  const {user, setUser} = useContext(Context);
   const User = async()=>{
    console.log('clicked');
   
      const {success,token} = await fetchUser(credentials);
      console.log(token)

      // const userinfo = await currentUser(token);
      // console.log('userinfo',userinfo);  
      // setUser({...user,token:token,success:success,role:userinfo[0].role,
      // name:userinfo[0].name,id:userinfo[0]._id,location:userinfo[0].location,seats:userinfo[0].seats});
      // console.log('user',user);
      if(token){
        dispatch(userActions.setUserToken(token))
        navigation.replace('Home');
      }
      else{
         Alert.alert("please enter valid details");
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
            label="College Email"
            right={<TextInput.Affix text="/100" />}
            style={stylesheet.textInput}
            onChangeText={(text) => setCredentials({...credentials,username:text})}
          />
          <TextInput
            mode="outlined"
            label="Password"
            right={<TextInput.Affix text="/100" />}
            onChangeText={(text)=>setCredentials({...credentials,password:text})}
          />

          <View style={stylesheet.buttoncont}>
            <Button
              onPress={User}
              contentStyle={{height: 50}}
              mode="contained"
              buttonColor="black"
              textColor="white">
              Login
            </Button>
            <Button
              onPress={()=>navigation.navigate('Singup')}
              contentStyle={{height: 50}} 
              mode="text" 
              textColor="black"
              >
              Don't have an account?Register
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

export default Login;
