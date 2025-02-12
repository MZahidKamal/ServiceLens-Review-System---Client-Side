import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaCheck, FaBuilding, FaGlobe, FaMapMarkerAlt, FaImage } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';


const UpdateCompanyModal = ({ isOpen, onClose, company, onUpdate }) => {


    const [updatedCompany, setUpdatedCompany] = useState({
        _id: '',
        name: '',
        logoURL: '',
        website: '',
        description: '',
        address: {
            house: '',
            street: '',
            city: '',
            state: '',
            zip_code: '',
            country: '',
        },
        createdBy: ''
    });


    useEffect(() => {
        if (company) {
            setUpdatedCompany({
                _id: company._id,
                name: company.name || '',
                logoURL: company.logoURL || '',
                website: company.website || '',
                description: company.description || '',
                address: {
                    house: company.address?.house || '',
                    street: company.address?.street || '',
                    city: company.address?.city || '',
                    state: company.address?.state || '',
                    zip_code: company.address?.zip_code || '',
                    country: company.address?.country || '',
                },
                createdBy: company.createdBy
            });
        }
    }, [company]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setUpdatedCompany(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setUpdatedCompany(prev => ({ ...prev, [name]: value }));
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdate(updatedCompany);
        onClose();
    };


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-gradient-to-br from-purple-600 to-indigo-700 p-1 rounded-2xl shadow-xl w-full max-w-3xl"
                    >
                        <div className="bg-gray-900 rounded-2xl p-6 overflow-y-auto max-h-[90vh]">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white">Update Company</h2>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <FaTimes size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                                            Company Name
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaBuilding className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={updatedCompany.name}
                                                onChange={handleChange}
                                                className="block w-full pl-10 pr-3 py-2 border-gray-600 rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Enter company name"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-1">
                                            Website
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaGlobe className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="url"
                                                name="website"
                                                id="website"
                                                value={updatedCompany.website}
                                                onChange={handleChange}
                                                className="block w-full pl-10 pr-3 py-2 border-gray-600 rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="https://www.example.com"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="logoURL" className="block text-sm font-medium text-gray-300 mb-1">
                                        Logo URL
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaImage className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="url"
                                            name="logoURL"
                                            id="logoURL"
                                            value={updatedCompany.logoURL}
                                            onChange={handleChange}
                                            className="block w-full pl-10 pr-3 py-2 border-gray-600 rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter logo URL"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-24 h-24 bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
                                        {updatedCompany.logoURL ? (
                                            <img src={updatedCompany.logoURL} alt="Company Logo" className="w-full h-full object-contain" />
                                        ) : (
                                            <FaImage className="text-gray-400 w-12 h-12" />
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-400">Logo Preview</p>
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        rows="3"
                                        value={updatedCompany.description}
                                        onChange={handleChange}
                                        className="block w-full px-3 py-2 border-gray-600 rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Enter company description"
                                    ></textarea>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-300 mb-2">Address</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {Object.keys(updatedCompany.address).map((key) => (
                                            <div key={key}>
                                                <label htmlFor={`address.${key}`} className="block text-sm font-medium text-gray-300 mb-1">
                                                    {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                                                </label>
                                                <div className="relative rounded-md shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name={`address.${key}`}
                                                        id={`address.${key}`}
                                                        value={updatedCompany.address[key]}
                                                        onChange={handleChange}
                                                        className="block w-full pl-10 pr-3 py-2 border-gray-600 rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder={`Enter ${key.replace('_', ' ')}`}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                                    >
                                        <FaCheck className="inline-block mr-2" />
                                        Update Company
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


UpdateCompanyModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    company: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        logoURL: PropTypes.string,
        website: PropTypes.string,
        description: PropTypes.string,
        address: PropTypes.shape({
            house: PropTypes.string,
            street: PropTypes.string,
            city: PropTypes.string,
            state: PropTypes.string,
            zip_code: PropTypes.string,
            country: PropTypes.string,
        }),
        createdBy: PropTypes.string,
    }),
    onUpdate: PropTypes.func,
};


export default UpdateCompanyModal;
