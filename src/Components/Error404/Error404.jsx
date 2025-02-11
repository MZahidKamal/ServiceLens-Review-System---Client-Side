import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";


const Error404 = () => {
    return (
        <div className="min-h-screen bg-[#0A0F1C] overflow-hidden relative flex items-center justify-center">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1C] via-[#1A1F3C] to-[#2A2F4C] animate-gradient-xy"></div>

            {/* Animated Particles */}
            <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-1 w-1 bg-white rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            scale: 0
                        }}
                        animate={{
                            y: [null, -20, null],
                            scale: [0, 1.5, 0],
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2,
                            times: [0, 0.5, 1]
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 text-center">
                {/* Glitch Effect 404 */}
                <motion.h1
                    className="text-[150px] md:text-[200px] font-bold text-white leading-none tracking-tighter"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        animate={{
                            x: [-2, 2, -2],
                            color: ['#FF6B6B', '#4ECDC4', '#45B7D1']
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    >
                        4
                    </motion.span>
                    <motion.span
                        animate={{
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.2, 1.2, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        className="inline-block text-[#FF6B6B]"
                    >
                        0
                    </motion.span>
                    <motion.span
                        animate={{
                            x: [2, -2, 2],
                            color: ['#45B7D1', '#FF6B6B', '#4ECDC4']
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    >
                        4
                    </motion.span>
                </motion.h1>

                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Lost in Space
                </motion.h2>

                <motion.p
                    className="text-lg text-gray-400 mb-8 max-w-md mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    The page you're looking for has drifted into a digital black hole.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link
                        to="/"
                        className="group relative inline-flex items-center px-8 py-3 overflow-hidden rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#45B7D1] text-white font-medium hover:from-[#FF8787] hover:to-[#4ECDC4] transition-all duration-300"
                    >
                        <span className="absolute left-0 w-0 h-full bg-white/20 transition-all duration-300 group-hover:w-full"></span>
                        <FaHome className="mr-2 relative z-10" />
                        <span className="relative z-10">Return to Home</span>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Error404;
