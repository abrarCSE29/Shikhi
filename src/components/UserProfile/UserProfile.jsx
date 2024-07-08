import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext'

export default function UserProfile() {
  const {loggedInUser,setLoggedInUser} = useContext(UserContext);
  return (
    <div>
      <h1>{loggedInUser.name}</h1>
      <h2>{loggedInUser.email}</h2>
    </div>
  )
}
