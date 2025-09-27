import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import useGetMe from "../../customHooks/profile/useGetMe";
import { bytesToMB } from "../../helperFuncs/bytesToMB";

function Profile() {
  const { data, isLoading, error } = useGetMe();

  if (isLoading)
    return <p className="p-4 text-center text-red-500">Loading profile...</p>;
  if (error)
    return (
      <p className="p-4 text-red-500 text-center">Failed to load profile.</p>
    );

  const user = data?.data?.user;
  if (!user) return null;

  const usedMB = bytesToMB(user.usedSpace);
  const allocatedMB = bytesToMB(user.allocatedSpace);
  const freeMB = (allocatedMB - usedMB).toFixed(2);

  const chartData = [
    { name: "Used", value: Number(usedMB) },
    { name: "Free", value: Number(freeMB) },
  ];

  const COLORS = ["#fc0841", "#e5e7eb"];

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>

      <div className="mb-6 space-y-2 ">
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Verified:</span>{" "}
          {user.isVerified ? (
            <span className="text-green-600">Yes ✅</span>
          ) : (
            <span className="text-red-600">No ❌</span>
          )}
        </p>
        <p>
          <span className="font-semibold">Member since:</span>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Storage Usage */}
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-4">Storage Usage</h3>

        <div className="w-64 h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 text-center">
          <p className="font-semibold">
            {usedMB} MB used of {allocatedMB} MB
          </p>
          <p className="text-gray-600">{freeMB} MB free</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
