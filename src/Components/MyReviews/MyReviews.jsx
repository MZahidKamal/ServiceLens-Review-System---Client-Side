import { useState, useContext } from 'react';
import { FaStar, FaEdit, FaTrash, FaChevronDown, FaChevronUp, FaCogs } from 'react-icons/fa';
import Swal from 'sweetalert2';
import AuthContext from "../../Providers/AuthContext.jsx";
import useCompaniesLoader from "../../CustomHooks/useCompaniesLoader.jsx";
import useServicesLoader from "../../CustomHooks/useServicesLoader.jsx";
import useReviewsLoader from "../../CustomHooks/useReviewsLoader.jsx";
import UpdateReviewModal from '../UpdateReviewModal/UpdateReviewModal.jsx';
import UpdateServiceModal from '../UpdateServiceModal/UpdateServiceModal.jsx';
import UpdateCompanyModal from '../UpdateCompanyModal/UpdateCompanyModal.jsx';


const MyReviews = () => {


    const { user } = useContext(AuthContext);
    const { companies, deleteCompanyFromDatabase, updateCompanyInDatabase } = useCompaniesLoader();
    const { services, deleteServiceFromDatabase, updateServiceInDatabase } = useServicesLoader();
    const { reviews, deleteReviewFromDatabase, updateReviewInDatabase } = useReviewsLoader();
    const [expandedCompanies, setExpandedCompanies] = useState({});
    const [isUpdateReviewModalOpen, setIsUpdateReviewModalOpen] = useState(false);
    const [isUpdateServiceModalOpen, setIsUpdateServiceModalOpen] = useState(false);
    const [isUpdateCompanyModalOpen, setIsUpdateCompanyModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const userReviews = reviews.filter(review => review.reviewedBy === user?.email);


    const groupedReviews = userReviews.reduce((acc, review) => {
        const company = companies.find(c => c._id === review.companyId);
        const service = services.find(s => s._id === review.serviceId);

        if (!acc[review.companyId]) {
            acc[review.companyId] = { company, services: {} };
        }

        if (!acc[review.companyId].services[review.serviceId]) {
            acc[review.companyId].services[review.serviceId] = { service, reviews: [] };
        }

        acc[review.companyId].services[review.serviceId].reviews.push(review);
        return acc;
    }, {});


    const toggleCompanyExpansion = (companyId) => {
        setExpandedCompanies(prev => ({
            ...prev,
            [companyId]: !prev[companyId]
        }));
    };


    const handleDeleteCompany = async (companyId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCompanyFromDatabase(companyId).then(() => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "The company has been deleted.",
                        icon: "success"
                    });
                });
            }
        });
    };


    const handleDeleteService = async (serviceId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteServiceFromDatabase(serviceId).then(() => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "The service has been deleted.",
                        icon: "success"
                    });
                });
            }
        });
    };


    const handleDeleteReview = async (reviewId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteReviewFromDatabase(reviewId).then(() => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your review has been deleted.",
                        icon: "success"
                    });
                });
            }
        });
    };



    const handleUpdateCompany = (company) => {
        setSelectedCompany(company);
        setIsUpdateCompanyModalOpen(true);
    };
    const handleCompanyUpdate = async (updatedCompany) => {
        await updateCompanyInDatabase(updatedCompany);
    };



    const handleUpdateService = (service) => {
        setSelectedService(service);
        setIsUpdateServiceModalOpen(true);
    };
    const handleServiceUpdate = async (updatedService) => {
        await updateServiceInDatabase(updatedService);
    };



    const handleUpdateReview = (review) => {
        setSelectedReview(review);
        setIsUpdateReviewModalOpen(true);
    };
    const handleReviewUpdate = async (updatedReview) => {
        await updateReviewInDatabase(updatedReview);
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">My Reviews</h1>

                {Object.entries(groupedReviews).map(([companyId, { company, services }]) => (
                    <div key={companyId} className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-blue-500/30">
                        <div className="p-6 flex items-center justify-between cursor-pointer" onClick={() => toggleCompanyExpansion(companyId)}>
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 rounded-full bg-white p-1 shadow-lg">
                                    <img src={company?.logoURL} alt={company?.name} className="w-full h-full rounded-full object-contain" />
                                </div>
                                <h2 className="text-2xl font-semibold text-white">{company?.name}</h2>
                            </div>
                            <div className="flex items-center space-x-4">
                                {company?.createdBy === user?.email && (
                                    <>
                                        <button onClick={(e) => { e.stopPropagation(); handleUpdateCompany(company); }} className="text-blue-300 hover:text-blue-100 transition-colors">
                                            <FaEdit size={20} />
                                        </button>
                                        <button onClick={(e) => { e.stopPropagation(); handleDeleteCompany(companyId); }} className="text-red-300 hover:text-red-100 transition-colors">
                                            <FaTrash size={20} />
                                        </button>
                                    </>
                                )}
                                {expandedCompanies[companyId] ? <FaChevronUp className="text-white" /> : <FaChevronDown className="text-white" />}
                            </div>
                        </div>

                        {expandedCompanies[companyId] && (
                            <div className="px-6 pb-6 space-y-4">
                                <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center">
                                    <FaCogs className="mr-2" /> Services
                                </h3>
                                {Object.entries(services).map(([serviceId, { service, reviews }]) => (
                                    <div key={serviceId} className="bg-gray-700 bg-opacity-50 rounded-xl p-4 transition-all duration-300 hover:bg-opacity-70">
                                        <div className="flex justify-between items-center mb-3">
                                            <div>
                                                <h4 className="text-lg font-medium text-white">{service.serviceName}</h4>
                                                <p className="text-blue-200 text-sm">{service.description}</p>
                                                <p className="text-green-300 font-semibold mt-1">€{service.price}</p>
                                            </div>
                                            {service.createdBy === user?.email && (
                                                <div className="flex space-x-2">
                                                    <button onClick={() => handleUpdateService(service)} className="text-blue-300 hover:text-blue-100 transition-colors">
                                                        <FaEdit size={16} />
                                                    </button>
                                                    <button onClick={() => handleDeleteService(serviceId)} className="text-red-300 hover:text-red-100 transition-colors">
                                                        <FaTrash size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <h5 className="text-md font-semibold text-purple-300 mt-4 mb-2 flex items-center">
                                            <FaStar className="mr-2" /> Reviews
                                        </h5>
                                        <div className="space-y-3">
                                            {reviews.map(review => (
                                                <div key={review._id} className="bg-gray-800 bg-opacity-70 rounded-lg p-3 transition-all duration-300 hover:bg-opacity-90">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <div className="flex items-center mb-1">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-400"} />
                                                                ))}
                                                            </div>
                                                            <p className="text-white text-sm">{review.reviewText}</p>
                                                            <p className="text-blue-200 text-xs mt-1">{new Date(review.reviewedAt).toLocaleDateString()}</p>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            <button onClick={() => handleUpdateReview(review)} className="text-blue-300 hover:text-blue-100 transition-colors">
                                                                <FaEdit size={14} />
                                                            </button>
                                                            <button onClick={() => handleDeleteReview(review._id)} className="text-red-300 hover:text-red-100 transition-colors">
                                                                <FaTrash size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <UpdateCompanyModal
                isOpen={isUpdateCompanyModalOpen}
                onClose={() => setIsUpdateCompanyModalOpen(false)}
                company={selectedCompany}
                onUpdate={handleCompanyUpdate}
            />
            <UpdateServiceModal
                isOpen={isUpdateServiceModalOpen}
                onClose={() => setIsUpdateServiceModalOpen(false)}
                service={selectedService}
                onUpdate={handleServiceUpdate}
            />
            <UpdateReviewModal
                isOpen={isUpdateReviewModalOpen}
                onClose={() => setIsUpdateReviewModalOpen(false)}
                review={selectedReview}
                onUpdate={handleReviewUpdate}
            />
        </div>
    );
};


export default MyReviews;
