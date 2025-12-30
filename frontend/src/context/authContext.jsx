import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
const userContext = createContext();

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const verifyuser=async()=>{
        try{
          const token=localStorage.getItem("token")
          if(!token){
            setUser(null)
            setLoading(false)
            return;
          }
          const response=await axios.get("https://work-vista-lua88.vercel.app/api/auth/verify",{
            headers:{
              "Authorization":`Bearer ${token}`

            }
          })
          if(response.data.success){
            setUser(response.data.user)
          }

        }
        catch(error){
          if(error.response && error.response.data){
            setUser(null)
          }
        }finally{
          setLoading(false)
        }

      }
      verifyuser()
    },[])
    const login = (user) => {
      setUser(user)
      console.log('AuthContext login user:', user);
    }
    const logout = () => {
      setUser(null)
      localStorage.removeItem("token")
    }
  return (
    <userContext.Provider value={{ user, login, logout, loading}}>
      {children}
    </userContext.Provider>
  )
}
export const useAuth = () => useContext(userContext)
export default AuthContext;
