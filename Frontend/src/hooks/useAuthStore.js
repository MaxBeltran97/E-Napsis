import enapsisApi from "@api/enapsisApi"
import { onChecking, onLogin, onLogout } from "@reduxSlices/authSlice"
import { useDispatch, useSelector } from "react-redux"

export const useAuthStore = () => {

  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const { status, user } = useSelector(state => state.auth)

  const startLogin = async (userLogin) => {
    dispatch(onChecking())

    try {
      const { data } = await enapsisApi.post('/login', JSON.stringify(userLogin), { headers: { 'Content-Type': 'application/json' } })
      if (data.ok) {
        console.log(data)
        localStorage.setItem('token', data.token)
        localStorage.setItem('token-init-date', new Date().setTime())
        dispatch(onLogin(data.user))
        // navigate('../../', { replace: true })
      } else {
        console.log(data)
        dispatch(onLogout())
      }
    } catch (error) {
      console.log(error.response)
      dispatch(onLogout())
    }
  }

  const startCheckAuthToken = async () => {
    
  }

  const startLogout = async () => {
    localStorage.clear()
    dispatch(onLogout())
  }

  const startCheckRole = async (rolesAllowed=[]) => {
    if(rolesAllowed.length === 0) {
      return true
    }
    const { data } = await enapsisApi.get(`/user/role/${user.role}`)
    if(data.ok) {
      if(rolesAllowed.includes(data.role)) {
        return true
      }
    }
    return false
  }

  const startCheckAdmin = async () => {
    const { data } = await enapsisApi.get(`/user/role/${user.role}`)
    if (data.ok) {
      if (data.role === 'admin') {
        return true
      }
    }
    return false
  }

  const startCheckTeller = async () => {
    const { data } = await enapsisApi.get(`/user/role/${user.role}`)
    if (data.ok) {
      if (data.role === 'teller') {
        return true
      }
    }
    return false
  }

  return {
    status,
    user,

    startLogin,
    startLogout,
    startCheckAdmin,
    startCheckTeller,
    startCheckRole
  }
}
