import { useState, useEffect} from 'react'
import { Auth } from 'aws-amplify';
import '../configureAmplify';
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import ForgotPassword from '../components/ForgotPassword'
import ForgotPasswordSubmit from '../components/ForgotPasswordSubmit'
import ConfirmSignUp from '../components/ConfirmSignUp';


const initialState = {email: '', password: '', authCode: ''}

function Profile() {
  const [uiState, setUiState] = useState(null)
  const [formState, setFormState] = useState(initialState)
  const [user, setUser] = useState(null)
  const { email, password, authCode } = formState
   useEffect(() => {
    checkUser()
    

  }, [])

  async function checkUser(){
    try{
      const user = await Auth.currentAuthenticatedUser()
      setUser(user)
      setUiState('signedIn')

      console.log({user})
    } catch(err) {
      setUser(null)
      setUiState('signIn')
      checkUser()
    }
  }


  function onChange(e) {
    setFormState({...formState, [e.target.name]: e.target.value})
  }
  async function signUp(){
    try {
      await Auth.signUp({
       username:  email, password, attributes: { email }
      })
      setUiState('confirmSignUp')

    } catch(err) {
      console.log({ err })

    }
  }
  async function confirmSignUp(){
    try {
      await Auth.confirmSignUp(email, authCode)
      setUiState('signedIn')
      checkUser() 
      signIn() 
    } catch(err) {
      console.log({ err })

      
    }
  }
  async function signIn(){
    try {
      await Auth.signIn(username, password)
      setUiState('signedIn')
    } catch(err) {
      console.log({ err })

      
    }
  }
  async function forgotPassword(){
    try {
      await Auth.forgotPassword(email)
      setUiState('forgotPasswordSubmit')
    } catch(err) {
      console.log({ err })

      
    }
  }
  async function forgotPasswordSubmit() {
    try {
      await Auth.forgotPasswordSubmit(email, authCode, password)
      setUiState('signIn')
    } catch(err) {
      console.log({ err })

      
    }
  }

  return (
    <div 
      className="bg-gray-50 min-h-screen">      
    <div className="flex felx-col items-center">
      <div className="max-w-full sm:w-640 mt-14">
        <div className="bg-white py-14 px-16 shadow-form rounded">
     
     {uiState === 'signUp' && (
       <SignUp
        onChange={onChange}
        setUiState={setUiState}
        signUp={signUp} />
     )

     }  
     {
       uiState === 'confirmSignUp' && (
         <ConfirmSignUp
         onChange={onChange}
         setUiState={setUiState}
         confirmSignUp={ConfirmSignUp}
          />
       )
     }   
    {
      uiState === 'signIn' && (
        <SignIn
          onChange={onChange}
          setUiState={setUiState}
        />
      )
    }
    {
       uiState === 'forgotPassword' && (
        <ForgotPassword
        onChange={onChange}
        setUiState={setUiState}
        forgotPassword={ forgotPassword }
        />
        )

    }
    {
      uiState === 'forgotPasswordSubmit' && (
        <ForgotPasswordSubmit
          onChange={onChange}
          setUiState={setUiState}
          ForgotPasswordSubmit={ForgotPasswordSubmit}
        />
        )
    }
    {
      uiState === 'signedIn' && (
        <div>
          <p className="text-x1"> Welcome, {user.attributes.email}</p>
          <button 
            className="text-white w-full mt-10 bg-pink-600 p-3 rounded"
            onClick={() => {
              Auth.signOut()
              setUiState('signIn')
              setUser(null)
            }}> SignOut</button>

        </div>
      )
    }
    </div>
    </div>
    </div>
    </div>
  )
}

export default Profile;
