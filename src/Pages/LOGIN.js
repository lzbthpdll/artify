import React, {useState} from 'react'

import {useHistory} from "react-router-dom"
import firebase from "../Utils/firebase";
import bg from "../Pages/hoho.jpg";

export default function LOGIN(){
    const [load, setLoad] = useState({
        email: "",
        pass: "",
        confirmpass: "",
    });

    const history = useHistory();

    const handleChange =(prop) =>(e) =>{
        setLoad({...load, [prop]: e.target.value});

    };
    const Login=(e)=>{
            e.preventDefault();
            if(!load.email || !load.pass){
                alert("Complete the information");
            }
            else{
                firebase.auth().signInWithEmailAndPassword(load.email, load.pass)
                .then((signedInUser)=>{
                        history.push("/Home");
                })
                .catch((err)=>{
                    let errorMessage = err.message;
                        alert(errorMessage);
                });
            }
    }


//register
    const REGISTER=(e)=>{
            e.preventDefault();
        if(!load.email || !load.pass || !load.confirmpass){
            alert("Complete the information");
        }
        else if( load.pass !== load.confirmpass){
            alert("Password and Confirm Password are not the same!");
        }
        else if( load.pass.length <5){
            alert("Password should be at least 6 characters!");
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(load.email, load.pass)
            .then((signedInUser)=>{
                    alert("YOU ARE SUCCESSFULLY REGISTERED" + signedInUser.user.email);
                    console.log(signedInUser.user);
                    history.push("/LOGIN");
            })
            .catch((err)=>{
                let errorMessage = err.message;
                    alert(errorMessage);
            });
        }
    };

    return(
        <div class="ground">
            <div>
                <div>   
                    <div class="container">
                        <input type="checkbox" id="flip" />
                        <div class="cover">
                        <div class="front">
                        
                            <img src={bg} alt=""></img>   
                            <div class="text">
                            <span class="text-1">Every new friend is a <br></br> new adventure</span>
                            <span class="text-2">Let's get connected</span>
                            </div>
                        </div>
                        <div class="back">
                            <img class="backImg" src={bg} alt="" />
                            <div class="text">
                            <span class="text-1">Complete miles of journey <br></br> with one step</span>
                            <span class="text-2">Let's get started</span>
                            </div>
                        </div>
                        </div>
                    
                    <form noValidate action = "#">
                    <div class="form-content">
                            <div class="login-form">
                            <div class="title">Login</div>
                            <div class="input-boxes">
                                <div class="input-box">
                                <i class="fas fa-envelope"></i>
                                <input type="email" name="email"
                                 placeholder="Enter your email" 
                                 required
                                 value={load.email} 
                                 onChange={handleChange("email")}  />
                                </div>

                                <div class="input-box">
                                <i class="fas fa-lock"></i>
                                <input type="password" 
                                name="pass"
                                placeholder="Enter your password" 
                                required
                                value={load.pass} 
                                onChange={handleChange("pass")} />
                                </div>

                                <div class="text"><button style={{border: "none"}} href="">Forgot password?</button></div>
                                <div class="button input-box">
                                <input type="submit" value="Submit" onClick={Login} />
                                </div>
                                <div class="text sign-up-text">Don't have an account? <label for="flip">Signup now</label></div>
                            
                            </div>
                            </div>
                            <div class="signup-form">
                            <div class="title">Signup</div>
                            <div class="input-boxes">

                                <div class="input-box">
                                <i class="fas fa-envelope"></i>
                                <input type="email" name="email" 
                                 placeholder="Enter your email"
                                 required 
                                 value={load.email} 
                                 onChange={handleChange("email")} />
                                </div>
                                
                                <div class="input-box">
                                <i class="fas fa-lock"></i>
                                <input type="password"
                                 placeholder="Enter your password"
                                 required
                                 name="pass"
                                 value={load.pass} 
                                 onChange={handleChange("pass")} />
                                </div>

                                <div class="input-box">
                                <i class="fas fa-lock"></i>
                                <input type="password" placeholder="Confirm your password"
                                 required
                                 name="confirmpass"
                                 value={load.confirmpass} 
                                 onChange={handleChange("confirmpass")} />
                                </div>

                                <div class="button input-box">
                                <input type="submit" value="Submit" onClick={REGISTER}/>
                                </div>
                                <div class="text sign-up-text">Already have an account? <label for="flip">Login now</label></div>
                            </div>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )

}