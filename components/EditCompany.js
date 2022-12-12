import * as React from 'react';
import { useState, useEffect} from 'react';
import { View,StyleSheet, Alert, TouchableWithoutFeedback,Text } from 'react-native';
import { Input} from 'react-native-elements';
import { Button, Dialog, Portal, Provider, RadioButton} from 'react-native-paper';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update } from'firebase/database';


export default function EditCompany({ route, navigation }) {
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
  const incoStaff = route.params.staff;
  const [section, setSection] = useState('');
  const [listSections, setListSections] = useState([]);
  const [sectionSet, setSectionSet] = useState({});
  const [visible, setVisible] = useState(false);
  const [select, setSelect] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => {setVisible(false); setSelect(false);};
  

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
    if (sectionSet.newStaff !== "" && sectionSet.newStaff !== null) {
      update(
        ref(database, 'users/'+ user +'/incorporations/'+ incoName + '/companies/' + company + '/sections/' + sectionSet.name),
      {
        staff: parseInt(sectionSet.newStaff)
      }
      );
      let compNewStaff = companyCalcul();
      update(ref(database, 'users/'+ user +'/incorporations/'+ incoName + '/companies/' + company), 
        {
          staff: compNewStaff
        }
      );
      let incoNewStaff = incorporationCalcul();
      update(ref(database, 'users/'+ user +'/incorporations/'+ incoName ), 
        {
          staff: incoNewStaff
        }
      );
        setSelect(false);
    }
    else{
          Alert.alert('Error','Please enter a new "staff number"');
        }
  };

  const companyCalcul = () => {
    let total = parseInt(route.params.staff);
    let currStaff = parseInt(sectionSet.currStaff);
    let newStaff = parseInt(sectionSet.newStaff);
    if(currStaff >= newStaff){
      let section = currStaff - newStaff;
      total = parseInt(total) - parseInt(section);
      return total;
    }
    else{
      let section = newStaff - currStaff;
      total = total + section;
      return total;
    }
  }

  const incorporationCalcul = () => {
    let currCompany = parseInt(route.params.staff);
    let newCompany = companyCalcul();
    let inco = parseInt(incoStaff);
    if(currCompany >= newCompany){
      let company = currCompany - newCompany;
      inco = inco - company;
      return inco;
    }
    else{
      let company = newCompany - currCompany;
      inco = inco + company;
      return inco;
    }
  } 

  const searchSection = () => {
    if(section !== '' && section !== null){
      for(let i = 0; i < listSections.length; i++){
        if(listSections[i].name === section){
          setSectionSet({name: listSections[i].name, currStaff: listSections[i].staff, newStaff : 0})
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
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
      <View>
        {
          select != false &&
          <View>
            <View style={{marginTop: 50, marginBottom: 20, fontSize:10, padding: 10}}>
                <Input 
                  value={sectionSet.name} 
                  editable={false}
                />
            </View>
            <View style={{marginBottom: 20, fontSize: 2, padding: 10 }}>
              <Input  
                editable={false}
                keyboardType='numeric' 
                value={'Current staff : '+JSON.stringify(sectionSet.currStaff)} 
              />
            </View>
            <View style={{marginBottom: 340,  fontSize:10, padding: 10}}>
              <Input 
                placeholder='New Staff'
                keyboardType='numeric'  
                onChangeText={value => setSectionSet({...sectionSet, newStaff: value})}
              />
            </View>
            <TouchableWithoutFeedback onPress={()=> saveChanges()}>
              <View style={styles.buttonBackground}>
                <Text style={{textAlign:"center",fontSize:20, color:'white'}}>Save</Text>
              </View>
            </TouchableWithoutFeedback>
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