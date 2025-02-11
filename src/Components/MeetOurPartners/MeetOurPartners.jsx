import {motion} from 'framer-motion';
import {FaHandshake} from 'react-icons/fa';
import useCompaniesLoader from '../../CustomHooks/useCompaniesLoader';


const MeetOurPartners = () => {


    const {companiesNamesAndLogos} = useCompaniesLoader();


    return (
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center text-white mb-10">
                    <span className="inline-block mr-3"><FaHandshake className="inline-block text-yellow-400"/></span>
                    Meet our Partners
                </h2>

                <div className="relative overflow-hidden mb-10">
                    <motion.div
                        className="flex space-x-8"
                        animate={{x: [0, -1000]}}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 20,
                                ease: "linear",
                            },
                        }}
                    >
                        {companiesNamesAndLogos?.map((company, index) => (
                            <div key={index} className="flex-shrink-0">
                                <img src={company?.logoURL} alt={company?.name} className="h-16 w-auto object-contain bg-white rounded-lg p-2"/>
                            </div>
                        ))}
                        {companiesNamesAndLogos?.map((company, index) => (
                            <div key={`duplicate-${index}`} className="flex-shrink-0">
                                <img src={company?.logoURL} alt={company?.name} className="h-16 w-auto object-contain bg-white rounded-lg p-2"/>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-6">Our Valued Collaborators</h3>
                    <p className="text-lg text-gray-300 max-w-5xl mx-auto">
                        At ServiceLens, we are proud to partner with industry leaders and innovators who share our
                        vision for
                        revolutionizing service reviews and customer experiences. Our key partners and collaborators
                        play a
                        crucial role in enhancing our platform s capabilities, expanding our reach, and driving
                        continuous
                        improvement in the service industry.
                    </p>
                    <p className="text-lg text-gray-300 max-w-5xl mx-auto mt-4">
                        Together with our partners, we are not just improving individual business operations; we are
                        shaping the
                        future of customer service across industries. Join us in this collaborative journey towards
                        excellence
                        in service delivery and customer satisfaction.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MeetOurPartners;
