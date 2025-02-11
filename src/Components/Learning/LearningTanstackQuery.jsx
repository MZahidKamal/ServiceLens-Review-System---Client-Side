import {useMutation, useQuery} from "@tanstack/react-query";
import BASE_URL from "../../SharedUtilities/SharedUtilities.jsx";
import {toast} from "react-toastify";
import axios from "axios";


const LearningTanstackQuery = () => {





    /* `useQuery` হলো একটি hook, যা API থেকে ডেটা fetch এবং cache করার জন্য ব্যবহৃত হয়।
    Query Key হলো ডেটাকে identify করার একটি unique key।
    Query Function হলো API call করার জন্য ব্যবহৃত একটি async function।
    Refetch ডেটাকে পুনরায় fetch করার জন্য ব্যবহৃত হয়। */

    const {data: users = [], isLoading, error, refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axios(`${BASE_URL}/users/all`);
            // console.log(response);
            return response.data;
        }
    })





    const {mutate: createNewUser} = useMutation({
        mutationFn: async (newUserObj) => {
            try {
                const response = await axios.post(
                    `${BASE_URL}/users`,
                    newUserObj,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                // console.log(response);
                if (response.status === 201) toast.success('User created successfully!');
            } catch (error) {
                toast.error(`Failed to create user. Error: ${error.message}`);
            } finally {
                await refetch();
            }
        }
    })

    const handleCreateNewUser = () => {
        const newUser = {
            uid: 'qwertzuiopasdfghjkl',
            displayName: 'Muster Mann',
            email: 'mustermann@email.com',
            photoURL: 'https://lh3.googleusercontent.com/a/qwertzuiopasdfghjkl'
        };
        createNewUser(newUser);
    };





    const {mutate: replaceAUser} = useMutation({
        mutationFn: async (replacedUserObj) => {
            try {
                const response = await axios.put(
                    `${BASE_URL}/users/replace_a_user`,
                    replacedUserObj,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                // console.log(response);
                if (response.status === 200) toast.success('User replaced successfully!');
            } catch (error) {
                if (error.status === 304) toast.warning('User already replaced. No replace performed!');
                if (error.status === 404) toast.error('User not found. Please try again!');
            } finally {
                await refetch();
            }
        }
    });

    const handleReplaceAUser = () => {
        const replacedUserObj = {
            _id: '67846787329a98eef2699baa',
            uid: 'qwertzuiopasdfghjkl',
            displayName: 'Replaced Muster Mann',
            email: 'replaced_mustermann@email.com',
            photoURL: 'https://lh3.googleusercontent.com/a/qwertzuiopasdfghjkl/replaced'
        };
        replaceAUser(replacedUserObj);
    };





    const {mutate: updateAUser} = useMutation({
        mutationFn: async (updatedUserObj) => {
            try {
                const response = await axios.patch(
                    `${BASE_URL}/users/update_a_user`,
                    updatedUserObj,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                // console.log(response);
                if (response.status === 200) toast.success('User updated successfully!');

            } catch (error) {
                if (error.status === 304) toast.info('User already updated. No update performed!');
                if (error.status === 404) toast.warning('User not found. Please try again!');
            } finally {
                await refetch();
            }
        }
    });

    const handleUpdateAUser = () => {
        const updatedUserObj = {
            _id: '67846787329a98eef2699baa',
            uid: 'qwertzuiopasdfghjkl',
            displayName: 'Updated Muster Mann',
            email: 'updated_mustermann@email.com',
            photoURL: 'https://lh3.googleusercontent.com/a/qwertzuiopasdfghjkl/updated'
        };
        updateAUser(updatedUserObj);
    };





    const {mutate: deleteAUser} = useMutation({
        mutationFn: async (targetUserId) => {
            try {
                const response = await axios.delete(
                    `${BASE_URL}/users/delete_a_user`,
                    {
                        data: {targetUserId: targetUserId},                 //The axios.delete doesn't take 'data' parameter, therefore placing the data inside config parameter.
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                // console.log(response);
                if (response.status === 200) toast.success('User deleted successfully!');
            } catch (error) {
                if (error.status === 404) toast.warning('User not found. Please try again!');
            } finally {
                await refetch();
            }
        }
    });

    const handleDeleteAUser = () => {
        const targetUserObj = {
            _id: '67846787329a98eef2699baa',
            uid: 'qwertzuiopasdfghjkl',
            displayName: 'Updated Muster Mann',
            email: 'updated_mustermann@email.com',
            photoURL: 'https://lh3.googleusercontent.com/a/qwertzuiopasdfghjkl/updated'
        };
        deleteAUser(targetUserObj._id);
    };





    return (
        <div className={'space-y-2 p-10'}>

            <h1>Learning Tanstack useQuery for different ( GET / POST / PUT / PATCH / DELETE ) methods.</h1>

            {error && <h1>Error Occurred</h1>}

            {isLoading ? 'Loading...' : <h1>Total Number of Users: {users?.length}</h1>}

            <button onClick={() => refetch()} className={'border-2 px-3  rounded-lg block'}>Click to Refetch (GET)</button>
            <hr/>

            <button onClick={handleCreateNewUser} className={'border-2 px-3 rounded-lg block'}>Click to add new user (POST)</button>
            <hr/>

            <button onClick={handleReplaceAUser} className={'border-2 px-3 rounded-lg block'}>Click to replace a user (PUT)</button>
            <hr/>

            <button onClick={handleUpdateAUser} className={'border-2 px-3 rounded-lg block'}>Click to update a user (PATCH)</button>
            <hr/>

            <button onClick={handleDeleteAUser} className={'border-2 px-3 rounded-lg block'}>Click to delete a user (DELETE)</button>
            <hr/>

        </div>
    );
};

export default LearningTanstackQuery;
