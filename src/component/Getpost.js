import React, { useEffect,useState } from 'react'
import { getDatabase, ref,onValue ,remove} from "firebase/database";
import { XIcon } from '@primer/octicons-react';
import { getAuth } from "firebase/auth";



const Getpost = () => {
    const db = getDatabase();
    const [getPost,setGetPost] = useState()

    const auth = getAuth()
    const user = auth.currentUser

    useEffect(()=>{
        const dbRef = ref(db,"Postusers/");

        onValue(dbRef,(snapshot)=>{
            let records = [];
            snapshot.forEach(childSnapshot=>{
                childSnapshot.forEach(dataSnapshot=>{
                    let key = childSnapshot.key
                    let name = dataSnapshot.val().username
                    let textpost = dataSnapshot.val().textpost
                    let photo = dataSnapshot.val().photo
                    let time = dataSnapshot.val().timeofpost
                    records.push({key,name,textpost,photo,time})
                    
                })
                const rerecord =Array.from(records).reverse()
                setGetPost(rerecord)
            })

        })

    },[db])

    const deleteData = (e)=>{
        const keydelete = e.currentTarget.id
        const dbRef = ref(db,"Postusers/" + keydelete);
        console.log(keydelete);

        onValue(dbRef,(snapshot)=>{
            snapshot.forEach(childSnapshot=>{  
                let postuser = childSnapshot.key
                if (postuser===user.uid){
                    remove(ref(db,'Postusers/' + keydelete))
                    .then(()=>{alert('Delete Success')})
                    .catch((error)=>{alert(error)})
                }else{
                    alert("You can't delete other people's posts. ")
                }
                  
            })

        })
        
    }

    
  return (
    <div>
        {getPost
            ?.map((postdata)=>
            <div className='d-flex justify-content-center ' key={postdata.key} style={{}}>
                <div className='card bg-light mb-3 w-50 rounded'>
                    <div className='m-4 d-flex align-items-center'>
                        <img src={postdata.photo} alt=""
                        className="img-fluid d-block rounded-circle" style={{height: 50}}/>
                        <div className='mx-4 d-flex flex-column w-100'>
                            <h5 className='m-0'>{postdata.name}</h5>
                            <p className='m-0'>{postdata.time}</p>
                        </div>
                        <div className='d-flex justify-content-end w-100 h-100'>
                            <div className='d-flex align-items-start' id={postdata.key} onClick={deleteData} style={{cursor: 'pointer'}} >
                            <XIcon size={16} />
                            </div>
                        </div>
                    </div>
                    <div className='mx-4 mb-4 d-flex flex-column'>
                        <p>{postdata.textpost}</p>
                    </div>
                </div>
            </div>
            )}
    </div>
  )
}

export default Getpost