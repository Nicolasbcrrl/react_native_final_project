import { resolveDiscoveryAsync } from 'expo-auth-session';
import * as React from 'react';
import { useState, useRef} from 'react';
import { Button,View,Text,StyleSheet, FlatList, TextInput} from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue, remove } from'firebase/database';

export default function AddIncorporation({ route, navigation }) {
    const firebaseConfig = {
        apiKey: "AIzaSyDDLq2Tr6jJEJUgnnQLJtYG6FxL3QjRQ6Q",
        authDomain: "final-project-991cf.firebaseapp.com",
        databaseURL: "https://final-project-991cf-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "final-project-991cf",
        storageBucket: "final-project-991cf.appspot.com",
        messagingSenderId: "447968724239",
        appId: "1:447968724239:web:b0d4d79fac613a2a876a7a"
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const[incorporation, setIncorporation] = useState(
        {
            name:"", 
            staff: 0,
            company:[
                {
                    name:"",
                    staff:0
                }
            ]
        }
        );
    const[lstCompany, setCompany] = useState([
        {
            name:"", 
            staff:0
        }]);
    

    const saveIncorporation = () => {
        if (incorporation !== "" && incorporation !== null) {
            const inco = {name: incorporation.name, staff: incorporation.staff};
            push(
                ref(database, 'users/'+ route.params.user +'/incorporations/'),
                {
                    name: inco.name,
                    staff: inco.staff
                }
            );
            for(let i = 0; i < incorporation.company.length; i++){
                const company = {name: incorporation.company[i].name, staff: incorporation.company[i].staff};
                push(
                    ref(database, 'users/'+ route.params.user +'/incorporations/'+ inco +'/companies/'),
                    {
                        name: company.name,
                        staff: company.staff
                    }
                );
            }
            setIncorporation({name:"", company:[{name:"", staff:0}]});
        }
    }



    return (
        <View style={styles.container}>
            <Text>Add Incorporation de la pute {route.params.user}</Text>
            <View style={{backgroundColor: 'green'}}>
                <TextInput 
                    placeholder='Incorporation name'
                    onChangeText={(value) => setIncorporation({...incorporation, name: value})}
                />
                <TextInput
                    keyboardType='numeric'
                    placeholder='Incorporation staff'
                    onChangeText={(value) => setIncorporation({...incorporation, staff: value})}
                />
                <View style={{backgroundColor: "red"}}>

                </View>

            </View>
            <View>

    
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
    }
});