"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Business {
  id: string;
  name: string;
  category: string;
  description?: string;
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;

    async function fetchBusinessData() {
      try {
        const response = await fetch("/api/business");
        
        if (!response.ok) {
          throw new Error("Failed to fetch business data");
        }
        
        const data = await response.json();
        setBusiness(data.business);
      } catch (error) {
        console.error("Error fetching business data:", error);
      } finally {
        setLoading(false);
      }
    }
fetchBusinessData();
  }, [isLoaded, user]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6">
            Welcome to your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Dashboard</span>
          </h1>
          
          {business ? (
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-2">{business.name}</h2>
              <div className="inline-block bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm mb-4">
                {business.category.replace("_", " ")}
              </div>
              {business.description && (
                <p className="text-gray-400">{business.description}</p>
              )}
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-6 mb-8 text-center">
              <p className="text-gray-400">
                You haven't set up your business profile yet.
              </p>
              <a
                href="/onboarding"
                className="mt-4 inline-block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 px-4 rounded-md"
              >
                Set up your business
              </a>
            </div>
          )}
          
          {/* Dashboard content will go here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dashboard widgets */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-3">Quick Stats</h3>
              <p className="text-gray-400">Coming soon...</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-3">Recent Activity</h3>
              <p className="text-gray-400">Coming soon...</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-3">Settings</h3>
              <p className="text-gray-400">Coming soon...</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
