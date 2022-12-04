import { resolveDiscoveryAsync } from 'expo-auth-session';
import * as React from 'react';
import { Button,View,Text,StyleSheet} from 'react-native';
import { Icon} from 'react-native-elements';
export default function AddCompany({ route, navigation }) {

    return (
        <View style={styles.container}>
            <Text>AddCompany {route.params.user}</Text>
            <View>
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