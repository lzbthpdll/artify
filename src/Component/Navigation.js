import React,{useState, useEffect} from 'react';

import {Link} from "react-router-dom";

import "./Navigation.css";

export default function Navigation() {
    const [clock, setClockstate] = useState();
    
    useEffect(()=>{
        setInterval(()=>{
            const date = new Date();
            setClockstate(date.toLocaleTimeString());
        }, 1000);
    }, []);
    return (
        <div>
            <nav>
                    <h1>{clock}</h1>
                <ul>
                    <li><Link to="/HOME">Global Chat</Link></li>
                    <li> <Link to="/ArtPost">ArtPost</Link></li>
                    <li> <Link to="/LOGIN">SIGNOUT</Link></li>
                </ul>
            </nav>
        </div>
    )
}

