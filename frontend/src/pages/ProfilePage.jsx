import React from 'react';
import useProfile from '../hooks/useProfile';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const [profile, isLoading] = useProfile();
      const BASE_URL = import.meta.env.VITE_BASE_URL;


    if (isLoading) return <div className="p-6 text-center">Loading...</div>;
    console.log(profile);
    if (!profile) {
        return (
            <div className="p-6 flex flex-col items-center justify-center min-h-screen">
                <p className="mb-4 text-gray-700 text-lg">
                    You need to login to view your profile.
                </p>
                <Link 
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    to="/login"
                >
                    Go to Login
                </Link>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-start p-6 min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">My Profile</h2>

                <div className="flex flex-col items-center gap-4 mb-6">
                    <img
                        className="w-24 h-24 rounded-full border-2 border-gray-200"
                        src={`${BASE_URL}${profile.photo}` || '/vite.svg'}

                        alt="avatar"
                    />
                    <div className="text-center">
                        <div className="text-xl font-semibold text-gray-800">{profile.username}</div>
                        <div className="text-gray-500">{profile.email}</div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex gap-5 text-gray-700">
                        <span className="font-medium">Name: </span>
                        <span>{profile.first_name} {profile.last_name}</span>
                    </div>
                    <div className="flex gap-5 text-gray-700">
                        <span className="font-medium">Email: </span>
                        <span>{profile.email}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                        <span className="font-medium">Blocked:</span>
                        <span className={profile.is_blocked ? 'text-red-500 font-semibold' : 'text-green-500 font-semibold'}>
                            {profile.is_blocked ? 'Yes' : 'No'}
                        </span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                        <span className="font-medium">Staff:</span>
                        <span className={profile.is_staff ? 'text-blue-500 font-semibold' : 'text-gray-500'}>
                            {profile.is_staff ? 'Yes' : 'No'}
                        </span>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        to="/edit-profile"
                    >
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
