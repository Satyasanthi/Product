import { useState,useEffect } from "react";
import './Login.css';
import {Link} from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';

function Login({onLogin,Data}) {
    const images = [
        'Images/Chekaralu.jpg',
        'Images/kakinada kaja.jpg',
        'Images/Lady.jpg',
        'Images/rose.jpg',
      ];
      
      // State to track the current image index
      const [currentIndex, setCurrentIndex] = useState(0);
      const [uemail,setUEmail]=useState("");
      const [upass,setUPass]=useState("");
      const [uerror,setUError]=useState("");
      const dispatch = useDispatch();
      
      useEffect(() => {
        
        const intervalId = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); 
    
        return () => clearInterval(intervalId);
      }, [images.length]);

      const change = async () => {
        try {
          const profile = await axios.post("http://localhost:5000/login", {
            email: uemail,
            password: upass,
          });
          if(uemail==="" || upass===""){
            setUError("Please enter the data");
            return;
          }
          console.log(profile.status);
          if(profile.status===404){
            setUError("User not found");
            return;
          }
          else if(profile.status===400){
            setUError("password is incorrect");
            return;
          }
          else if(profile.data.success){
            alert("successfully Login to page");
            console.log(profile.data);
            onLogin();
            Data();
            dispatch({ type: 'SET_EMAIL', payload: uemail });
            dispatch({ type: 'SET_FIRST_NAME', payload: profile.data.user.first_name });
            dispatch({ type: 'SET_LAST_NAME', payload: profile.data.user.last_name });
            dispatch({ type: 'SET_IMAGE_URL', payload: profile.data.user.imageurl });
            // <Profile state={profile.data.user}/>
            return;
           
          }

        }catch (error) {
          console.error(error);
          return null;
        }
        }
      const handleClick=()=>{
        setUEmail('');
        setUPass(''); 
      }
    return ( 
        <div className="lfull">
           <div className="lpart2">
                    <img src={images[currentIndex]} alt={"satya{images[currentIndex]}"}
                    style={{ width: '300px', height: '300px' }}/>
            </div>
            <div className="lpart1">
                <h3 className="lh2">Login To Your Account</h3>
                {uerror?<p style={{color:"red"}}>{uerror}</p>:<p></p>}
                <div id="l1">
                    <label for="email">Email : </label>
                    <input type="email" name="email" onChange={(e) => setUEmail(e.target.value)} value={uemail}placeholder="Enter email"  required/>
                </div>
                <div id="l1">
                    <label for="password">Password : </label>
                    <input type="password" name="password"onChange={(e) => setUPass(e.target.value)} value={upass} placeholder="Enter password" required/>
                </div>
                <div id="l2">
                    <button type="reset" onClick={handleClick} className="lreset">Reset</button>
                     <button onClick={change} className="llogin">submit</button>
                </div>
                <div id="l2">
                <Link to="/Sign" style={{color:"white"}}><button className="lsign">Sign Up</button></Link>
                </div>
            </div>
        </div>
     );
}

export default Login;