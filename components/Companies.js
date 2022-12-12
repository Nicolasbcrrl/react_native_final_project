import { resolveDiscoveryAsync } from 'expo-auth-session';
import * as React from 'react';
import { useState, useEffect} from 'react';
import { Button,View,Text,StyleSheet, ScrollView} from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue, remove } from'firebase/database';


export default function Companies({ route, navigation }) {
    const[listCompanies, setListCompanies] = useState([]);

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
        const incorporationRef = ref(database, 'users/'+ route.params.user +'/incorporations/'+ route.params.inco + /companies/);
        onValue(incorporationRef, (snapshot) => {const data = snapshot.val();
            if(data !== null){
                let comp = Object.values(data);
                setListCompanies(comp);
            }
        })
    }, []);

    return (
        <ScrollView style={styles.inputsContainer}>
            {
                listCompanies.map((comp, key)=>(
                <ListItem
                    key={key}
                    bottomDivider
                    onPress={() => navigation.navigate('Company Detail', { user: route.params.user, incoStaff: route.params.incoStaff ,inco: route.params.inco ,company: comp.name, staff : comp.staff, name: comp.name })}
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
        </ScrollView>
    );
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