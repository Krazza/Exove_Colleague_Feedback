
import React, { useState, FormEvent} from "react";
import { useDispatch } from "react-redux";
import './styles/Signup.css'
import { Button } from "react-bootstrap";
import { Link} from "react-router-dom";
import './styles/Signup.css';
import { signup } from "../features/slices/signupSlice";


const Signup: React.FC = () => {
  
  const [email, setEmail] = useState <string> ("");
  const [password, setPassword] = useState <string> ("");
  const [confirmPassword, setConfirmPassword] = useState <string> ("");


  const dispatch = useDispatch();


  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(
      signup({  
        email: email,
        password: password,
        loggedIn: true,
      })
    );
  };
return (
    <div className="signup">

<header className="signup_header">
    
    <h1>Colleague Feedback</h1>
  </header>
     <form className="signup__form" onSubmit={(e) => handleSubmit(e)}>
        <h1>SIGNUP</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

       <Button className= "signup__btn" onClick={signup}>Signup</Button>
       <div className="link">
        <h3>Already have an account?  <Link to="/login">Login</Link> now.</h3>
       </div>

        

      </form>
    </div>
  );
};
export default Signup;


