import {FaEnvelope, FaPen} from 'react-icons/fa';
import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import AuthContext from "../../Providers/AuthContext.jsx";


const UserProfile = () => {


    const {user} = useContext(AuthContext);


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div className="min-h-[calc(100vh-64px-329px)] bg-gradient-to-br from-[#8E44AD] to-[#3498DB] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-xl w-full">
                <div className="relative h-48 bg-[#8E44AD]">
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <svg className="absolute bottom-0 left-0 right-0" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 1440 320">
                        <path fill="#ffffff" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
                <div className="relative px-8 pb-8 pt-10">
                    <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
                        <img src={user.photoURL} alt={user.displayName} className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"/>
                    </div>
                    <div className="mt-8 flex flex-col justify-center items-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">{user.displayName}</h2>
                        <div className="flex items-center justify-center text-gray-600 mb-6">
                            <FaEnvelope className="mr-2"/>
                            <span>{user.email}</span>
                        </div>
                        <Link
                            to="/auth/profile_update"
                            className="bg-[#8E44AD] hover:bg-[#3498DB] text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#8E44AD] focus:ring-opacity-50 shadow-lg flex items-center justify-center">
                            <FaPen className="mr-2"/>
                            Update Profile
                        </Link>
                    </div>
                </div>
                <div className="bg-gray-50 px-8 py-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Member since: January 2023</span>
                        <span>Last login: 2 days ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default UserProfile;
