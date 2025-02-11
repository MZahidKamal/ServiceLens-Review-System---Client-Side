import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa"
import AuthContext from "../../Providers/AuthContext.jsx"
import useServicesLoader from "../../CustomHooks/useServicesLoader.jsx"
import useCompaniesLoader from "../../CustomHooks/useCompaniesLoader.jsx"
import UpdateServiceModal from "../UpdateServiceModal/UpdateServiceModal.jsx"
import Swal from "sweetalert2";


const MyServices = () => {

    const { user } = useContext(AuthContext)
    const { services, deleteServiceFromDatabase, updateServiceInDatabase } = useServicesLoader()
    const { companies } = useCompaniesLoader()
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredServices, setFilteredServices] = useState([])
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [selectedService, setSelectedService] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
        const userServices = services?.filter((service) => service?.createdBy === user?.email)
        setFilteredServices(userServices)
    }, [services, user])


    useEffect(() => {
        const results = services?.filter(
            (service) =>
                service?.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) && service?.createdBy === user?.email,
        )
        setFilteredServices(results)
    }, [searchTerm, services, user])


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }


    const handleServiceClick = (serviceId) => {
        navigate(`/service/details/${serviceId}`)
    }


    const handleUpdateClick = (service) => {
        setSelectedService(service)
        setIsUpdateModalOpen(true)
    }


    const handleDeleteClick = async (service) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteServiceFromDatabase(service?._id).then(() => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "The service has been deleted.",
                        icon: "success"
                    });
                });
            }
        });
    }


    const handleServiceUpdate = async (updatedService) => {
        console.log("Updated service:", updatedService)
        await updateServiceInDatabase(updatedService)
        setIsUpdateModalOpen(false)
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">My Services</h1>

                <div className="mb-6 relative">
                    <input
                        type="text"
                        placeholder="Search services..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full p-4 pr-12 rounded-full bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                <div className="overflow-x-auto bg-gray-800 bg-opacity-50 rounded-xl shadow-xl">
                    <table className="w-full text-left">
                        <thead>
                        <tr className="text-gray-300 border-b border-gray-700">
                            <th className="p-4">Service Name</th>
                            <th className="p-4">Company</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredServices.map((service) => {
                            const company = companies?.find((c) => c._id === service?.companyId)
                            return (
                                <tr key={service?._id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleServiceClick(service?._id)}
                                            className="text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            {service?.serviceName}
                                        </button>
                                    </td>
                                    <td className="p-4 text-gray-300">{company?.name || "N/A"}</td>
                                    <td className="p-4 text-gray-300">€{service?.price}</td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleUpdateClick(service)}
                                            className="mr-8 text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(service)}
                                            className="text-red-400 hover:text-red-300 transition-colors"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

                {isUpdateModalOpen && (
                    <UpdateServiceModal
                        isOpen={isUpdateModalOpen}
                        onClose={() => setIsUpdateModalOpen(false)}
                        service={selectedService}
                        onUpdate={handleServiceUpdate}
                    />
                )}
            </div>
        </div>
    )
}


export default MyServices
