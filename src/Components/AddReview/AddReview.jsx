import {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaPlus, FaStar, FaComments, FaBuilding, FaCogs } from 'react-icons/fa';
import useCompaniesLoader from "../../CustomHooks/useCompaniesLoader.jsx";
import useServicesLoader from "../../CustomHooks/useServicesLoader.jsx";
import useReviewsLoader from "../../CustomHooks/useReviewsLoader.jsx";
import AuthContext from "../../Providers/AuthContext.jsx";


const AddReview = () => {


    const {user} = useContext(AuthContext);
    const { companies, companiesLoading } = useCompaniesLoader();
    const { services, servicesLoading } = useServicesLoader();
    const { reviews, reviewsLoading, createNewReviewInDatabase } = useReviewsLoader();
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [companySearch, setCompanySearch] = useState('');
    const [serviceSearch, setServiceSearch] = useState('');
    const [newReview, setNewReview] = useState({
        reviewText: '',
        rating: 0,
        reviewedBy: '',
        reviewedAt: '',
        serviceId: '',
        companyId: ''
    });
    const [errors, setErrors] = useState({}); // Added error state
    const navigate = useNavigate();


    const filteredCompanies = companies?.filter(company =>
        company.name.toLowerCase().includes(companySearch.toLowerCase())
    );


    const filteredServices = services?.filter(service =>
        service.serviceName.toLowerCase().includes(serviceSearch.toLowerCase()) &&
        service.companyId === selectedCompany?._id
    );


    const filteredReviews = reviews?.filter(review =>
        review.serviceId === selectedService?._id &&
        review.companyId === selectedCompany?._id
    );


    const handleCompanySelect = (company) => {
        setSelectedCompany(company);
        setSelectedService(null);
        setServiceSearch('');
    };


    const handleServiceSelect = (service) => {
        setSelectedService(service);
    };


    const handleAddNewCompany = () => {
        navigate('/add_new_company');
    };


    const handleAddNewService = () => {
        navigate('/add_new_service');
    };

    const validateForm = () => {
        let newErrors = {};
        if (newReview.rating === 0) {
            newErrors.rating = 'Please select a rating';
        }
        if (!newReview.reviewText.trim()) {
            newErrors.reviewText = 'Please enter a review';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleReviewSubmit = async (event) => {
        event.preventDefault();
        if (user && validateForm()) {

            newReview.reviewedBy = user?.email;
            newReview.reviewedAt = new Date().toISOString();
            newReview.serviceId = selectedService?._id;
            newReview.companyId = selectedCompany?._id;
            //console.log('Submitting review:', newReview);

            // Here you would typically send the data to your backend
            await createNewReviewInDatabase(newReview);

            setErrors({});
            navigate('/my_reviews');
        }
    };


    return (
        <div className="min-h-[calc(100vh-64px-329px)] bg-gradient-to-br from-[#1A237E] to-[#0D47A1] p-4 md:p-8">
            <div className="max-w-6xl mx-auto bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-8">
                    <h1 className="text-4xl font-bold text-white mb-8 text-center">Add a Review</h1>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Company Selection */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-[#64B5F6] mb-4 flex items-center">
                                <FaBuilding className="mr-2" /> Select a Company
                            </h2>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for a company..."
                                    value={companySearch}
                                    onChange={(e) => setCompanySearch(e.target.value)}
                                    className="w-full p-4 bg-white bg-opacity-20 border border-blue-300 rounded-lg focus:ring-2 focus:ring-[#64B5F6] focus:border-transparent text-white placeholder-blue-200"
                                />
                                <FaSearch className="absolute right-3 top-4 text-blue-300" />
                            </div>
                            {companiesLoading ? (
                                <p className="text-blue-200">Loading companies...</p>
                            ) : (
                                <ul className="mt-2 max-h-60 overflow-y-auto space-y-2">
                                    {filteredCompanies?.map(company => (
                                        <li
                                            key={company._id}
                                            onClick={() => handleCompanySelect(company)}
                                            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                                                selectedCompany?._id === company._id
                                                    ? 'bg-[#64B5F6] text-white'
                                                    : 'bg-white bg-opacity-20 text-blue-100 hover:bg-opacity-30'
                                            }`}
                                        >
                                            {company.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <button
                                onClick={handleAddNewCompany}
                                className="w-full p-3 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1976D2] transition duration-300 flex items-center justify-center"
                            >
                                <FaPlus className="mr-2" /> Entry New Company
                            </button>
                        </div>

                        {/* Service Selection */}
                        {selectedCompany && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-semibold text-[#64B5F6] mb-4 flex items-center">
                                    <FaCogs className="mr-2" /> Select a Service
                                </h2>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search for a service..."
                                        value={serviceSearch}
                                        onChange={(e) => setServiceSearch(e.target.value)}
                                        className="w-full p-4 bg-white bg-opacity-20 border border-blue-300 rounded-lg focus:ring-2 focus:ring-[#64B5F6] focus:border-transparent text-white placeholder-blue-200"
                                    />
                                    <FaSearch className="absolute right-3 top-4 text-blue-300" />
                                </div>
                                {servicesLoading ? (
                                    <p className="text-blue-200">Loading services...</p>
                                ) : (
                                    <ul className="mt-2 max-h-60 overflow-y-auto space-y-2">
                                        {filteredServices?.map(service => (
                                            <li
                                                key={service._id}
                                                onClick={() => handleServiceSelect(service)}
                                                className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                                                    selectedService?._id === service._id
                                                        ? 'bg-[#64B5F6] text-white'
                                                        : 'bg-white bg-opacity-20 text-blue-100 hover:bg-opacity-30'
                                                }`}
                                            >
                                                {service.serviceName}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <button
                                    onClick={handleAddNewService}
                                    className="w-full p-3 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1976D2] transition duration-300 flex items-center justify-center"
                                >
                                    <FaPlus className="mr-2" /> Entry New Service
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Reviews Section */}
                    {selectedService && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-semibold text-[#64B5F6] mb-6 flex items-center">
                                <FaComments className="mr-2" /> Reviews for {selectedService.serviceName}
                            </h2>
                            {reviewsLoading ? (
                                <p className="text-blue-200">Loading reviews...</p>
                            ) : filteredReviews && filteredReviews.length > 0 ? (
                                <div className="space-y-6 mb-8">
                                    {filteredReviews.map(review => (
                                        <div key={review._id} className="bg-white bg-opacity-20 p-6 rounded-xl backdrop-filter backdrop-blur-sm">
                                            <div className="flex items-center mb-3">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-400"} />
                                                ))}
                                            </div>
                                            <p className="text-white mb-3">{review.reviewText}</p>
                                            <div className="flex justify-between text-sm text-blue-200">
                                                <p>Reviewed by: {review.reviewedBy}</p>
                                                <p>Date: {new Date(review.reviewedAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-blue-200 mb-6">No reviews available for this service.</p>
                            )}

                            {/* Add New Review Form */}
                            <form onSubmit={handleReviewSubmit} className="space-y-6 bg-white bg-opacity-20 p-6 rounded-xl backdrop-filter backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-[#64B5F6]">Add Your Review</h3>
                                <div className="flex items-center space-x-2 mb-4">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            className={`cursor-pointer text-3xl transition-colors duration-200 ${
                                                index < newReview.rating ? "text-yellow-400" : "text-gray-400"
                                            }`}
                                            onClick={() => setNewReview({ ...newReview, rating: index + 1 })}
                                        />
                                    ))}
                                </div>
                                {errors.rating && <p className="text-red-500 text-sm mb-2">{errors.rating}</p>} {/* Added error display */}
                                <textarea
                                    value={newReview.reviewText}
                                    onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
                                    placeholder="Write your review here..."
                                    className="w-full p-4 bg-white bg-opacity-20 border border-blue-300 rounded-lg focus:ring-2 focus:ring-[#64B5F6] focus:border-transparent text-white placeholder-blue-200"
                                    rows="4"
                                ></textarea>
                                {errors.reviewText && <p className="text-red-500 text-sm mt-2">{errors.reviewText}</p>} {/* Added error display */}
                                <button
                                    type="submit"
                                    className="w-full p-4 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1976D2] transition duration-300 flex items-center justify-center"
                                >
                                    <FaComments className="mr-2" /> Submit Review
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default AddReview;
