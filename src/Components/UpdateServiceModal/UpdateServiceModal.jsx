import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaCheck, FaCogs, FaFileAlt, FaDollarSign } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';


const UpdateServiceModal = ({ isOpen, onClose, service, onUpdate }) => {


    const [updatedService, setUpdatedService] = useState({
        _id: '',
        serviceName: '',
        description: '',
        price: 0,
        companyId: '',
        createdBy: ''
    });


    useEffect(() => {
        if (service) {
            setUpdatedService({
                _id: service._id,
                serviceName: service.serviceName || '',
                description: service.description || '',
                price: service.price || 0,
                companyId: service.companyId,
                createdBy: service.createdBy
            });
        }
    }, [service]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedService(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdate(updatedService);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-gradient-to-br from-indigo-600 to-purple-700 p-1 rounded-2xl shadow-xl max-w-md w-full mx-4"
                    >
                        <div className="bg-gray-900 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white">Update Service</h2>
                                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                                    <FaTimes size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="serviceName" className="block text-sm font-medium text-gray-300 mb-1">Service Name</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaCogs className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="serviceName"
                                            id="serviceName"
                                            value={updatedService.serviceName}
                                            onChange={handleChange}
                                            className="block w-full pl-10 pr-3 py-2 border-gray-600 rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter service name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 pt-2 pointer-events-none">
                                            <FaFileAlt className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <textarea
                                            name="description"
                                            id="description"
                                            rows="3"
                                            value={updatedService.description}
                                            onChange={handleChange}
                                            className="block w-full pl-10 pr-3 py-2 border-gray-600 rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter service description"
                                        ></textarea>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Price</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaDollarSign className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            value={updatedService.price}
                                            onChange={handleChange}
                                            className="block w-full pl-10 pr-3 py-2 border-gray-600 rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter service price"
                                            step="0.01"
                                        />
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
                                        Update Service
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


UpdateServiceModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    service: PropTypes.shape({
        _id: PropTypes.string,
        serviceName: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        companyId: PropTypes.string,
        createdBy: PropTypes.string,
    }),
    onUpdate: PropTypes.func,
};


export default UpdateServiceModal;
