import BASE_URL from "../SharedUtilities/SharedUtilities.jsx";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";


const useServicesLoader = () => {


    const [services, setServices] = useState([]);
    const [servicesLoading, setServicesLoading] = useState(true);
    const [servicesError, setServicesError] = useState(null);


    const checking_service_availability_in_database = async (serviceName) => {

        const response = await axios.post(
            `${BASE_URL}/services/find_availability_by_service_name`,
            { serviceName: serviceName }
        );

        return response.data.exists;
    }


    const createNewServiceInDatabase = async (serviceObject) => {
        try {
            setServicesLoading(true);

            const checking_availability = await checking_service_availability_in_database(serviceObject.serviceName);
            if (checking_availability) {
                toast.warning('Service creation failed. Service already exists!');
                setServicesLoading(false);
                return;
            }

            const response = await axios.post(`${BASE_URL}/services/add_new_service`, serviceObject);

            if (response?.status !== 201) {
                toast.error('Failed to create new service!');
            }

            toast.success('Service created successfully!');
        }
        catch (error) {
            setServicesError(error);
            toast.error(`Failed to create new service. Error: ${error.message}`);
        }
        finally {
            setServicesLoading(false);
        }
    }


    const updateServiceInDatabase = async (updatedServiceObject) => {
        try {
            if (!updatedServiceObject || !updatedServiceObject?._id || !updatedServiceObject?.serviceName || !updatedServiceObject?.description || !updatedServiceObject?.price) {
                toast.error('Invalid service object. Missing required fields!');
                return;
            }

            // Sending the updated service object
            const response = await axios.patch(`${BASE_URL}/services/update_a_service`, updatedServiceObject);

            if (response?.status !== 200) {
                toast.error('Failed to update the service. Please try again!');
                return;
            }

            toast.success('Service updated successfully!');
        } catch (error) {
            toast.error(`Failed to update the service. Error: ${error.response?.data?.message || error.message}`);
        }
    };



    const deleteServiceFromDatabase = async (serviceId) => {

        try {
            setServicesLoading(true);

            // Sending data as query parameters
            const response = await axios.delete(`${BASE_URL}/services/delete_a_service`, {
                params: {serviceId: serviceId}
            });

            if (response?.status !== 200) {
                toast.error('Failed to delete a service!');
                return;
            }

            toast.success('Service deleted successfully!');
        }
        catch (error) {
            setServicesError(error);
            toast.error(`Failed to delete a service. Error: ${error.message}`);
        }
        finally {
            setServicesLoading(false);
        }
    };


    useEffect(() => {

        const fetchServices = async () => {
            try {
                setServicesLoading(true);

                const response = await axios.get(`${BASE_URL}/services/all`);

                if (response?.status !== 200) {
                    new Error(`Failed to fetch services: ${response.status}`);
                }

                setServices(response.data);
            }
            catch (error) {
                setServicesError(error);
                toast.error(`Failed to fetch services data. Error: ${error.message}`);
            }
            finally {
                setServicesLoading(false);
            }
        };
        fetchServices().then();

    }, []);


    return {services, servicesLoading, servicesError, createNewServiceInDatabase, updateServiceInDatabase, deleteServiceFromDatabase};
}


export default useServicesLoader;
