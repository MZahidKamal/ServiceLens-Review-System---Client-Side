import { useParams, Link } from 'react-router-dom';
import { FaStar, FaUserCircle, FaCalendarAlt, FaPlusCircle } from 'react-icons/fa';
import useServicesLoader from '../../CustomHooks/useServicesLoader';
import useCompaniesLoader from '../../CustomHooks/useCompaniesLoader';
import useReviewsLoader from '../../CustomHooks/useReviewsLoader';
import {useEffect} from "react";


const ServiceDetails = () => {


    const { serviceId } = useParams();
    const { services } = useServicesLoader();
    const { companies } = useCompaniesLoader();
    const { reviews } = useReviewsLoader();


    const service = services.find(service => service._id === serviceId);
    const company = service ? companies.find(company => company._id === service.companyId) : null;
    const serviceReviews = reviews.filter(review => review.serviceId === serviceId);


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    if (!service) {
        return (
            <div className="text-center mt-10">
                <h1 className="text-3xl font-bold text-gray-700">Service Not Found</h1>
                <p className="text-gray-500 mt-4">Please check the service ID and try again.</p>
                <Link to="/" className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">
                    Back to Home
                </Link>
            </div>
        );
    }


    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="flex flex-col md:flex-row items-center p-8">
                    <div className="md:w-48 md:mr-8 flex-shrink-0">
                        {company && (
                            <div className="w-full h-auto relative">
                                <img src={company.logoURL} alt={company.name} className="w-full h-auto object-contain max-h-24"/>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-2">{company ? company.name : 'Unknown Company'}</div>
                        <h1 className="mt-1 text-3xl font-extrabold text-gray-900 mb-3">{service.serviceName}</h1>
                        <p className="text-lg text-gray-600 mb-5">{service.description}</p>
                        <div className="flex items-center mb-6">
                            <div className="text-2xl font-bold text-indigo-600 mr-4">${service.price.toFixed(2)}</div>
                            <div className="text-sm text-gray-600">per service</div>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-6 bg-indigo-50">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
                        <Link
                            to="/add_new_review"
                            className="inline-flex items-center px-4 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300">
                            <FaPlusCircle className="mr-2" />
                            Add Review
                        </Link>
                    </div>
                    <div className="mb-6 flex justify-start items-center space-x-2">
                        <div className="text-3xl font-bold text-indigo-600">{serviceReviews.length}</div>
                        <div className="text-sm text-gray-600">Total Reviews</div>
                    </div>
                    <div className="space-y-6">
                        {serviceReviews.map((review) => (
                            <div key={review._id} className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <FaUserCircle className="text-indigo-500 text-3xl mr-3" />
                                        <div>
                                            <div className="font-semibold text-gray-800">{review.reviewedBy}</div>
                                            <div className="text-sm text-gray-600 flex items-center">
                                                <FaCalendarAlt className="mr-1" />
                                                {new Date(review.reviewedAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-700 ml-10">{review.reviewText}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ServiceDetails;
