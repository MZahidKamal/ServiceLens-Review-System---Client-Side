import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaStarHalfAlt } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Footer = () => {
    return (
        <footer className="bg-[#8E44AD] text-[#F4F6F7]">
            <div className="container mx-auto px-4 lg:px-0 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div className="mb-8 md:mb-0">
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <FaStarHalfAlt className="text-[#E67E22] text-3xl" />
                            <span
                                className="font-bold text-2xl tracking-tight">
                                Serve<span className="text-[#3498DB]">Sense</span>
                            </span>
                        </Link>
                        <p className="text-base leading-relaxed">Empowering businesses with insightful service reviews and analytics. Elevate your customer experience with ServeSense.</p>
                    </div>

                    <div className={'lg:ml-20'}>
                        <h3 className="text-lg font-semibold mb-4 text-[#3498DB]">Quick Links</h3>
                        <ul className="space-y-2">
                            {['Home', 'Services', 'About Us', 'Contact'].map((item) => (
                                <li key={item}><Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-[#E67E22] transition duration-300">{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div className={'lg:ml-10'}>
                        <h3 className="text-lg font-semibold mb-4 text-[#3498DB]">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center space-x-2"><MdEmail className="text-[#E67E22]" /><span>info@servesense.com</span></li>
                            <li className="flex items-center space-x-2"><MdPhone className="text-[#E67E22]" /><span>+49 176 7325 1642</span></li>
                            <li className="flex items-center space-x-2"><MdLocationOn className="text-[#E67E22]" /><span>Heddernheimer Landstraße 69, <br/>60439 Frankfurt am Main, Germany</span></li>
                        </ul>
                    </div>

                    <div className={'lg:ml-20'}>
                        <h3 className="text-lg font-semibold mb-4 text-[#3498DB]">Follow Us</h3>
                        <div className="flex space-x-4">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                                <a key={index} href="#" className="hover:text-[#E67E22] transition duration-300"><Icon className="text-2xl" /></a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-[#3498DB] text-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} ServeSense. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
