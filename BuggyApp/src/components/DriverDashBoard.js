import {React} from 'react'
import {Text,Button} from 'react-native-paper'
import {View} from 'react-native'
import Driver from '../state/auth-slice/Driver-slice'
import { useSelector } from 'react-redux'

const DriverDashBoard = ({navigation}) => {
const driver = useSelector((state)=>state.Driver);
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            {
                driver && (<>
                <Text variant='titleMedium'>Name:{driver.name}</Text>
                <Text variant='titleMedium'>Email:{driver.email}</Text>
                </>)
            }
            <Button 
                mode='contained'
                onPress={()=>navigation.replace('Login')}
            >Logout</Button>
        </View>
    )
}

export default DriverDashBoard;