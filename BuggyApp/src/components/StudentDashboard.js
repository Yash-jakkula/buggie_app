import {React} from 'react'
import {Text,Button} from 'react-native-paper'
import {View} from 'react-native'
import Student from '../state/auth-slice/student-slice'
import { useSelector } from 'react-redux'

const StudentDashboard = ({navigation}) => {
    const student = useSelector((state)=>state.Student);

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            {
                student && (
                    <>
                <Text variant='titleMedium'>Name:{student.name}</Text>
                <Text variant='titleMedium'>Email:{student.email}</Text>
            
                </>)
            }
            <Button 
                mode='contained'
                onPress={()=>navigation.replace('Login')}
            >Logout</Button>
        </View>
    )
}

export default StudentDashboard;