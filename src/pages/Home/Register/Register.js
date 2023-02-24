import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import useToken from "../../../hooks/useToken";

const Register = () => {

  const {user, userUpdateProfile, setUser, signInUsingGoogle, registerUserWithEmailPassword} = useContext(AuthContext)
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('')
  const [token] = useToken(userEmail)
  
  const navigate = useNavigate();
  if(token){
    navigate('/')
  }
 
 

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  

  
  const onSubmit = (data) => {
  const {email, password, name} = data;
  
  registerUserWithEmailPassword(email, password)
  .then(result => {
    const user = result.user;
    setUser(user)

    userUpdateProfile(name)
    .then(()=> {
    toast.success(`${user.displayName} registration successfully.`)
    saveUser(name, email)

    })
  })
  .catch(err => {
    setError(err.message)
    toast.success(err.message)
  })

  reset()
  };


  const handleGoogleSignIn = () => {
    signInUsingGoogle()
    .then(result => {
      const user = result.user;
      
      setUser(user)

      saveUser(user.displayName, user.email)
      setUserEmail(user.email)
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
      if(data.acknowledged){
      setUserEmail(email)
      console.log(data.acknowledged);
      }
      
    })
  }


  

  return (
    <div className="shadow-xl mx-auto lg:w-1/3 rounded-xl p-5 my-10">
         <h1 className="font-bold text-2xl text-center">Register</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center flex-col rounded-xl"
      >
        <div className="w-full mt-5">
          <input
            {...register("name", {required: 'Name is required'})} 
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
          />
          <label className="label">
            {errors?.name && <p className="text-primary">{errors?.name?.message}</p>}
          </label>
        </div>
        <div className="w-full mt-5">
          <input
            {...register("email", {required: 'Email is required'})} 
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
              {...register("password", {required: 'Password is required', minLength: {
                value:6,
                message: 'password should be six character or longer.'
              }})} 
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
          value="Register"
          className="btn btn-primary mt-5 w-full"
        />

      </form>
      <p className="text-primary text-center mt-5">{error}</p>
      <p className="text-center mt-5">Already have an account ? <Link to='/login'>Login here</Link> </p>
      <div className="divider">OR</div>
      <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">Continue With Google</button>
    </div>
  );
};

export default Register;