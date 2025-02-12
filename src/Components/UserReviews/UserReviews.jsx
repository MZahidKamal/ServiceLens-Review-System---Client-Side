import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import reviewsData from '../../assets/userReviews.json';

const UserReviews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const reviews = reviewsData.reviews;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
        }, 5000); // Change review every 5 seconds

        return () => clearInterval(timer);
    }, [reviews.length]);

    return (
        <div className="bg-gradient-to-br from-[#1A237E] via-[#311B92] to-[#4A148C] py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center text-white mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    What Our Users Say
                </h2>

                <div className="relative overflow-hidden">
                    <div className="flex justify-center">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-3xl relative border border-white/10"
                        >
                            <FaQuoteLeft className="text-4xl text-blue-400/50 absolute top-4 left-4" />
                            
                            <div className="flex items-center mb-6">
                                <motion.img
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    src={reviews[currentIndex].profilePic}
                                    alt={reviews[currentIndex].name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                                />
                                <div className="ml-4">
                                    <motion.h3
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-xl font-semibold text-blue-200"
                                    >
                                        {reviews[currentIndex].name}
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-blue-100/80"
                                    >
                                        {reviews[currentIndex].position} at {reviews[currentIndex].company}
                                    </motion.p>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex mb-4"
                            >
                                {[...Array(5)].map((_, index) => (
                                    <FaStar
                                        key={index}
                                        className={`${
                                            index < reviews[currentIndex].rating
                                                ? 'text-yellow-400'
                                                : 'text-gray-300'
                                        } text-xl`}
                                    />
                                ))}
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="text-blue-100 text-lg italic"
                            >
                                "{reviews[currentIndex].review}"
                            </motion.p>
                        </motion.div>
                    </div>

                    <div className="flex justify-center mt-8 space-x-2">
                        {reviews.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                                    currentIndex === index ? 'bg-blue-400' : 'bg-blue-900'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserReviews;
