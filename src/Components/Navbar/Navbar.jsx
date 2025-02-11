import {useContext, useState} from 'react';
import {FaHome, FaCog, FaUserPlus, FaSignInAlt, FaBars, FaTimes, FaStarHalfAlt, FaUser, FaPlusCircle, FaComments, FaSignOutAlt, FaCaretDown, FaCogs} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import AuthContext from "../../Providers/AuthContext.jsx";


const Navbar = () => {


    const NavButtonsBeforeSignIn = [
        { to: "/", icon: FaHome, text: "Home" },
        { to: "/services", icon: FaCog, text: "Services" },
        { to: "/auth/registration", icon: FaUserPlus, text: "Register" },
        { to: "/auth/sign_in", icon: FaSignInAlt, text: "Sign In" }
    ];


    const NavButtonsAfterSignIn = [
        { to: "/", icon: FaHome, text: "Home" },
        { to: "/services", icon: FaCogs, text: "Services" },
        { to: "/add_new_service", icon: FaPlusCircle, text: "Add Service" },
        { to: "/add_new_review", icon: FaPlusCircle, text: "Add Review" },
        { to: "/my_services", icon: FaCog, text: "My Services" },
        { to: "/my_reviews", icon: FaComments, text: "My Reviews" },
    ];


    const {user, signOutCurrentUser} = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();


    const handleProfileButton = () => {
        if (user){
            navigate('/auth/user_profile');
            setIsProfileOpen(false);
        }
    }


    const handleSignOutButton = () => {
        if (user){
            signOutCurrentUser();
            setIsProfileOpen(false);
            navigate('/auth/sign_in');
        }
    }


    return (
        <nav className="bg-[#8E44AD] shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 lg:px-0">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <FaStarHalfAlt className="text-[#E67E22] text-3xl" />
                        <span className="text-[#F4F6F7] font-bold text-4xl tracking-tight">Service<span className="text-[#3498DB]">Lens</span></span>
                    </Link>

                    <div className="hidden lg:flex items-center space-x-4">
                        {!user && NavButtonsBeforeSignIn.map((link, index) => (
                            <Link
                                key={index}
                                to={link.to}
                                className="text-[#F4F6F7] hover:bg-[#3498DB] hover:text-[#F4F6F7] px-3 py-2 rounded-md text-base transition duration-300 ease-in-out flex items-center space-x-1">
                                <link.icon />
                                <span>{link.text}</span>
                            </Link>
                        ))}
                        {user && (
                            <>
                                {NavButtonsAfterSignIn.map((link, index) => (
                                    <Link
                                        key={index}
                                        to={link.to}
                                        className="text-[#F4F6F7] hover:bg-[#3498DB] hover:text-[#F4F6F7] px-3 py-2 rounded-md text-base transition duration-300 ease-in-out flex items-center space-x-1">
                                        <link.icon />
                                        <span>{link.text}</span>
                                    </Link>
                                ))}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center space-x-2 text-[#F4F6F7] hover:bg-[#3498DB] px-3 py-2 rounded-md transition duration-300 ease-in-out">
                                        <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full object-cover border-2 border-[#E67E22]"/>
                                        <span className="font-medium">{user.displayName}</span>
                                        <FaCaretDown />
                                    </button>
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                            <button onClick={handleProfileButton} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</button>
                                            <button onClick={handleSignOutButton} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-[#F4F6F7] hover:text-[#F4F6F7] hover:bg-[#3498DB] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F4F6F7] transition duration-300 ease-in-out">
                            {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="lg:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {!user && NavButtonsBeforeSignIn.map((link, index) => (
                            <Link
                                key={index}
                                to={link.to}
                                className="text-[#F4F6F7] hover:bg-[#3498DB] hover:text-[#F4F6F7] block px-3 py-2 rounded-md text-base transition duration-300 ease-in-out">
                                <div className="flex items-center space-x-2">
                                    <link.icon />
                                    <span>{link.text}</span>
                                </div>
                            </Link>
                        ))}
                        {user && (
                            <>
                                {NavButtonsAfterSignIn.map((link, index) => (
                                    <Link
                                        key={index}
                                        to={link.to}
                                        className="text-[#F4F6F7] hover:bg-[#3498DB] hover:text-[#F4F6F7] block px-3 py-2 rounded-md text-base transition duration-300 ease-in-out">
                                        <div className="flex items-center space-x-2">
                                            <link.icon />
                                            <span>{link.text}</span>
                                        </div>
                                    </Link>
                                ))}
                                <div className="border-t border-[#3498DB] mt-2 pt-2">
                                    <div className="flex items-center space-x-2 px-3 py-2">
                                        <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full object-cover border-2 border-[#E67E22]"/>
                                        <div>
                                            <p className="text-[#F4F6F7] font-medium">{user.displayName}</p>
                                            <p className="text-[#F4F6F7] text-sm opacity-75">{user.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleProfileButton}
                                        className="text-[#F4F6F7] hover:bg-[#3498DB] hover:text-[#F4F6F7] block w-full px-3 py-2 rounded-md text-base transition duration-300 ease-in-out">
                                        <div className="flex items-center space-x-2">
                                            <FaUser />
                                            <span>Profile</span>
                                        </div>
                                    </button>
                                    <button
                                        onClick={handleSignOutButton}
                                        className="text-[#F4F6F7] hover:bg-[#3498DB] hover:text-[#F4F6F7] block w-full px-3 py-2 rounded-md text-base transition duration-300 ease-in-out">
                                        <div className="flex items-center space-x-2">
                                            <FaSignOutAlt />
                                            <span>Sign Out</span>
                                        </div>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};


export default Navbar;
