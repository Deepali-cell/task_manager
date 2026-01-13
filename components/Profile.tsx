"use client";
import { useAuth } from "@/context/StateContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-600">
        Please login to view your profile
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-md">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t" />

        {/* Details */}
        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Name</span>
            <span>{user.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Email</span>
            <span className="text-sm">{user.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Joined</span>
            <span className="text-sm">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
