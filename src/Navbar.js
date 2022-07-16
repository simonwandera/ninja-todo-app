import { Link } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "./contexts/UserContext";
const Navbar = () =>{
    const {userProfile, setUserProfile} = useContext(userContext)

    console.log(userProfile)

    return (
        <nav className="navbar">
            <h1>The Dojo Blog</h1>
            <div className="links">
                <Link to="">Home</Link>
                <Link to="create" >New Blog</Link>
                {userProfile && userProfile.usertype === 'ADMIN' && <Link to="admin" >Admin</Link>}
                <Link to="login" >Login</Link>
            </div>
        </nav>
    )
}
export default Navbar;
