import BASE_URL from "../SharedUtilities/SharedUtilities.jsx";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";


const useCategoriesLoader = () => {


    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState(null);

    useEffect(() => {

        const fetchCategories = async () => {
            try {
                setCategoriesLoading(true);

                const response = await axios.get(`${BASE_URL}/categories/all`);

                if (response?.status !== 200) {
                    new Error(`Failed to fetch categories: ${response.status}`);
                }

                setCategories(response.data);
            }
            catch (error) {
                setCategoriesError(error);
                toast.error(`Failed to fetch categories data. Error: ${error.message}`);
            }
            finally {
                setCategoriesLoading(false);
            }
        };
        fetchCategories().then();

    }, []);


    return {categories, categoriesLoading, categoriesError};
}


export default useCategoriesLoader;
