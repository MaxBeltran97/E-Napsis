import enapsisApi from "@api/enapsisApi"
import { onChecking, onLogin, onLogout } from "@reduxSlices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const useAuthStore = () => {

  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const { status, user } = useSelector(state => state.auth)

  const startLogin = async (userLogin) => {
    dispatch(onChecking())
    console.log(userLogin)
    const { data } = await enapsisApi.post('/login', JSON.stringify(userLogin), { headers: { 'Content-Type': 'application/json' } })
    if (data.ok) {
      console.log(data)
      localStorage.setItem('token', data.token)
      dispatch(onLogin(data.user))
      // navigate('../../', { replace: true })
    }else {
      console.log(data)
      dispatch(onLogout())
    }
  }

  const startCheckAdmin = async () => {
    const { data } = await enapsisApi.get(`/user/role/${user.role}`)
    if (data.ok) {
      if(data.role === 'admin'){
        return true
      }
    }
    return false
  }

  const startCheckTeller = async() => {
    const { data } = await enapsisApi.get(`/user/role/${user.role}`)
    if (data.ok) {
      if(data.role === 'teller'){
        return true
      }
    }
    return false
  }

  return {
    status,
    user,

    startLogin,
    startCheckAdmin,
    startCheckTeller
  }
}
