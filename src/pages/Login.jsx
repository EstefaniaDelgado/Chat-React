import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


function Login() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const[inputs,setInputs]= useState({
    email:"",
    password:""
  });
  

  const[errors, setErrors]=useState({})

  const handlerChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
   /*  setErrors(
      validation( {
        ...inputs,
        [e.target.name]: e.target.value,
      })
    ); */
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat</span>
        <span className="title">Login</span>

        <form onSubmit={handlerSubmit}>
          <input type="email" placeholder="email" value={inputs.email} name="email" onChange={handlerChange} />
          {errors.email && <p>{errors.email}</p> }
          <input type="password" placeholder="password" value={inputs.password} name="password" onChange={handlerChange}/>
          {errors.password && <p>{errors.password}</p> }
          <button>Sign in</button>
          {error && <span>Something went wrong</span>}
        </form>

        <p>
          You don't have an account?<Link to={"/register"}>Register</Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default Login;
