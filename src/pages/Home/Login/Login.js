import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import useToken from "../../../hooks/useToken";

const Login = () => {
  const { loginUserWithEmailPassword,  setUser, user, signInUsingGoogle} = useContext(AuthContext)
  const [error, setError] = useState('');


  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [userEmail, setUserEmail] = useState('')
  const [token] = useToken(userEmail)

  if(token){
    navigate(from, { replace: true })
  }
 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const onSubmit = (data) => {
  const {email, password} = data;
  loginUserWithEmailPassword(email, password)
  .then(result => {
    const user = result.user;
    setUser(user)
    setUserEmail(user.email)
  
  })
  .catch(err => {
    setError(err.message)
    toast.error(err.message)
  })

  reset()
  };


  const loginInUsingGoogle = () => {
    signInUsingGoogle()
    .then(result => {
      const user = result.user;
      console.log(user)
      setUser(user);
      saveUser(user.displayName, user.email)
      
    })
    .catch(err => {
      setError(err.message)
      toast.error(err.message)
      
    })
  }


  const saveUser = (name, email) => {
    const user ={name, email}
    fetch(`http://localhost:5000/user`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setUserEmail(email)
    })
  }



  return (
    <div className="shadow-xl mx-auto lg:w-1/3 rounded-xl p-5 my-10">
         <h1 className="font-bold text-2xl text-center">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center flex-col rounded-xl"
      >
       
        <div className="w-full mt-5">
          <input
           {...register("email", {required: 'Email is required.'})}
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
          />
          <label className="label">
          {errors?.email && <p className="text-primary">{errors?.email?.message}</p>}
          </label>
        </div>

        <div className="w-full mt-5">
          <input
          {...register("password", {required: 'Password is required.'})}
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
          />
          <label className="label">
            {errors?.password && <p className="text-primary">{errors?.password?.message}</p>}
          </label>
        </div>
        
        <input
          type="submit"
          value="Login"
          className="btn btn-primary mt-5 w-full"
        />
      </form>
      <p className="text-center text-primary mt-5">{error}</p>
      <p className="text-center mt-5">New member ? <Link to='/register'>Register here</Link> </p>
      <div className="divider">OR</div>
      <button onClick={loginInUsingGoogle} className="btn btn-outline w-full">Continue With Google</button>
    </div>
  );
};




export default Login;
