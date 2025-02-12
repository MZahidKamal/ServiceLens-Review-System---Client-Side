import {useContext, useEffect, useState} from 'react';
import { FaUser, FaImage, FaSave, FaTimes } from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import AuthContext from "../../Providers/AuthContext.jsx";


const ProfileUpdate = () => {


    const [formData, setFormData] = useState({
        fullName: '',
        photoUrl: '',
    });


    const {user, updateExistingUsers} = useContext(AuthContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});


    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.displayName,
                photoUrl: user.photoURL,
            });
        }
    }, [user]);


    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'text') {
            setFormData({...formData, [name]: value});
        }
    };


    const validateForm = () => {
        let newErrors = {};
        if (!formData.fullName) {
            newErrors.fullName = 'Display name is required';
        }
        if (!formData.photoUrl) {
            newErrors.photoUrl = 'Photo URL is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {

            /* UPDATING PROFILE THROUGH FIREBASE */
            await updateExistingUsers(formData.fullName, formData.photoUrl);
            event.target.reset();
            setErrors({});
            navigate('/auth/user_profile');
        }
    };


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div className="min-h-[calc(100vh-64px-329px)] bg-gradient-to-br from-[#8E44AD] to-[#3498DB] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full">
                <div className="md:flex">
                    <div className="md:w-1/2 bg-[#8E44AD] p-8 flex flex-col justify-center items-center text-white">
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold mb-2">Update Your Profile</h2>
                            <p className="text-lg opacity-80">Customize your presence on ServeSense</p>
                        </div>
                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
                            <img src={formData.photoUrl} alt="Profile Preview" className="w-full h-full object-cover"/>
                        </div>
                        <p className="text-sm opacity-70">Preview of your profile picture</p>
                    </div>
                    <div className="md:w-1/2 px-8 py-16">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="fullName"
                                        id="fullName"
                                        className="focus:ring-2 focus:ring-[#8E44AD] focus:border-[#8E44AD] block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md"
                                        placeholder="Full name"
                                        value={formData.fullName}
                                        onChange={handleChange}/>
                                </div>
                                {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
                            </div>
                            <div>
                                <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaImage className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="photoUrl"
                                        id="photoUrl"
                                        className="focus:ring-2 focus:ring-[#8E44AD] focus:border-[#8E44AD] block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md"
                                        placeholder="Photo Url"
                                        value={formData.photoUrl}
                                        onChange={handleChange}/>
                                </div>
                                {errors.photoUrl && <p className="mt-2 text-sm text-red-600">{errors.photoUrl}</p>}
                            </div>
                            <div className="flex justify-between items-center pt-4">
                                <Link
                                    to="/auth/user_profile"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#8E44AD] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8E44AD]">
                                    <FaTimes className="mr-2 -ml-1 h-5 w-5" />
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#8E44AD] hover:bg-[#3498DB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8E44AD]">
                                    <FaSave className="mr-2 -ml-1 h-5 w-5" />
                                    Save Changes
                                </button>
                            </div>
                        </form>
                        {errors.submit && <p className="mt-2 text-sm text-red-600">{errors.submit}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ProfileUpdate;
