import {useContext, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import AuthContext from "../../Providers/AuthContext.jsx";
import {FcGoogle} from "react-icons/fc";


const SignIn = () => {


    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });


    const {user, signInExistingUsers, signInWithGoogle} = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };


    const togglePasswordVisibility = () => setShowPassword(!showPassword);


    const validateForm = () => {
        let newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email address is required';
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        else if (!passwordPattern.test(formData.password)) {
            newErrors.password = `Password must contain at least one uppercase letter, one lowercase letter, one number and one special character like @ $ ! % * ? & #.`;
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleSignInButton = async (event) => {
        event.preventDefault();
        if (validateForm()) {

            /* SIGNING IN THROUGH FIREBASE */
            await signInExistingUsers(formData.email, formData.password);
            event.target.reset();
            setErrors({});
        }
    };


    const handleSignInUsingGoogleButton = async (event) => {
        event.preventDefault();

        /* SIGNING IN USING GOOGLE, THROUGH FIREBASE */
        signInWithGoogle();
    };


    useEffect(() => {
        if (user) {
            navigate('/auth/user_profile');
        }
        else navigate('/auth/sign_in');
    }, [navigate, user]);


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div className="min-h-[calc(100vh-64px-329px)] flex items-center justify-center bg-gradient-to-br from-[#8E44AD] to-[#3498DB] p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-xl">
                <h2 className="text-3xl font-bold text-center text-[#8E44AD] mb-8">Sign In</h2>
                <form onSubmit={handleSignInButton} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700"></label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="h-5 w-5 text-gray-400"/>
                            </div>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="focus:ring-2 focus:ring-[#8E44AD] focus:border-[#8E44AD] block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}/>
                        </div>
                        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700"></label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="h-5 w-5 text-gray-400"/>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                className="focus:ring-2 focus:ring-[#8E44AD] focus:border-[#8E44AD] block w-full pl-10 pr-10 py-2 border-gray-300 rounded-md"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}/>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="text-gray-400 focus:outline-none"
                                    aria-label={showPassword ? "Hide password" : "Show password"}>
                                    {showPassword ? <FaEyeSlash className="h-5 w-5"/> : <FaEye className="h-5 w-5"/>}
                                </button>
                            </div>
                        </div>
                        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="rememberMe"
                                type="checkbox"
                                className="h-4 w-4 text-[#8E44AD] focus:ring-[#8E44AD] border-gray-300 rounded"
                                checked={formData.rememberMe}
                                onChange={handleChange}/>
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="hidden text-sm">
                            <Link to="/auth/reset_password" className="font-medium text-[#8E44AD] hover:text-[#3498DB]">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#8E44AD] hover:bg-[#3498DB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8E44AD] transition duration-300">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <FaSignInAlt
                                    className="h-5 w-5 text-[#E67E22] group-hover:text-[#8E44AD] transition duration-300"/>
                            </span>
                            Sign In
                        </button>
                    </div>
                    <p className={'text-sm text-[#8E44AD] text-center'}>OR</p>
                    <div>
                        <button
                            onClick={handleSignInUsingGoogleButton}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#8E44AD] hover:bg-[#3498DB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8E44AD] transition duration-300">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <FcGoogle className="mr-3 h-6 w-6 text-red-500"/>
                            </span>
                            Sign In using Google
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">Do not have an account?{' '}
                    <Link to="/auth/registration" className="font-medium text-[#8E44AD] hover:text-[#3498DB] transition duration-300">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
