import { resolveDiscoveryAsync } from 'expo-auth-session';
import * as React from 'react';
import { useState, useEffect} from 'react';
import { View,Text,StyleSheet,ScrollView, TouchableOpacity} from 'react-native';
import { Icon,ListItem } from 'react-native-elements';
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue, remove } from'firebase/database';

export default function Incorporations({ route, navigation }) {
    const [incorporations, setIncorporations] = useState([]);

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

    useEffect(() => {
        const incorporationRef = ref(database, 'users/'+ route.params.user +'/incorporations/');
        onValue(incorporationRef, (snapshot) => {const data = snapshot.val();
            if(data !== null){
                let incos = Object.values(data);
                setIncorporations(incos);
            }
        })
    }, []);
    if (incorporations.length > 0) {
        console.log(incorporations.length)
        return (
            <ScrollView style={styles.inputsContainer}>
               {
                    incorporations.map((comp, key)=>(
                            <ListItem
                                key={key}
                                bottomDivider
                                onPress={() => navigation.navigate('Companies', { user: route.params.user, incoStaff: incorporations[0].staff, inco: comp.name, name: comp.name + " companies" })}
                            >
                                <ListItem.Content styles={{backgroundColor: "black"}}>
                                    <ListItem.Title style={{ color: 'black', fontWeight: 'bold'}}>
                                        {comp.name}
                                    </ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron color="black" />
                            </ListItem>
                        )
                    )
                }
                <TouchableOpacity  
                    style={{marginTop: 20}}
                    onPress={()=>navigation.navigate('Add an Incorporation', { user: route.params.user })}  
                >
                    <Icon
                        type="ionicon"
                        size={50}
                        name="add-circle-outline"     
                    />
                </TouchableOpacity>
            </ScrollView>
        );
    }
    else {
        
        return (
            <View style={styles.container}>
                <TouchableOpacity  
                    style={{marginTop: 300,marginLeft: 12, backgroundColor: "white"}}
                    onPress={()=>navigation.navigate('Add Incorporation', { user: route.params.user})}  
                >
                    <Icon
                        type="ionicon"
                        size={70}
                        name="add-circle-outline"     
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 0,
      marginTop: -400,
    },
    ListItem: {
        width: '100%',
    },
    inputsContainer: {
        flex: 1, 
        marginBottom: 20,
        backgroundColor: "white"
      },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        marginTop: 30, 
        marginBottom: 10,
        borderBottomColor: "lightgray"
    }
});