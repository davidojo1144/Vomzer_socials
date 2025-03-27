import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import MainLogin from '../components/MainLogin';
import { auth, googleProvider } from '../firebase.config';
import { signInWithPopup, signOut } from 'firebase/auth';

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Handle user state changes and redirect
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        navigate('/feeds'); // Redirect to feeds after login
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // onAuthStateChanged will handle the redirect
    } catch (error) {
      console.error("Google sign in error:", error);
      alert("Failed to sign in with Google: " + error.message);
    }
  };

  // Sign Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // If user exists, redirect happens automatically via useEffect
  // So we don't need to show the welcome message anymore
  return (
    <div className='container pt-20 md:pt-40'>
      {!user && (
        <>
          <div className='flex flex-col md:flex-row items-center justify-evenly'>
            <img className='animate-bounce md:w-[40%] w-[70%]' src={assets.logo} alt="" />
            <div className=''>
              <div className='flex items-center justify-center mt-10 md:mt-0 space-x-5'>
                <p className='text-center md:text-5xl text-2xl'>{currentState}</p>
                <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
              </div>
              <div className='pt-10 space-y-3'>
                <div 
                  className='flex items-center space-x-8 border-2 border-gray-400 rounded-xl px-7 py-2 cursor-pointer hover:text-gray-500 hover:bg-gray-100 transition'
                  onClick={handleGoogleSignIn}
                >
                  <img className='w-5' src={assets.googlelogo} alt="Google" />
                  <p>Sign in with Google</p>
                </div>
                <div className='flex items-center space-x-8 border-2 bg-blue-500 rounded-xl px-7 py-2 cursor-pointer hover:bg-blue-600 transition'>
                  <img className='w-5' src={assets.facebooklogo} alt="Facebook" />
                  <p className='text-white hover:text-gray-200'>
                    Sign in with Facebook
                  </p>
                </div>
                <div className='flex items-center space-x-8 border-2 rounded-xl px-7 py-2 cursor-pointer bg-black hover:bg-gray-800 transition'>
                  <img className='w-5' src={assets.applelogo} alt="Apple" />
                  <p className='text-white hover:text-gray-200'>
                    Sign in with Apple
                  </p>
                </div>
                <MainLogin currentState={currentState} setCurrentState={setCurrentState}/>
              </div>
            </div>
          </div>
          <p className='text-center text-sm pt-10'>
            By signing up, you agree to the Terms of Service and Privacy <br/>Policy, including Cookie Use.
          </p>
        </>
      )}
    </div>
  );
};

export default Login;