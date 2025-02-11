import {useState, useMemo} from "react"
import {Link} from "react-router-dom"
import {FaStar, FaDollarSign, FaArrowRight, FaTag} from "react-icons/fa"
import useServicesLoader from "../../CustomHooks/useServicesLoader"
import useCompaniesLoader from "../../CustomHooks/useCompaniesLoader"
import useReviewsLoader from "../../CustomHooks/useReviewsLoader"
import useCategoriesLoader from "../../CustomHooks/useCategoriesLoader.jsx"

const Services = () => {
    const {companies} = useCompaniesLoader()
    const {categories} = useCategoriesLoader()
    const {services} = useServicesLoader()
    const {reviews} = useReviewsLoader()
    const [selectedCategory, setSelectedCategory] = useState("All")

    const filteredServices = useMemo(() => {
        if (selectedCategory === "All") {
            return services
        }
        return services.filter((service) => service.category === selectedCategory)
    }, [services, selectedCategory])

    const handleCategoryChange = (category) => {
        setSelectedCategory(category)
    }

    return (
        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-8">Our Services</h1>

                <div className="mb-8 flex flex-wrap justify-center gap-2">
                    <button
                        onClick={() => handleCategoryChange("All")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                            selectedCategory === "All" ? "bg-indigo-600 text-white" : "bg-white text-indigo-600 hover:bg-indigo-100"
                        }`}
                    >
                        All
                    </button>
                    {categories?.map((category) => (
                        <button
                            key={category?._id}
                            onClick={() => handleCategoryChange(category?.name)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                                selectedCategory === category?.name
                                    ? "bg-indigo-600 text-white"
                                    : "bg-white text-indigo-600 hover:bg-indigo-100"
                            }`}
                        >
                            {category?.name}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredServices?.map((service) => {
                        const company = companies.find((c) => c._id === service?.companyId)
                        const category = categories.find((c) => c.name === service?.category)
                        return (
                            <div
                                key={service?._id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h2 className="text-2xl font-semibold text-indigo-700">{service?.serviceName}</h2>
                                            <div className="flex items-center mt-1">
                                                <FaTag className="text-indigo-500 mr-1"/>
                                                <span
                                                    className="text-sm text-indigo-500">{category ? category?.name : "Uncategorized"}</span>
                                            </div>
                                        </div>
                                        {company && (
                                            <img
                                                src={company?.logoURL || "/placeholder.svg"}
                                                alt={company?.name}
                                                className="w-12 h-12 object-contain rounded-full border-2 border-indigo-200"
                                            />
                                        )}
                                    </div>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{service?.description}</p>
                                    <div className="flex justify-between items-center">
<span className="text-2xl font-bold text-indigo-600 flex items-center">
<FaDollarSign className="mr-1"/>
    {service?.price.toFixed(2)}
</span>
                                        <Link
                                            to={`/service/details/${service?._id}`}
                                            className="inline-flex items-center px-4 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300"
                                        >
                                            See Details
                                            <FaArrowRight className="ml-2"/>
                                        </Link>
                                    </div>
                                </div>
                                <div className="bg-indigo-50 px-6 py-3 flex justify-between items-center">
                                    <span className="text-sm text-indigo-600 font-medium">
                                        {company ? company?.name : "Unknown Company"}
                                    </span>
                                    <div className="flex items-center">
                                        <FaStar className="text-yellow-400 mr-1"/>
                                        <span className="text-sm text-gray-600 font-medium">
                                            {reviews?.filter((review) => review?.serviceId === service?._id).length} reviews
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Services
