// app/onboarding/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { toast } from "../../../components/ui/use-toast";
import { Loader2 } from "lucide-react";

// Business categories from Prisma schema (or shared file)
const BUSINESS_CATEGORIES = [
  "RESTAURANT", "SALON", "BOUTIQUE", "TIFFIN", "GYM",
  "EVENT_PLANNER", "COACHING", "INTERIOR", "PHOTOGRAPHER",
  "REPAIR_SERVICE", "REAL_ESTATE", "PET_SERVICE", "HANDICRAFT",
  "FLORIST", "CLINIC", "TRAVEL", "FREELANCER", "BAKER", "NGO", "JEWELLERY"
];

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();

  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState(BUSINESS_CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Check if user has already onboarded
  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.businessId) {
      router.push("/dashboard");
    }
  }, [isLoaded, user, router]);

  // Client-side validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!businessName.trim()) {
      newErrors.businessName = "Business name is required";
    } else if (businessName.length > 100) {
      newErrors.businessName = "Business name must be 100 characters or less";
    }
    if (!BUSINESS_CATEGORIES.includes(category)) {
      newErrors.category = "Invalid business category";
    }
    if (description && description.length > 1000) {
      newErrors.description = "Description must be 1000 characters or less";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded || !user) {
      toast({
        title: "Error",
        description: "User not authenticated",
        variant: "destructive",
      });
      return;
    }

    if (!validateForm()) {
      toast({
        title: "Error",
        description: "Please fix the form errors",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await getToken({ template: "goCredo1" });
      if (!token) {
        throw new Error("Failed to get authentication token");
      }

      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          businessName,
          category,
          description: description.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create business");
      }

      toast({
        title: "Success",
        description: "Business profile created successfully!",
      });

      // Update Clerk metadata (optional)
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          businessId: data.business.id,
        },
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating business:", error);
      toast({
        title: "Error",
        description: (error instanceof Error ? error.message : "Failed to create business"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
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
              <Input
                id="businessName"
                type="text"
                value={businessName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBusinessName(e.target.value)}
                className={errors.businessName ? "border-red-500" : ""}
                placeholder="e.g., Jane's Boutique"
              />
              {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                Business Category
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {BUSINESS_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Business Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                rows={4}
                className={errors.description ? "border-red-500" : ""}
                placeholder="Describe your business..."
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="flex space-x-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin inline mr-2" />
                ) : null}
                {isSubmitting ? "Creating..." : "Create Business Profile"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="flex-1"
              >
                Skip for Now
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}