import React, { useContext,useState } from 'react'
import app from '../firebaseConfig'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { AuthContext } from './Auth'
import { Navigate,Link } from "react-router-dom"
import Hearder from './Hearder'


const Login = () => {

    const auth = getAuth(app);

    const [textError,setTexterror] = useState("")

    const handleSubmit =(e) =>{
        e.preventDefault();

        const {email,password} = e.target.elements;

        try{
            signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                // ...
              })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                setTexterror(errorMessage)
            });

        }catch(error){
            alert(error)
        }
    }

    const { currentUser } = useContext(AuthContext)
    if(currentUser) {
        return <Navigate to="/"/> 
    }

    return (
        <div>
            <Hearder/>
            <div className="m-5 w-90">
                <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="exampleInputPassword1"/>
                        <p className='text-danger'>{textError}</p>
                    </div>
                    <p><Link to="/singup">register</Link></p>
                    <button type="submit" className="btn btn-primary">Log In</button>
                </form>
            </div>
        </div>
    )
    }

export default Login