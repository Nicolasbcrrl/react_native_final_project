import { resolveDiscoveryAsync } from 'expo-auth-session';
import * as React from 'react';
import { useState} from 'react';
import { View,Text,StyleSheet, TouchableHighlight, TextInput,TouchableOpacity,TouchableWithoutFeedback,ScrollView  } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, update } from'firebase/database';

export default function EditCompany({ route, navigation }) {
    
    return (
        <View style={styles.container}>
            <Text>Calls {route.params.user}</Text>
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