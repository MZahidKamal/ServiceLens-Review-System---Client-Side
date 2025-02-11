import BASE_URL from "../SharedUtilities/SharedUtilities.jsx";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";


const useReviewsLoader = () => {


    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [reviewsError, setReviewsError] = useState(null);


    /*const checking_review_availability_in_database = async (user_email) => {

        const response = await axios.post(
            `${BASE_URL}/reviews/find_availability_by_reviewer_email`,
            { reviewer_email: user_email }
        );

        return response.data.exists;
    }*/


    const createNewReviewInDatabase = async (reviewObject) => {

        //console.log(reviewObject)

        try {
            setReviewsLoading(true);

            /*const checking_availability = await checking_review_availability_in_database(reviewObject.reviewedBy);
            if (checking_availability) {
                toast.warning('Review creation failed. Review from this user is already exists!');
                setReviewsLoading(false);
                return;
            }*/

            const response = await axios.post(`${BASE_URL}/reviews/add_new_review`, reviewObject);

            if (response?.status !== 201) {
                toast.error('Failed to create new review!');
            }

            toast.success('Review created successfully!');
        }
        catch (error) {
            setReviewsError(error);
            toast.error(`Failed to create new review. Error: ${error.message}`);
        }
        finally {
            setReviewsLoading(false);
        }
    }


    const updateReviewInDatabase = async (updatedReviewObject) => {
        try {
            setReviewsLoading(true);

            if (!updatedReviewObject || !updatedReviewObject._id || !updatedReviewObject.reviewText) {
                toast.error('Invalid review object. Missing required fields!');
                return;
            }

            const response = await axios.patch(`${BASE_URL}/reviews/update_a_review`,
                updatedReviewObject,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response?.status !== 200) {
                toast.error('Failed to update the review. Please try again!');
                return;
            }

            toast.success('Review updated successfully!');
        } catch (error) {
            setReviewsError(error);
            toast.error(`Failed to update the review. Error: ${error.response?.data?.message || error.message}`);
        } finally {
            setReviewsLoading(false);
        }
    };


    const deleteReviewFromDatabase = async (reviewId) => {
        try {
            setReviewsLoading(true);

            // Sending data as query parameters
            const response = await axios.delete(`${BASE_URL}/reviews/delete_a_review`, {
                params: {reviewId: reviewId}
            });

            if (response?.status !== 200) {
                toast.error('Failed to delete a review!');
                return;
            }

            toast.success('Review deleted successfully!');
        }
        catch (error) {
            setReviewsError(error);
            toast.error(`Failed to delete a review. Error: ${error.message}`);
        }
        finally {
            setReviewsLoading(false);
        }
    };


    useEffect(() => {

        const fetchReviews = async () => {
            try {
                setReviewsLoading(true);

                const response = await axios.get(`${BASE_URL}/reviews/all`);

                if (response?.status !== 200) {
                    new Error(`Failed to fetch reviews: ${response.status}`);
                }

                setReviews(response.data);
            }
            catch (error) {
                setReviewsError(error);
                toast.error(`Failed to fetch reviews data. Error: ${error.message}`);
            }
            finally {
                setReviewsLoading(false);
            }
        };
        fetchReviews().then();

    }, []);


    return {reviews, reviewsLoading, reviewsError, createNewReviewInDatabase, updateReviewInDatabase, deleteReviewFromDatabase};
}


export default useReviewsLoader;
