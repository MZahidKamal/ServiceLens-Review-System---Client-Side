import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';

const Banner = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: "Future of Analytics",
            image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3",
            overlayClass: "bg-gradient-to-br from-indigo-600/40 via-purple-600/40 to-pink-500/40",
            features: [
                { 
                    icon: "🎯",
                    title: "Smart Analysis",
                    desc: "AI-powered insights" 
                },
                { 
                    icon: "⚡",
                    title: "Real-time Data",
                    desc: "Instant updates" 
                },
                { 
                    icon: "🔒",
                    title: "Secure Platform",
                    desc: "Enterprise-grade security" 
                }
            ]
        },
        {
            title: "Data Intelligence",
            image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?ixlib=rb-4.0.3",
            overlayClass: "bg-gradient-to-br from-blue-600/40 via-cyan-600/40 to-teal-500/40",
            features: [
                { 
                    icon: "🤖",
                    title: "AI Integration",
                    desc: "Smart automation" 
                },
                { 
                    icon: "📊",
                    title: "Visual Reports",
                    desc: "Clear insights" 
                },
                { 
                    icon: "🔄",
                    title: "Auto Updates",
                    desc: "Always current" 
                }
            ]
        },
        {
            title: "Smart Solutions",
            image: "https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?ixlib=rb-4.0.3",
            overlayClass: "bg-gradient-to-br from-violet-600/40 via-fuchsia-600/40 to-orange-500/40",
            features: [
                { 
                    icon: "💡",
                    title: "Smart Insights",
                    desc: "Intelligent analytics" 
                },
                { 
                    icon: "🚀",
                    title: "Fast Process",
                    desc: "Quick results" 
                },
                { 
                    icon: "🎨",
                    title: "Custom Design",
                    desc: "Tailored for you" 
                }
            ]
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const handleExplore = () => {
        document.getElementById('meet-our-partners').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    };

    const handleGetStarted = () => {
        navigate('/auth/sign_in');
    };

    return (
        <div className="relative h-[calc(100vh-64px)] overflow-hidden bg-black">
            {/* Morphing Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black animate-gradient-xy"></div>
            
            {/* Interactive Particles */}
            <div className="absolute inset-0">
                <div className="relative h-full w-full">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute h-2 w-2 bg-white rounded-full animate-float"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                opacity: 0.1 + Math.random() * 0.3
                            }}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="relative h-full"
                >
                    {/* 3D Parallax Container */}
                    <motion.div 
                        className="absolute inset-0 transform-gpu"
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        <img
                            src={slides[currentSlide].image}
                            alt={slides[currentSlide].title}
                            className="w-full h-full object-cover scale-110"
                        />
                        <div className={`absolute inset-0 ${slides[currentSlide].overlayClass} backdrop-blur-sm`} />
                    </motion.div>

                    {/* Content Container */}
                    <div className="relative z-10 h-full flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-6xl w-full mx-auto"
                        >
                            {/* Glass Card */}
                            <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/10">
                                <motion.h1
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight"
                                >
                                    {slides[currentSlide].title}
                                </motion.h1>

                                {/* Features Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    {slides[currentSlide].features.map((feature, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 + (i * 0.1) }}
                                            className="bg-white/5 p-6 rounded-xl backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                                        >
                                            <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                                                {feature.icon}
                                            </div>
                                            <div className="text-xl font-bold text-white mb-1">{feature.title}</div>
                                            <div className="text-sm text-white/70">{feature.desc}</div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleExplore}
                                        className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-xl text-white font-medium border border-white/20 hover:bg-white/20 transition-all duration-500"
                                    >
                                        Explore Now
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleGetStarted}
                                        className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-500"
                                    >
                                        Get Started
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Banner;
