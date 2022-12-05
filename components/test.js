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

    const saveIncorporation = () => {
        if (incorporation !== "" && incorporation !== null) {
            const inco = {name: incorporation.name, staff: incorporation.staff};
            countStaff();
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
    };

    const addHandler = () => {
        const companies = incorporation.company;
        companies.push({name:"", staff:0});
        setIncorporation(...incorporation, companies);
    };

    const removeHandler = (index) => {
        const companies = incorporation.company.filter((item, i) => i !== index);
        setIncorporation(...incorporation, companies);
    };

    const nameHandler = (index, value) => {
        const companies = incorporation.company;
        companies[index].name = value;
        setIncorporation(...incorporation, companies[index].name);
    };

    const staffHandler = (index, value) => {
        const companies = incorporation.company;
        companies[index].staff = value;
        setIncorporation(...incorporation, companies[index].staff);
    };


    const countStaff = () => {
        let staff = 0;
        for(let i = 0; i < incorporation.company.length; i++){
            staff += incorporation.company[i].staff;
        }
        saveIncorporation((curr) => { return {...curr, staff: staff}});
    };




    return (
        <View style={styles.container}>
            <Text>Add Incorporation de la pute {route.params.user}</Text>
            <View style={{backgroundColor: 'green'}}>
                <TextInput 
                    placeholder='Incorporation name'
                    onChangeText={(value) => setIncorporation({...incorporation, name: value})}
                />
            </View>
            <View style={{backgroundColor: 'red'}}>
                {incorporation.company.map((item, index) => (
                    <View key={index}>
                        <TextInput
                            placeholder='Company name'
                            onChangeText={(value) => nameHandler(index, value)}
                        />
                        <TextInput
                            placeholder='Company staff'
                            onChangeText={(value) => staffHandler(index, value)}
                        />
                        <Button title='Remove' onPress={() => removeHandler(index)}/>
                    </View>
                ))}
                </View>
                <Button title='Add' onPress={addHandler}/>
                <Button title='Save' onPress={saveIncorporation}/>            
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