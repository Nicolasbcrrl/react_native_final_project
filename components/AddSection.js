import { resolveDiscoveryAsync } from 'expo-auth-session';
import * as React from 'react';
import { useState} from 'react';
import { View,Text,StyleSheet, TouchableHighlight, TextInput,TouchableOpacity,TouchableWithoutFeedback,ScrollView  } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, update } from'firebase/database';

export default function AddSection({ route, navigation }) {
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

    const staff  = route.params.staff;
    const [sections, setSections] = useState([
        {
            key: '',
            name:'',
            staff:0
        }
    ]);

    const saveSections = () => {
      let number = countStaff();
      if(number < staff){          
        for(let i = 0; i < sections.length; i++){
            const sct = {name: sections[i].name, staff: sections[i].staff};
            if(sct.name !== "" && sct.name !== null){
                update(
                    ref(database, 'users/'+ route.params.user +'/incorporations/'+ route.params.inco +'/companies/'+ route.params.company +'/sections/'+ sct.name),
                    {
                        name: sct.name,
                        staff: sct.staff
                    }
                );
                
            }
            else{
                alert("Please enter a section name");
            }
        }
        alert("Sections added successfully");
    }
    else{
        alert("You have reached the maximum staff number that you set when you created the company");
    }
  };

    const addHandler = ()=>{
      const _inputs = [...sections];
      console.log(_inputs);
      _inputs.push({key: '', name: '', staff: 0});
      setSections(_inputs);
    }
    
    const deleteHandler = (key)=>{
      const _inputs = sections.filter((section,index) => index != key);
      setSections(_inputs);
    }
  
    const inputHandler = (text, key)=>{
      const _inputs = [...sections];
      _inputs[key].name = text;
      _inputs[key].key  = key;
      setSections(_inputs);
      console.log(sections);
  
    }

    const inputStaffHandler = (text, key)=>{
        const _inputs = [...sections];
        _inputs[key].staff = parseInt(text);
        _inputs[key].key   = key;
        setSections(_inputs);
    };

    const countStaff = () => {
        let staff = 0;
        for(let i = 0; i < sections.length; i++){
            staff += parseInt(sections[i].staff);
        }
        return staff;
    };



    return (
        <View style={styles.container}>
          <View>
              <Text>
                {route.params.staff}
              </Text>
          </View>
          <ScrollView style={styles.inputsContainer}>
            {
              sections.map((sct, key)=>(
                <View style={styles.inputContainer}>
                  <TextInput placeholder={"Enter Name"} value={sct.name}  onChangeText={(text)=>{inputHandler(text,key)}}/>
                  <TextInput keyboardType='numeric' type={Number} placeholder={"Enter Staff"} value={sct.staff}  onChangeText={(text)=>inputStaffHandler(text,key)}/>
                  <TouchableOpacity onPress = {()=> deleteHandler(key)}>
                    <Icon type="ionicon"
                          color="red"
                          name="trash-bin-outline" 
                    ></Icon>
                  </TouchableOpacity>
                   
                </View>
                )
              )
            }
            <TouchableOpacity  
                      style={{marginTop: 20}}
                      onPress={addHandler}       
            >
              <Icon
                type="ionicon"
                size={50}
                name="add-circle-outline"         
              />
            </TouchableOpacity>
          </ScrollView>
          <TouchableWithoutFeedback onPress={()=> saveSections()}>
            <View style={styles.buttonBackground}>
              <Text style={{textAlign:"center",fontSize:20, color:'white'}}>Save</Text>
            </View>
        </TouchableWithoutFeedback>
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
      marginTop: 30, 
      marginBottom: 10,
      borderBottomColor: "lightgray"
    },
    buttonBackground : {
      paddingHorizontal:20, 
      paddingVertical:10, 
      backgroundColor:'green', 
      borderRadius:10, 
      elevation:5
    }
  });