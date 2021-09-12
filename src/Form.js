import React , {useState, useEffect} from 'react'
import { View, Text, Image, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import nodemailer from 'nodemailer'

const Form = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'abc105223@gmail.com',
          pass: 'Abc@12345'
        }
      });
      
      const mailOptions = {
        from: 'abc105223@gmail.com',
        to: 'utkarshtyagi113@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'Hello'
      };
    
    
    const userDetails = async() => {
        if(!email || !message || !phone ||!name){
            alert('please add fields')
            return
        }
        try{ 
         await firestore().collection('users').doc('ABC').set({
         name: name,
         email: email,
        })
        }catch(err){
         alert('add all the fields')
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
    
    return (
        <KeyboardAvoidingView behavior='position'>
        <View>
          <Image style={styles.img} source={require('./assets/cnqlogo.png')} />
          <View style={styles.box}>
          <TextInput 
              label= 'Name'
              value={name}
              mode='outlined'
              onChangeText={(text) => setName(text)}
             />
             <TextInput 
              label= 'Mobile Number'
              value={phone}
              mode='outlined'
              keyboardType= 'numeric'
              onChangeText={(text) => setPhone(text)}
             />
             <TextInput 
              label= 'Email'
              value={email}
              mode='outlined'
              onChangeText={(text) => setEmail(text)}
             />
             <TextInput 
              label= 'Message'
              value={message}
              mode='outlined'
              multiline= {true}
              onChangeText={(text) => setMessage(text)}
             />
            
            <Button 
             mode='contained'
             onPress={() => userDetails()}>
               Submit button
            </Button>
          </View>
         </View>
     </KeyboardAvoidingView>
    )
}

const styles= StyleSheet.create({
    img: {
        alignSelf: 'center',
        width: 200,
        height: 300,
    },

    box: {
        justifyContent: 'space-evenly'
    }
})

export default Form;