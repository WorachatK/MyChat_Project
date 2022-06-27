import React,{ useContext } from 'react'
import { Link } from 'react-router-dom'
import { getAuth,signOut } from "firebase/auth";
import { AuthContext } from './Auth'

import app from '../firebaseConfig';

const Hearder = () => {

    const auth = getAuth(app)
    
    const { currentUser } = useContext(AuthContext)

    const singout = ()=>{
        try {
            signOut(auth)
        }catch(error){
            alert(error)
        }
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light px-5">
        <div className="container-fluid">

            <Link to="/" className="navbar-brand">Myprojrct</Link>

            {currentUser ? (
            <div>
                <div className="navbar-collapse justify-content-end d-inline-flex " id="navbarNavAltMarkup">
                    <div className="">
                        <Link to="/" className="nav-link active" aria-current="page" >Home</Link>             
                    </div>
                    <div>
                        <Link to="/profile" className="nav-link" >My Profile</Link>
                    </div>
                    <Link to="/" className="nav-link" onClick={singout}>
                        <button type="button" className="btn btn-danger">
                            Logout
                        </button>
                    </Link>
                </div>

                
            </div>    
            ):(
                <div>
                    <div className="navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/" className="nav-link active" aria-current="page" >Home</Link>
                            <Link to="/singup" className="nav-link" >register</Link>
                        </div>
                        <Link to="/login" className="nav-link">
                            <button type="button" className="btn btn-primary">
                                Login
                            </button>
                        </Link>
                    </div>

                    
                </div>   
            )}

            


        </div>
        </nav>
  )
}

export default Hearder