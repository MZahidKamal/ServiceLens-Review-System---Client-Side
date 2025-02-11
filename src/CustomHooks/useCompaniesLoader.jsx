import BASE_URL from "../SharedUtilities/SharedUtilities.jsx";
import {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import AuthContext from "../Providers/AuthContext.jsx";


const useCompaniesLoader = () => {


    const { user } = useContext(AuthContext);
    const [companies, setCompanies] = useState([]);
    const [companiesLoading, setCompaniesLoading] = useState(true);
    const [companiesError, setCompaniesError] = useState(null);
    const [userAddedCompanies, setUserAddedCompanies] = useState([]);
    const [companiesNamesAndLogos, setCompaniesNamesAndLogos] = useState([]);


    useEffect(() => {
        const getUserAddedCompanies = async () => {
            try {
                setCompaniesLoading(true);

                const response = await axios.post(
                    `${BASE_URL}/companies/user_added_companies`,
                    { userEmail: user?.email }
                );
                setUserAddedCompanies(response.data);
            }
            catch (error) {
                setCompaniesError(error);
                toast.error(`Failed to fetch user added companies. Error: ${error.message}`);
            }
            finally {
                setCompaniesLoading(false);
            }

        }
        getUserAddedCompanies().then();
    }, [user?.email]);


    const checking_company_availability_in_database = async (website) => {

        const response = await axios.post(
            `${BASE_URL}/companies/find_availability_by_website`,
            { website: website }
        );

        return response.data.exists;
    }


    const createNewCompanyInDatabase = async (companyObject) => {
        try {
            setCompaniesLoading(true);

            const checking_availability = await checking_company_availability_in_database(companyObject.website);
            if (checking_availability) {
                toast.warning('Company creation failed. Company already exists!');
                setCompaniesLoading(false);
                return;
            }

            const response = await axios.post(`${BASE_URL}/companies/add_new_company`, companyObject);

            if (response?.status !== 201) {
                toast.error('Failed to create new company!');
            }

            toast.success('Company created successfully!');
        }
        catch (error) {
            setCompaniesError(error);
            toast.error(`Failed to create new company. Error: ${error.message}`);
        }
        finally {
            setCompaniesLoading(false);
        }
    }


    const updateCompanyInDatabase = async (updatedCompanyObject) => {
        try {
            // Validate the payload
            if (!updatedCompanyObject
                || !updatedCompanyObject?._id
                || !updatedCompanyObject?.name
                || !updatedCompanyObject?.address?.house
                || !updatedCompanyObject?.address?.street
                || !updatedCompanyObject?.address?.city
                || !updatedCompanyObject?.address?.state
                || !updatedCompanyObject?.address?.zip_code
                || !updatedCompanyObject?.address?.country
                || !updatedCompanyObject?.website
                || !updatedCompanyObject?.description
                || !updatedCompanyObject?.logoURL
                || !updatedCompanyObject?.createdBy
            ) {
                toast.error('Invalid company object. Missing required fields!');
                return;
            }

            // Sending the updated company object
            const response = await axios.patch(`${BASE_URL}/companies/update_a_company`, updatedCompanyObject);

            if (response?.status !== 200) {
                toast.error('Failed to update the company. Please try again!');
                return;
            }

            toast.success('Company updated successfully!');
        } catch (error) {
            toast.error(`Failed to update the company. Error: ${error.response?.data?.message || error.message}`);
        }
    };


    const deleteCompanyFromDatabase = async (companyId) => {
        try {
            setCompaniesLoading(true);

            // Sending data as query parameters
            const response = await axios.delete(`${BASE_URL}/companies/delete_a_company`, {
                params: {companyId: companyId}
            });

            if (response?.status !== 200) {
                toast.error('Failed to delete a company!');
                return;
            }

            toast.success('Company deleted successfully!');
        }
        catch (error) {
            setCompaniesError(error);
            toast.error(`Failed to delete a company. Error: ${error.message}`);
        }
        finally {
            setCompaniesLoading(false);
        }
    };


    useEffect(() => {
        const fetchCompanyNamesAndLogos = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/companies/names_and_logos`);

                if (response?.status === 200) {
                    setCompaniesNamesAndLogos(response.data);
                } else {
                    toast.error('Failed to fetch company names and logos.');
                }
            } catch (error) {
                toast.error(`Failed to fetch a company names and logos. Error: ${error.response?.data?.message || error.message}`);
            }
        };
        fetchCompanyNamesAndLogos().then();
    }, []);


    useEffect(() => {

        const fetchCompanies = async () => {
            try {
                setCompaniesLoading(true);

                const response = await axios.get(`${BASE_URL}/companies/all`);

                if (response?.status !== 200) {
                    new Error(`Failed to fetch companies: ${response.status}`);
                }

                setCompanies(response.data);
            }
            catch (error) {
                setCompaniesError(error);
                toast.error(`Failed to fetch companies data. Error: ${error.message}`);
            }
            finally {
                setCompaniesLoading(false);
            }
        };
        fetchCompanies().then();

    }, []);


    return {companies, companiesLoading, companiesError, createNewCompanyInDatabase, updateCompanyInDatabase, deleteCompanyFromDatabase, userAddedCompanies, companiesNamesAndLogos};
}


export default useCompaniesLoader;
