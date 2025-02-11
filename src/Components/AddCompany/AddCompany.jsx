import {useContext, useState} from 'react';
import { FaBuilding, FaGlobe, FaUpload, FaPen } from 'react-icons/fa';
import {useNavigate} from "react-router-dom";
import useCompaniesLoader from "../../CustomHooks/useCompaniesLoader.jsx";
import AuthContext from "../../Providers/AuthContext.jsx";


const AddCompany = () => {


    const {user} = useContext(AuthContext);
    const {createNewCompanyInDatabase} = useCompaniesLoader();
    const [company, setCompany] = useState({
        name: '',
        address: {
            house: '',
            street: '',
            city: '',
            state: '',
            zip_code: '',
            country: '',
        },
        website: '',
        description: '',
        logoURL: '',
        createdBy: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setCompany(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setCompany(prev => ({ ...prev, [name]: value }));
        }
    };


    const validateForm = () => {
        let newErrors = {};
        if (!company.name) newErrors.name = 'Company name is required';
        if (!company.address.house) newErrors.house = 'House number is required';
        if (!company.address.street) newErrors.street = 'Street name is required';
        if (!company.address.city) newErrors.city = 'City is required';
        if (!company.address.state) newErrors.state = 'State is required';
        if (!company.address.zip_code) newErrors.zip_code = 'Zip code is required';
        if (!company.address.country) newErrors.country = 'Country is required';
        if (!company.website) newErrors.website = 'Website is required';
        if (!company.description) newErrors.description = 'Description is required';
        if (!company.logoURL) newErrors.logoURL = 'Logo URL is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user && validateForm()) {

            company.createdBy = user?.email;
            //console.log('Submitting company:', company);

            // Here you would typically send the data to your backend
            await createNewCompanyInDatabase(company);

            setErrors({});
            navigate('/add_new_service');
        }
    };


    return (
        <div className="min-h-[calc(100vh-64px-329px)] bg-gradient-to-br from-[#1A237E] to-[#0D47A1] p-4 md:p-8">
            <div className="max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-8">
                    <h1 className="text-4xl font-bold text-white mb-8 text-center">Add a New Company</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-lg font-medium text-[#64B5F6]">Company Name</label>
                                <div className="relative">
                                    <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={company.name}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-20 border border-[#64B5F6] rounded-lg focus:ring-2 focus:ring-[#64B5F6] focus:border-transparent text-white placeholder-gray-300"
                                        placeholder="Enter company name"
                                    />
                                </div>
                                {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="website" className="text-lg font-medium text-[#64B5F6]">Website</label>
                                <div className="relative">
                                    <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="url"
                                        id="website"
                                        name="website"
                                        value={company.website}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-20 border border-[#64B5F6] rounded-lg focus:ring-2 focus:ring-[#64B5F6] focus:border-transparent text-white placeholder-gray-300"
                                        placeholder="https://www.example.com"
                                    />
                                </div>
                                {errors.website && <p className="mt-2 text-sm text-red-500">{errors.website}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-lg font-medium text-[#64B5F6]">Address</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.keys(company.address).map((key) => (
                                    <div key={key} className="relative">
                                        <input
                                            type="text"
                                            name={`address.${key}`}
                                            value={company.address[key]}
                                            onChange={handleChange}
                                            className="w-full pl-5 pr-3 py-2 bg-white bg-opacity-20 border border-[#64B5F6] rounded-lg focus:ring-2 focus:ring-[#64B5F6] focus:border-transparent text-white placeholder-gray-300"
                                            placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                                        />
                                        {errors[key] && <p className="mt-2 text-sm text-red-500">{errors[key]}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="text-lg font-medium text-[#64B5F6]">Description</label>
                            <div className="relative">
                                <FaPen className="absolute left-3 top-3 text-gray-400" />
                                <textarea
                                    id="description"
                                    name="description"
                                    value={company.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-20 border border-[#64B5F6] rounded-lg focus:ring-2 focus:ring-[#64B5F6] focus:border-transparent text-white placeholder-gray-300"
                                    placeholder="Enter company description"
                                ></textarea>
                            </div>
                            {errors.description && <p className="mt-2 text-sm text-red-500">{errors.description}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="logoURL" className="text-lg font-medium text-[#64B5F6]">Company Logo</label>
                            <div className="relative">
                                <FaUpload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    id="logoURL"
                                    name="logoURL"
                                    value={company.logoURL}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-20 border border-[#64B5F6] rounded-lg focus:ring-2 focus:ring-[#64B5F6] focus:border-transparent text-white placeholder-gray-300"
                                    placeholder="Enter logo URL"
                                />
                            </div>
                            {errors.logoURL && <p className="mt-2 text-sm text-red-500">{errors.logoURL}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full p-3 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1976D2] transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#64B5F6] focus:ring-opacity-50 shadow-lg flex items-center justify-center"
                        >
                            <FaBuilding className="mr-2" />
                            Add Company
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default AddCompany;
