import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
const Header = () => {
  const {isAuthenticated} = useSelector((state) => state.auth);

  return (
    <header>
      <nav className="bg-gray-100 py-3 px-3">
        <ul className="flex gap-3 ">
        {
          !isAuthenticated &&
          (
          <>
          <li>
                <Link className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" to="/">Sign up</Link>
            </li>
            <li>
                <Link className="block px-4 py-2 bg-transparent text-blue border-2 border-blue-600 text-blue-600 rounded" to="/login">Login</Link>
            </li>
          </>
           
          )
        }
        </ul>
      </nav>
    </header>
  )
}

export default Header
