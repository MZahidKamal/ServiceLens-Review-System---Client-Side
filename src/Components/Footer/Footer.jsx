import { Link, useNavigate } from 'react-router-dom';
import { FaStarHalfAlt } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Footer = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleHowAddingValues = () => {
        // First navigate to home page
        navigate('/');
        // Then after a small delay, scroll to the section
        setTimeout(() => {
            const element = document.getElementById('how-adding-values');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    return (
        <footer className="bg-[#1A237E] text-[#F4F6F7]">
            <div className="container mx-auto px-4 lg:px-0 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <button 
                            onClick={() => handleNavigation('/')}
                            className="flex items-center space-x-2 mb-6"
                        >
                            <FaStarHalfAlt className="text-[#E67E22] text-3xl" />
                            <span className="font-bold text-2xl tracking-tight">
                                Service<span className="text-[#3498DB]">Lens</span>
                            </span>
                        </button>
                        <p className="text-base leading-relaxed text-blue-100">
                            Empowering businesses with insightful service reviews and analytics. 
                            Our AI-powered platform helps companies improve their services through 
                            authentic customer feedback and data-driven decisions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:ml-20">
                        <h3 className="text-xl font-semibold mb-6 text-[#3498DB]">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <button 
                                    onClick={() => handleNavigation('/')}
                                    className="text-blue-100 hover:text-[#E67E22] transition duration-300 flex items-center"
                                >
                                    <span className="w-2 h-2 bg-[#E67E22] rounded-full mr-2"></span>
                                    Home
                                </button>
                            </li>
                            <li>
                                <Link to="/services" className="text-blue-100 hover:text-[#E67E22] transition duration-300 flex items-center">
                                    <span className="w-2 h-2 bg-[#E67E22] rounded-full mr-2"></span>
                                    Services
                                </Link>
                            </li>
                            <li>
                                <button 
                                    onClick={handleHowAddingValues}
                                    className="text-blue-100 hover:text-[#E67E22] transition duration-300 flex items-center"
                                >
                                    <span className="w-2 h-2 bg-[#E67E22] rounded-full mr-2"></span>
                                    How Adding Values
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-[#3498DB]">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-3">
                                <MdEmail className="text-[#E67E22] text-xl" />
                                <span className="text-blue-100">info@servicelens.com</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <MdPhone className="text-[#E67E22] text-xl" />
                                <span className="text-blue-100">+49 176 7325 1642</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MdLocationOn className="text-[#E67E22] text-xl flex-shrink-0 mt-1" />
                                <span className="text-blue-100">
                                    Heddernheimer Landstraße 69,<br/>
                                    60439 Frankfurt am Main,<br/>
                                    Germany
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-blue-800">
                    <p className="text-center text-blue-200">
                        &copy; {new Date().getFullYear()} ServiceLens. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
