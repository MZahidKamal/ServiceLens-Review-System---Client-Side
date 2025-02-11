import {useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FaUser, FaEnvelope, FaLock, FaImage, FaCheck, FaEyeSlash, FaEye} from 'react-icons/fa';
import AuthContext from "../../Providers/AuthContext.jsx";


const Registration = () => {


    const [formData, setFormData] = useState({
        fullName: '',
        photoUrl: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });


    const {signUpNewUser} = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'text') {
            setFormData({...formData, [name]: value});
        }
        if (type === 'text') {
            setFormData({...formData, [name]: value});
        }
        if (type === 'email') {
            setFormData({...formData, [name]: value});
        }
        if (type === 'password') {
            setFormData({...formData, [name]: value});
        }
        if (type === 'checkbox') {
            setFormData({...formData, [name]: checked});
        }
    };


    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);


    const validateForm = () => {
        let newErrors = {};

        if (!formData.fullName) {
            newErrors.fullName = 'Full name is required';
        }

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

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords does not match';
        }

        if (!formData.acceptTerms) {
            newErrors.acceptTerms = 'You must accept the terms and conditions';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            //console.log('Form submitted:', formData);
            //console.log(event.target)

            /* SIGNING UP THROUGH FIREBASE */
            await signUpNewUser(formData.fullName, formData.photoUrl, formData.email, formData.password);
            event.target.reset();
            setErrors({});
            navigate('/auth/sign_in');
        }
    };


    return (
        <div className="min-h-[calc(100vh-64px-329px)] flex items-center justify-center bg-gradient-to-br from-[#8E44AD] to-[#3498DB] p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-xl">
                <h2 className="text-3xl font-bold text-center text-[#8E44AD] mb-8">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700"></label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUser className="h-5 w-5 text-gray-400"/>
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
                        {errors.fullName && <p className="mt-2 text-sm text-red-700">{errors.fullName}</p>}
                    </div>

                    <div>
                        <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700"></label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaImage className="h-5 w-5 text-gray-400"/>
                            </div>
                            <input
                                type="text"
                                name="photoUrl"
                                id="photoUrl"
                                className="focus:ring-2 focus:ring-[#8E44AD] focus:border-[#8E44AD] block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md"
                                placeholder="Photo URL"
                                value={formData.photoUrl}
                                onChange={handleChange}/>
                        </div>
                        {errors.photoUrl && <p className="mt-2 text-sm text-red-700">{errors.photoUrl}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700"></label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="focus:ring-2 focus:ring-[#8E44AD] focus:border-[#8E44AD] block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}/>
                        </div>
                        {errors.email && <p className="mt-2 text-sm text-red-700">{errors.email}</p>}
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
                                className="focus:ring-2 focus:ring-[#8E44AD] focus:border-[#8E44AD] block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}/>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                    type="button" onClick={togglePasswordVisibility}
                                    className="text-gray-400 focus:outline-none"
                                    aria-label={showPassword ? "Hide password" : "Show password"}>
                                    {showPassword ? <FaEyeSlash className="h-5 w-5"/> : <FaEye className="h-5 w-5"/>}
                                </button>
                            </div>
                        </div>
                        {errors.password && <p className="mt-2 text-sm text-red-700">{errors.password}</p>}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700"></label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="h-5 w-5 text-gray-400"/>
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                className="focus:ring-2 focus:ring-[#8E44AD] focus:border-[#8E44AD] block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}/>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                    type="button" onClick={toggleConfirmPasswordVisibility}
                                    className="text-gray-400 focus:outline-none"
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}>
                                    {showConfirmPassword ? <FaEyeSlash className="h-5 w-5"/> : <FaEye className="h-5 w-5"/>}
                                </button>
                            </div>
                        </div>
                        {errors.confirmPassword &&
                            <p className="mt-2 text-sm text-red-700">{errors.confirmPassword}</p>}
                    </div>

                    <div className="flex items-center">
                        <input
                            id="acceptTerms"
                            name="acceptTerms"
                            type="checkbox"
                            className="h-4 w-4 text-[#8E44AD] focus:ring-[#8E44AD] border-gray-300 rounded"
                            checked={formData.acceptTerms}
                            onChange={handleChange}/>
                        <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-900">I accept the terms and conditions</label>
                    </div>
                    {errors.acceptTerms && <p className="mt-2 text-sm text-red-700">{errors.acceptTerms}</p>}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#8E44AD] hover:bg-[#3498DB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8E44AD] transition duration-300">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <FaCheck className="h-5 w-5 text-[#E67E22] group-hover:text-[#8E44AD] transition duration-300"/>
                            </span>
                            Register
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already registered?{' '}
                    <Link to="/auth/sign_in" className="font-medium text-[#8E44AD] hover:text-[#3498DB] transition duration-300">Sign In</Link>
                </p>
            </div>
        </div>
    );
};


export default Registration;
