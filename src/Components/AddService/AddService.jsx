import { useState, useEffect, useContext } from "react"
import { FaCogs, FaFileAlt, FaDollarSign, FaBuilding, FaPlus, FaCheck } from "react-icons/fa"
import AuthContext from "../../Providers/AuthContext.jsx"
import useCompaniesLoader from "../../CustomHooks/useCompaniesLoader.jsx"
import useServicesLoader from "../../CustomHooks/useServicesLoader.jsx"
import { Link, useNavigate } from "react-router-dom"
import useCategoriesLoader from "../../CustomHooks/useCategoriesLoader.jsx"

const AddService = () => {
    const { user } = useContext(AuthContext)
    const { companies, companiesLoading } = useCompaniesLoader()
    const { categories, categoriesLoading } = useCategoriesLoader()
    const { createNewServiceInDatabase } = useServicesLoader()
    const [service, setService] = useState({
        serviceName: "",
        category: "",
        description: "",
        price: "",
        companyId: "",
        createdBy: "",
    })
    const [errors, setErrors] = useState({})
    const [companySearch, setCompanySearch] = useState("")
    const [filteredCompanies, setFilteredCompanies] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (companies) {
            setFilteredCompanies(
                companies.filter((company) => company.name.toLowerCase().includes(companySearch.toLowerCase())),
            )
        }
    }, [companies, companySearch])

    const handleChange = (event) => {
        const { name, value } = event.target
        setService((prev) => ({ ...prev, [name]: value }))
    }

    const handleCategoryChange = (categoryName) => {
        setService((prev) => ({ ...prev, category: categoryName }))
    }

    const validateForm = () => {
        const newErrors = {}
        if (!service.serviceName) newErrors.serviceName = "Service name is required"
        if (!service.category) newErrors.category = "Category is required"
        if (!service.description) newErrors.description = "Description is required"
        if (!service.price || isNaN(service.price)) newErrors.price = "Valid price is required"
        if (!service.companyId) newErrors.companyId = "Company selection is required"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (user && validateForm()) {
            service.price = Number.parseFloat(service.price)
            service.createdBy = user?.email
            await createNewServiceInDatabase(service)
            setErrors({})
            navigate("/add_new_review")
        }
    }

    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-[calc(100vh-64px-329px)] bg-gradient-to-br from-[#1A237E] to-[#0D47A1] p-4 md:p-8">
            <div className="max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-8">
                    <h1 className="text-4xl font-bold text-white mb-8 text-center">Add a New Service</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="serviceName" className="text-lg font-medium text-[#64B5F6]">
                                Service Name
                            </label>
                            <div className="relative">
                                <FaCogs className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    id="serviceName"
                                    name="serviceName"
                                    value={service.serviceName}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-20 border border-[#64B5F6] rounded-lg focus:ring-2 focus:ring-[#64B5F6] focus:border-transparent text-white placeholder-gray-300"
                                    placeholder="Enter service name"
                                />
                            </div>
                            {errors.serviceName && <p className="text-red-500 text-sm mt-1">{errors.serviceName}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-lg font-medium text-[#64B5F6]">Category</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {categoriesLoading ? (
                                    <p className="text-blue-200">Loading categories...</p>
                                ) : (
                                    categories?.map((category) => (
                                        <div key={category?._id} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id={`category-${category?._id}`}
                                                checked={service?.category === category?.name}
                                                onChange={() => handleCategoryChange(category?.name)}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor={`category-${category?._id}`}
                                                className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors duration-200 ease-in-out ${
                                                    service?.category === category?.name
                                                        ? "bg-[#64B5F6] text-white"
                                                        : "bg-white bg-opacity-20 text-gray-300 hover:bg-opacity-30"
                                                }`}
                                            >
                                                {category?.name}
                                                {service?.category === category?.name && <FaCheck className="text-white" />}
                                            </label>
                                        </div>
                                    ))
                                )}
                            </div>
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="text-lg font-medium text-[#64B5F6]">
                                Description
                            </label>
                            <div className="relative">
                                <FaFileAlt className="absolute left-3 top-3 text-gray-400" />
                                <textarea
                                    id="description"
                                    name="description"
                                    value={service.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-20 border border-[#64B5F6] rounded-lg focus:ring-2 focus:ring-[#64B5F6] focus:border-transparent text-white placeholder-gray-300"
                                    placeholder="Enter service description"
                                ></textarea>
                            </div>
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="price" className="text-lg font-medium text-[#64B5F6]">
                                Price
                            </label>
                            <div className="relative">
                                <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={service.price}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-20 border border-[#64B5F6] rounded-lg focus:ring-2 focus:ring-[#64B5F6] focus:border-transparent text-white placeholder-gray-300"
                                    placeholder="Enter service price in €"
                                />
                            </div>
                            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="companyId" className="text-lg font-medium text-[#64B5F6]">
                                Select Company
                            </label>
                            <div className="relative">
                                <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search for a company..."
                                    value={companySearch}
                                    onChange={(e) => setCompanySearch(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-20 border border-[#64B5F6] rounded-lg focus:ring-2 focus:ring-[#64B5F6] focus:border-transparent text-white placeholder-gray-300"
                                />
                            </div>
                            {companiesLoading ? (
                                <p className="text-blue-200">Loading companies...</p>
                            ) : (
                                <ul className="mt-2 max-h-60 overflow-y-auto space-y-2 bg-white bg-opacity-20 rounded-lg p-2">
                                    {filteredCompanies.map((company, index) => (
                                        <li
                                            key={index}
                                            onClick={() => setService((prev) => ({ ...prev, companyId: company._id }))}
                                            className={`p-2 rounded-lg cursor-pointer transition-all duration-300 ${
                                                service.companyId === company._id
                                                    ? "bg-[#64B5F6] text-white"
                                                    : "text-blue-100 hover:bg-white hover:bg-opacity-30"
                                            }`}
                                        >
                                            {company.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {errors.companyId && <p className="text-red-500 text-sm mt-1">{errors.companyId}</p>}
                            <p className="text-base font-medium text-[#64B5F6]">
                                Company not listed here? Click to{" "}
                                <Link to={{ pathname: "/add_new_company" }} className={"italic"}>
                                    Add New Company.
                                </Link>
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="w-full p-3 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1976D2] transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#64B5F6] focus:ring-opacity-50 shadow-lg flex items-center justify-center"
                        >
                            <FaPlus className="mr-2" />
                            Add Service
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddService
