import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaRedo, FaEye, FaEyeSlash } from 'react-icons/fa';


const ResetPassword = () => {


    const [formData, setFormData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
    });


    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [resetSent, setResetSent] = useState(false);
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);


    const validateForm = () => {
        let newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }

        if (resetSent) {
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
            if (!formData.newPassword) {
                newErrors.newPassword = 'New password is required';
            } else if (!passwordPattern.test(formData.newPassword)) {
                newErrors.newPassword = 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character';
            }

            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Confirm password is required';
            } else if (formData.newPassword !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            if (!resetSent) {
                console.log('Reset email sent to:', formData.email);
                setResetSent(true);
            } else {
                console.log('Password reset:', formData);
                // Here the actual password reset function will come.
                navigate('/auth/sign_in');
            }
        }
    };


    return (
        <div className="min-h-[calc(100vh-64px-329px)] flex items-center justify-center bg-gradient-to-br from-[#8E44AD] to-[#3498DB] p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-xl">
                <h2 className="text-3xl font-bold text-center text-[#8E44AD] mb-8">
                    {resetSent ? 'Reset Password' : 'Forgot Password'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {!resetSent && (
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
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}/>
                            </div>
                            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                        </div>
                    )}

                    {resetSent && (
                        <>
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        name="newPassword"
                                        id="newPassword"
                                        className="focus:ring-2 focus:ring-[#8E44AD] focus:border-[#8E44AD] block w-full pl-10 pr-10 py-2 border-gray-300 rounded-md"
                                        placeholder="Enter new password"
                                        value={formData.newPassword}
                                        onChange={handleChange}/>
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <button
                                            type="button"
                                            onClick={toggleNewPasswordVisibility}
                                            className="text-gray-400 focus:outline-none"
                                            aria-label={showNewPassword ? "Hide password" : "Show password"}>
                                            {showNewPassword ? <FaEyeSlash className="h-5 w-5"/> : <FaEye className="h-5 w-5"/>}
                                        </button>
                                    </div>
                                </div>
                                {errors.newPassword && <p className="mt-2 text-sm text-red-600">{errors.newPassword}</p>}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        className="focus:ring-2 focus:ring-[#8E44AD] focus:border-[#8E44AD] block w-full pl-10 pr-10 py-2 border-gray-300 rounded-md"
                                        placeholder="Confirm new password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}/>
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <button
                                            type="button"
                                            onClick={toggleConfirmPasswordVisibility}
                                            className="text-gray-400 focus:outline-none"
                                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}>
                                            {showConfirmPassword ? <FaEyeSlash className="h-5 w-5"/> : <FaEye className="h-5 w-5"/>}
                                        </button>
                                    </div>
                                </div>
                                {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
                            </div>
                        </>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#8E44AD] hover:bg-[#3498DB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8E44AD] transition duration-300">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <FaRedo className="h-5 w-5 text-[#E67E22] group-hover:text-[#8E44AD] transition duration-300" />
                            </span>
                            {resetSent ? 'Reset Password' : 'Send Reset Link'}
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Remember your password?{' '}
                    <Link to="/auth/sign_in" className="font-medium text-[#8E44AD] hover:text-[#3498DB] transition duration-300">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};


export default ResetPassword;
