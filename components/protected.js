import { Auth } from 'aws-amplify'
import React from 'react'
import {useState, useEffect} from React;
import {useRouter} from 'next/router'
import '../configureAmplify';


export default function Protected() {
  const [user, setUser] = useState(null)
  const router = useRouter()
  useEffect(() => {
    checkUser()
  }, [])
  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser()
      setUser(user)      
    } catch (err) {
      setUser(null)
      router.push('./profile')
      
    }
  }
  if(!user) return null
  return (
    <div>
      <p> Protected route</p>
    </div>
  )
}
