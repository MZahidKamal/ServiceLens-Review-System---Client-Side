import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { FaStar, FaTimes, FaCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';


const UpdateReviewModal = ({ isOpen, onClose, review, onUpdate }) => {


    const [updatedReview, setUpdatedReview] = useState({ ...review });


    useEffect(() => {
        setUpdatedReview({ ...review });
    }, [review]);


    const handleRatingChange = (newRating) => {
        setUpdatedReview({ ...updatedReview, rating: newRating });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdate(updatedReview);
        onClose();
    };


    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-gradient-to-br from-blue-600 to-purple-700 p-1 rounded-2xl shadow-xl max-w-md w-full mx-4">
                        <div className="bg-gray-900 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-white">Update Review</h2>
                                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><FaTimes size={24} /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Rating</label>
                                    <div className="flex space-x-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => handleRatingChange(star)}
                                                className={`transition-colors ${star <= updatedReview.rating ? 'text-yellow-400' : 'text-gray-400'} hover:text-yellow-300`}>
                                                <FaStar size={24} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="reviewText" className="block text-sm font-medium text-gray-300 mb-1">Review</label>
                                    <textarea
                                        id="reviewText"
                                        rows="4"
                                        value={updatedReview.reviewText}
                                        onChange={(e) =>
                                            setUpdatedReview({
                                                ...updatedReview,
                                                reviewText: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 text-gray-300 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Update your review..."
                                    ></textarea>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">Cancel</button>
                                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center"><FaCheck className="mr-2" />Update Review</button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


UpdateReviewModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    review: PropTypes.object,
    onUpdate: PropTypes.func,
};


export default UpdateReviewModal;
