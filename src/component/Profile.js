import React from 'react'
import Hearder from './Hearder'
import { getAuth, onAuthStateChanged,updateProfile } from "firebase/auth";
import app from '../firebaseConfig';
import { useState } from 'react';


const Profile = () => {

    const auth = getAuth(app)

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [uid,setUid] = useState("")
    const [picUrl,setPicUrl] = useState("")
    const [sucCess,setSuccess] = useState("")
    
    onAuthStateChanged(auth,(user)=>{
        if (user) {
            setUsername(user.displayName)
            setEmail(user.email)
            setUid(user.uid)
            setPicUrl(user.photoURL)
        }
    })

    const handleSubmit = (e) =>{
        e.preventDefault()

        const {username,picurl} = e.target.elements;

        try{
            updateProfile(auth.currentUser,{
                displayName:username.value,
                photoURL:picurl.value
            }).then(()=>{
                console.log("success");
                setSuccess("setting success")
            }).catch((error)=>{
                console.log(error);
            })
        }catch(error){
            console.log(error);
        }

        

    }

  return (
    <div >
        <Hearder/>
        
        <div className="m-5">
        <section className="">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-5" >
                    <img src={picUrl} alt=""
                    className="img-fluid mx-auto d-block rounded-circle" style={{height: 250}}/>
                </div>

                <div className="col-7 ">
                    <h1 className="mb-2 display-8 py-4">Username : {username}</h1>
                    <p className="lead">Email : {email}</p>
                    <p className="lead">ID : {uid}</p>
                    <p className='text-success'>{sucCess}</p>
                </div>
            </div>
        </div>
        </section>

        <hr/>

        <form onSubmit={handleSubmit}>
            <section className=" pb-5">
            <div className="container">
                <div className="">
                    <h2 className='d-flex justify-content-center'>Account</h2>
                    
                    <div className="row align-items-center pt-5">
                        <h3 className="col-5 display-8 fw-bold d-flex justify-content-center">Username</h3>
                        <div className="col-5 d-flex justify-content-center">
                            <input type="text" className="form-control" name='username' placeholder="Username" aria-describedby="basic-addon2" defaultValue={username}/>
                        </div>                     
                    </div>

                    <div className="row align-items-center pt-5">
                        <h3 className="col-5 display-8 fw-bold d-flex justify-content-center">Email</h3>
                        <div className="col-5 d-flex justify-content-center">
                            <input type="email" className="form-control" name='email' disabled={true} placeholder="Email" aria-describedby="basic-addon2" defaultValue={email}/>
                        </div>                     
                    </div>

                    <div className="row align-items-center pt-5">
                        <h3 className="col-5 display-8 fw-bold d-flex justify-content-center">PictureURL</h3>
                        <div className="col-5 d-flex justify-content-center">
                            <input type="text" className="form-control" name='picurl' placeholder="url" aria-describedby="basic-addon2" defaultValue={picUrl}/>
                        </div>                     
                    </div>

                    <div className="row align-items-center justify-content-center pt-5 px-5">
                        <button type="submit" className="btn btn-primary w-25">Submit</button>
                    </div>
                </div>
            </div>
            </section>
        </form>
        </div>

       
    </div>
  )
}

export default Profile