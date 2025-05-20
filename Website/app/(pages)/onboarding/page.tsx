"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";

// Business categories from your Prisma schema
const BUSINESS_CATEGORIES = [
  "RESTAURANT", "SALON", "BOUTIQUE", "TIFFIN", "GYM", 
  "EVENT_PLANNER", "COACHING", "INTERIOR", "PHOTOGRAPHER", 
  "REPAIR_SERVICE", "REAL_ESTATE", "PET_SERVICE", "HANDICRAFT", 
  "FLORIST", "CLINIC", "TRAVEL", "FREELANCER", "BAKER", "NGO", "JEWELLERY"
];

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState(BUSINESS_CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!isLoaded || !user) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName,
          category,
          description,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to create business");
      }
      
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating business:", error);
      // Handle error (show toast or error message)
    } finally {
      setIsSubmitting(false);
    }
  }

  // Show loading state if user data is not loaded yet
  if (!isLoaded) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6">
            Welcome to <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Creado</span>
          </h1>
          <p className="text-gray-400 mb-8">Let's set up your business profile to get started.</p>
          
          <form onSubmit={onSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-300 mb-1">
                Business Name
              </label>
              <input
                id="businessName"
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                Business Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {BUSINESS_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Business Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 px-4 rounded-md"
            >
              {isSubmitting ? "Creating..." : "Create Business Profile"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}