import { resolveDiscoveryAsync } from 'expo-auth-session';
import * as React from 'react';
import { useState, useRef} from 'react';
import { Button,View,Text,StyleSheet, FlatList, TextInput,TouchableOpacity,ScrollView  } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue, remove, update } from'firebase/database';

export default function AddIncorporation({ route, navigation }) {
    //firebase configuration
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
    const [incorporation, setIncorporation] = useState(
        {
            name:"",
            staff: 0,
            company:[
                {
                    key: '',
                    name:"",
                    staff:0
                }
            ]
        }
    );

    const saveIncorporation = () => {
        if (incorporation !== "" && incorporation !== null) {
            const inco = {name: incorporation.name, staff: incorporation.staff};
            let staff = countStaff();
            console.log(incorporation.name);
            console.log(staff);
            update(ref(database, 'users/'+ route.params.user +'/incorporations/'+ incorporation.name), {
                name: inco.name,
                staff: staff
                });
            for(let i = 0; i < incorporation.company.length; i++){
                const company = {name: incorporation.company[i].name, staff: incorporation.company[i].staff};
                if(company.name !== "" && company.name !== null){
                    update(
                        ref(database, 'users/'+ route.params.user +'/incorporations/'+ inco.name +'/companies/'+ company.name),
                        {
                            name: company.name,
                            staff: company.staff
                        }
                    );
                    
                }
                else{
                    alert("Please enter a company name");
                }
            }
            alert("Incorporation added successfully");
        }
        else{
            alert("Please fill in the incorporation name");
        };
    };


    const [inputs, setInputs] = useState([{key: '', value: '', staff: 0}]);

    const addHandler = ()=>{
        const _inputs = incorporation.company;
        _inputs.push({key: '', name: '', staff: 0});
        setIncorporation({company: _inputs});
    }
    
    const deleteHandler = (key)=>{
      const _inputs = incorporation.company.filter((company,index) => index != key);
      setIncorporation({company: _inputs});
    }
  
    const inputHandler = (text, key)=>{
      const _inputs = incorporation.company;
      _inputs[key].name = text;
      _inputs[key].key   = key;
      setIncorporation({company: _inputs});
  
    }

    const inputStaffHandler = (text, key)=>{
        const _inputs = incorporation.company;
        _inputs[key].staff = parseInt(text);
        _inputs[key].key   = key;
        setIncorporation({company: _inputs});
    };

    const countStaff = () => {
        let staff = 0;
        for(let i = 0; i < incorporation.company.length; i++){
            staff += parseInt(incorporation.company[i].staff);
        }
        return staff;
    };

  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <TextInput  placeholder="Incorporation name" value= {incorporation.name} onChangeText={(text) => {setIncorporation({...incorporation, name: text})}}/>
        </View>
        <ScrollView style={styles.inputsContainer}>
        {incorporation.company.map((comp, key)=>(
          <View style={styles.inputContainer}>
            <TextInput placeholder={"Enter Name"} value={comp.name}  onChangeText={(text)=>inputHandler(text,key)}/>
            <TextInput type={Number} placeholder={"Enter Staff"} value={comp.staff}  onChangeText={(text)=>inputStaffHandler(text,key)}/>
            <TouchableOpacity onPress = {()=> deleteHandler(key)}>
              <Text style={{color: "red", fontSize: 13}}>Delete</Text>
            </TouchableOpacity> 
          </View>
        ))}
        </ScrollView>
        <Button title = "Save" onPress = {()=> saveIncorporation()}/>
        <Button title="Add" onPress={addHandler} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'white'
    },
    inputsContainer: {
      flex: 1, marginBottom: 20
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: "lightgray"
    }
  })
  