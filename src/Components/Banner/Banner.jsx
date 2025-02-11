import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaStar, FaChartLine, FaUsers } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const Banner = () => {


    const slides = [
        {
            title: "Elevate Your Service Experience",
            description: "Gain valuable insights and improve customer satisfaction with ServiceLens",
            icon: FaStar,
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        },
        {
            title: "Data-Driven Decision Making",
            description: "Harness the power of analytics to make informed business choices",
            icon: FaChartLine,
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80",
        },
        {
            title: "Build Customer Loyalty",
            description: "Transform feedback into lasting relationships with ServiceLens",
            icon: FaUsers,
            image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        },
    ];


    return (
        <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-full w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#8E44AD] to-[#3498DB] opacity-70 z-10"></div>
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4 sm:px-6 lg:px-8">
                            <slide.icon className="text-6xl mb-4 text-[#E67E22]" />
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center">
                                {slide.title}
                            </h2>
                            <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-center max-w-3xl">
                                {slide.description}
                            </p>
                            <button className="bg-[#E67E22] hover:bg-[#D35400] text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:ring-opacity-50">
                                Get Started
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};


export default Banner;
