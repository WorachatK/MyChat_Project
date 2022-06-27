import React, { useContext, useState } from 'react'
import { AuthContext } from './Auth'
import {Link } from "react-router-dom"
import { getAuth } from "firebase/auth";
import app from '../firebaseConfig';
import Hearder from './Hearder';
import Getpost from './Getpost';
import { getDatabase, ref,set } from "firebase/database";



const Home = () => {

    const auth = getAuth(app)
    const { currentUser } = useContext(AuthContext)
    const user = auth.currentUser
    const db = getDatabase();

    const [valuePost,setValuePost] = useState('')

    
    const dateTime = () =>{
        const currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " at "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        return datetime
    }
    const dateCheck = () =>{
        const currentdate = new Date();
        var datecheck = currentdate.getDate() + ""
                + (currentdate.getMonth()+1)  + ""
                + currentdate.getFullYear() +  ""
                + currentdate.getHours() +   ""
                + currentdate.getMinutes() + ""
                + currentdate.getSeconds();        
        return datecheck
    }

    const writePostData = (e) =>{
        e.preventDefault()
        const {datapost} = e.target.elements;

        set(ref(db, 'Postusers/' + dateCheck() +'/'+ user.uid ), {
            username: user.displayName,
            photo: user.photoURL,
            timeofpost:dateTime(),
            textpost:datapost.value
        }).then(()=>{
            alert("Post Success")
            console.log("success");
            setValuePost('')
        }).catch((error)=>{
            alert(error)
            console.log(error);
        });

    }
    
    

    return (
        <div>
            <Hearder/>
            <div className="flex m-4">
                {currentUser ? (
                    <div>
                        {/* input post */}
                        <form onSubmit={writePostData}>
                            <div className='d-flex justify-content-center ' style={{}}>
                                <div className='card bg-light mb-3 w-75 rounded'>
                                    <div className='m-4 d-flex align-items-center'>
                                        <img src={user.photoURL} alt=""
                                        className="img-fluid d-block rounded-circle" style={{height: 50}}/>
                                        <textarea type="text" className='w-100 mx-4' name='datapost' placeholder="Say something..." defaultValue={valuePost}/>
                                    </div>
                                    <button type="submit" className="btn btn-outline-success mx-5 mb-4">Post</button>
                                </div>
                            </div>
                        </form>

                        <Getpost/>

                        {/* show post */}
                        
                    </div>
                    
                ) : (
                    <div>
                        <h1>Please Log In</h1>
                        <p>
                            Go <Link to="/login">Log In</Link> or <Link to="/singup">Sing Up</Link>
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home