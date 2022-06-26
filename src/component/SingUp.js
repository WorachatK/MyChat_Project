import React, { useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import app from '../firebaseConfig';
import { Navigate } from "react-router-dom"
import Hearder from './Hearder';

const SingUp = () => {

    const auth = getAuth(app);

    const [currentUser,setCurrentUser] = useState(null)

    const [textError,setTexterror] = useState("")

    const [password,setPassword] = useState('')
    const [repassword,setRepassword] = useState('')
    const [testpass,setTestpass] = useState(null)

    const inputPassword = (event)=>{
        let password = event.target.value
        console.log(password);
        setPassword(password)
    }

    const inputRepassword = (event)=>{
        let repassword = event.target.value
        console.log(repassword);
        setRepassword(repassword)
    }

    useEffect(()=>{
        if(repassword === password && password.trim().length>5){
            setTestpass(true)
            setTexterror("")

        }else{
            setTestpass(false)
            setTexterror("Password dosen't match")
        }
        
    },[repassword,password])

    const handleSubmit = (e) => {
        e.preventDefault();
        const {email,password,repassword} = e.target.elements;
        console.log(repassword);

        try {
            createUserWithEmailAndPassword(auth, email.value ,password.value)
            .then((userCredential) => {
                // Signed in 
                updateProfile(auth.currentUser,{
                    displayName:"Unknow",
                    photoURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhOaaBAY_yOcJXbL4jW0I_Y5sePbzagqN2aA&usqp=CAU"
                })
                const user = userCredential.user;
                console.log(user);
                setCurrentUser(true);     
                // ...
              })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                setTexterror(errorMessage)
            });
        } catch(error) {
            alert(error);
        }
    }
    
    if (currentUser) {
        return <Navigate to="/"/>
    }


    return (
        <div>
            <Hearder/>
            <div className="m-5 w-90">
                <h1>Sing Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name="email" className="form-control" id="exampleInputEmail1"  aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="InputPassword1" placeholder='password should be at least 6 alphanumeric' onChange={inputPassword}/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Re-Password</label>
                        <input type="password" name="repassword" className="form-control" id="exampleInputPassword1" onChange={inputRepassword}/>
                        <p className="text-danger">{textError}</p>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={!testpass}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SingUp