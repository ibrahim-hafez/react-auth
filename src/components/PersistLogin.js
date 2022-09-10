import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import useRefreshToken from '../hooks/useRefreshToken'
import useAuth from "../hooks/useAuth"

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const refresh = useRefreshToken()
  const { auth, persist } = useAuth()

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false)
      }
    }
    (!auth?.accessToken && persist) ? verifyRefreshToken() : setIsLoading(false)
  }, [])

  return (
    <>
      {!persist
        ? <Outlet />
        : isLoading
          ? <p> Loading...</p>
          : <Outlet />
      }
    </>
  )
}

export default PersistLogin