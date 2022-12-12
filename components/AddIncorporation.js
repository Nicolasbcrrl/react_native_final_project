import { useState} from 'react';
import { View,Text,StyleSheet,TextInput,TouchableOpacity,TouchableWithoutFeedback,ScrollView } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, update } from'firebase/database';

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
        if (incorporation.name !== "" && incorporation.name !== null) {
            const inco = {name: incorporation.name, staff: incorporation.staff};
            let staff = countStaff();
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

    const addHandler = ()=>{
        const _inputs = incorporation.company;
        _inputs.push({key: '', name: '', staff: 0});
        setIncorporation({...incorporation, company: _inputs});
    }
    
    const deleteHandler = (key)=>{
      const _inputs = incorporation.company.filter((company,index) => index != key);
      setIncorporation({...incorporation, company: _inputs});
    }
  
    const inputHandler = (text, key)=>{
      const _inputs = incorporation.company;
      _inputs[key].name = text;
      _inputs[key].key   = key;
      setIncorporation({...incorporation, company: _inputs});
  
    }

    const inputStaffHandler = (text, key)=>{
        const _inputs = incorporation.company;
        _inputs[key].staff = parseInt(text);
        _inputs[key].key   = key;
        setIncorporation({...incorporation, company: _inputs});
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
        <View>
            <Input  
              placeholder="Incorporation name" 
              value= {incorporation.name} 
              onChangeText={(text) => {setIncorporation({...incorporation, name: text})}}
            />
        </View>
        <ScrollView style={styles.inputsContainer}>
          {
            incorporation.company.map((comp, key)=>(
              <View style={styles.inputContainer}>
                <TextInput placeholder={"Enter Name"} value={comp.name}  onChangeText={(text)=>inputHandler(text,key)}/>
                <TextInput 
                  keyboardType='numeric' 
                  type={Number} placeholder={"Enter Staff"} 
                  value={comp.staff}  
                  onChangeText={(text)=>inputStaffHandler(text,key)}
                />
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

        <TouchableWithoutFeedback onPress={()=> saveIncorporation()}>
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
