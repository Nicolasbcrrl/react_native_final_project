import * as React from 'react';
import { useState, useEffect} from 'react';
import { View,StyleSheet, Alert, TouchableWithoutFeedback,Text, ScrollView } from 'react-native';
import { Input} from 'react-native-elements';
import { Button, Dialog, Portal, Provider, RadioButton} from 'react-native-paper';
import { initializeApp } from "firebase/app";
import { getDatabase,ref, onValue,update } from'firebase/database';

export default function Calls({ route, navigation }) {
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
    const company = route.params.company;
    const user = route.params.user;
    const incoName = route.params.inco;
    const totalPresent = 0;
    const date = new Date();
    const [section, setSection] = useState('');
    const [listSections, setListSections] = useState([]);
    const [sectionSet, setSectionSet] = useState({});
    const [visible, setVisible] = useState(false);
    const [select, setSelect] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => {
        setVisible(false); setSelect(false);
        };

    
  
    useEffect(() => {
        const companyRef = ref(database, 'users/'+ user +'/incorporations/'+ incoName + '/companies/' + company + '/sections/');
        onValue(companyRef, (snapshot) => {const data = snapshot.val();
            if(data !== null){
                let sect = Object.values(data);
                setListSections(sect);             
            }
        })
    }, []);
  
    const saveChanges = () => {
      let total = parseInt(sectionSet.kitchen) + parseInt(sectionSet.guard) + parseInt(sectionSet.office) + parseInt(sectionSet.sick) + parseInt(sectionSet.vacation) + parseInt(sectionSet.jail) + parseInt(sectionSet.detached);   
      if( total < parseInt(sectionSet.currStaff)) {
        var present = parseInt(sectionSet.currStaff) - parseInt(total);
        var totalPresent = parseInt(totalPresent) + parseInt(present);
        let today = date.getDate() + '' + (date.getMonth() + 1) + '' + date.getFullYear();
        update(
          ref(database, 'users/'+ user +'/incorporations/'+ incoName + '/companies/' + company + '/calls/' + today + '/sections/' + sectionSet.name),
            {
                currStaff: parseInt(sectionSet.currStaff), 
                present: parseInt(present),
                kitchen: parseInt(sectionSet.kitchen),
                guard: parseInt(sectionSet.guard),
                office: parseInt(sectionSet.office), 
                sick:parseInt(sectionSet.sick),
                vacation: parseInt(sectionSet.vacation),
                jail: parseInt(sectionSet.jail),
                detached: parseInt(sectionSet.detached)
            }
        );
        update(
            ref(database, 'users/'+ user +'/incorporations/'+ incoName + '/companies/' + company + '/calls/'),
                {
                  iddate: today
                }
            );
        setSelect(false);
      }
      else{
            Alert.alert('Error', 'Total present staff cannot be greater than current staff');
        }
    };

    const searchSection = () => {
        if(section !== '' && section !== null){
            for(let i = 0; i < listSections.length; i++){
                if(listSections[i].name === section){
                    setSectionSet(
                        {
                            name: listSections[i].name, 
                            currStaff: listSections[i].staff, 
                            kitchen: 0,
                            guard: 0,
                            office: 0, 
                            sick: 0,
                            vacation: 0,
                            jail: 0,
                            detached: 0
                        }
                    )
                    setSelect(true);
                    setVisible(false);
                    setSelect(true);
                    break;
                }
            }
        }
        else{
            Alert.alert('Error','select section to continue')
        }
    };
    
    const addSection = (value) => {
      setSection(value);
    };
      
    return (
      <Provider>
        <View style={{marginTop: 20}}>
          <Button onPress={showDialog} >Choose Section</Button>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Choose an option</Dialog.Title>
              <Dialog.Content>
              <RadioButton.Group onValueChange={choice => addSection(choice)} value={section}>
              {listSections.map((sect, key)=>(
                          <RadioButton.Item label={sect.name} value={sect.name}/>
                      ))}
              </RadioButton.Group>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={searchSection}>OK</Button>
                <Button onPress={hideDialog}>Cancel</Button>
                <Button onPress={()=> console.log(sectionSet)}>check</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
        <View>
          {
            select != false &&
            <View>
              <ScrollView style={{fontSize:10, padding: 10}}>
                <Input 
                    value={sectionSet.name} 
                    editable={false}
                />
                <Input  
                    editable={false}
                    value={'All staff : '+JSON.stringify(sectionSet.currStaff)} 
                />
                <Input 
                    placeholder='kitchen'
                    keyboardType='numeric'  
                    onChangeText={value => {
                            setSectionSet({...sectionSet, kitchen: value})
                        }
                    }
                />
                <Input 
                    placeholder='guard'
                    keyboardType='numeric'  
                    onChangeText={value => {
                            setSectionSet({...sectionSet, guard: value})
                        }
                    }
                />  
                <Input 
                    placeholder='office'
                    keyboardType='numeric'  
                    onChangeText={value => {
                            setSectionSet({...sectionSet, office: value})
                        }
                    }
                /> 
                <Input 
                    placeholder='sick'
                    keyboardType='numeric'  
                    onChangeText={value => {
                            setSectionSet({...sectionSet, sick: value})
                        }
                    }                
                /> 
                <Input 
                  placeholder='vacation'
                  keyboardType='numeric'  
                  onChangeText={value => {
                            setSectionSet({...sectionSet, vacation: value})
                        }
                    }
                />    
                <Input 
                  placeholder='jail'
                  keyboardType='numeric'  
                  onChangeText={value => {
                            setSectionSet({...sectionSet, jail: value})

                        }
                    }
                /> 
                <Input 
                  placeholder='detached'
                  keyboardType='numeric'  
                  onChangeText={value => { 
                            setSectionSet({...sectionSet, detached: value})
                        }
                    }
                />  
                <View style={{marginTop: 40}}>
                    <TouchableWithoutFeedback onPress={()=> saveChanges()}>
                        <View style={styles.buttonBackground}>
                        <Text style={{textAlign:"center",fontSize:20, color:'white'}}>Save</Text>
                        </View>
                    </TouchableWithoutFeedback> 
                </View>                   
              </ScrollView>

            </View>
          }
        </View>    
       
      </Provider>
      );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonBackground : {
      marginLeft: 20,
      marginRight: 20,
      paddingHorizontal:10, 
      paddingVertical:10, 
      backgroundColor:'green', 
      borderRadius:10, 
      elevation:5
    }
});