import { useState } from 'react';
import { FaPaperPlane, FaBell, FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';


const Newsletter = () => {


    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);


    const handleSubmit = (event) => {
        event.preventDefault();
        //TODO: Here we'll send the email to your backend
        console.log('Subscribing email:', email);
        setIsSubmitted(true);
        setEmail('');
        setTimeout(() => setIsSubmitted(false), 5000);
    };


    return (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-grid-white-300/[0.2] bg-grid-white-300/[0.2]" style={{ backgroundSize: '30px 30px' }}></div>
            </div>
            <div className="max-w-4xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <FaBell className="mx-auto h-12 w-12 text-yellow-300 mb-4" />
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Stay Updated with ServiceLens</h2>
                    <p className="mt-4 text-lg leading-6 text-indigo-200">Subscribe to our newsletter for the latest insights, tips, and trends in service excellence.</p>
                </motion.div>
                <div className="mt-12">
                    <form onSubmit={handleSubmit} className="sm:flex">
                        <div className="min-w-0 flex-1">
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="block w-full rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10"
                            >
                                <FaPaperPlane className="inline-block mr-2" />
                                Subscribe
                            </motion.button>
                        </div>
                    </form>
                </div>
                <AnimatePresence>
                    {isSubmitted && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mt-6 bg-green-500 bg-opacity-90 text-white p-4 rounded-md flex items-center justify-center"
                        >
                            <FaCheckCircle className="mr-2" />
                            <span>Thank you for subscribing!</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Newsletter;
