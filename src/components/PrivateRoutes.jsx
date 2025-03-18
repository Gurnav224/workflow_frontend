import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const PrivateRoutes = ({children}) => {
    const { token } = useSelector((state) => state.auth)
  return  token ? children : <Navigate to={'/login'} />
   
}

export default PrivateRoutes
