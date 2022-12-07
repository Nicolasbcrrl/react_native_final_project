import { resolveDiscoveryAsync } from 'expo-auth-session';
import * as React from 'react';
import { Button,View,Text,StyleSheet} from 'react-native';
import { Icon} from 'react-native-elements';

export default function CompanyDetail({ route, navigation }) {
    return (
        <View style={styles.container}>
            <Text>Calls {route.params.user + " " + route.params.inco + " " + route.params.company + " " + route.params.staff}</Text>
            <View>
                <Button title="Add Section" onPress={() => navigation.navigate('Add Section', {user: route.params.user, inco: route.params.inco ,company: route.params.company, staff: route.params.staff})}/>
                <Button title="Edit a company" onPress={() => navigation.navigate('Edit company', {user: route.params.user, company: route.params.company, staff: route.params.staff})}/>
                <Button title="Calls" onPress={() => navigation.navigate('Calls', {user: route.params.user, company: route.params.company, staff: route.params.staff})}/>
                <Icon
                        type="ionicon"
                        size={50}
                        name="add-circle-outline"          
                    />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    }
});