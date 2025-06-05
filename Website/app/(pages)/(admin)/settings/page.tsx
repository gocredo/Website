"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useToast } from "../../../../lib/toast/useToast";
import { SettingsLayout } from "../../../../components/admin/settings/settings_layout";

// Interface for user data from API
interface ExtendedUser {
  id: string;
  emailAddresses: { emailAddress: string }[];
  firstName?: string;
  lastName?: string;
  publicMetadata: {
    role?: string;
  };
}

interface SettingsState {
  users: ExtendedUser[];
  editingUserId: string | null;
  selectedRole: string;
  emailTemplate: string;
  apiKey: string;
}

export default function Settings() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [state, setState] = useState<SettingsState>({
    users: [],
    editingUserId: null,
    selectedRole: "",
    emailTemplate: "",
    apiKey: "",
  });
  const [isFetching, setIsFetching] = useState(false);

  // Redirect non-admins
  useEffect(() => {
    if (isLoaded && (!user || user.publicMetadata?.role !== "admin")) {
      toast({
        variant: "destructive",
        title: "Unauthorized",
        description: "You do not have permission to access this page.",
      });
      router.replace("/?error=You do not have permission to access this page.");
    }
  }, [isLoaded, user, router, toast]);

  // Fetch all users
  useEffect(() => {
    async function fetchUsers() {
      if (!isLoaded || !user || user.publicMetadata?.role !== "admin") return;

      try {
        setIsFetching(true);
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const usersData: ExtendedUser[] = await response.json();
        setState((prev) => ({ ...prev, users: usersData }));
      } catch (error) {
        console.error("[Settings] Error fetching users:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch users. Please try again.",
        });
      } finally {
        setIsFetching(false);
      }
    }
    fetchUsers();
  }, [isLoaded, user, toast]);

  // Handle role update
  const handleRoleUpdate = async (userId: string) => {
    if (!state.selectedRole) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a role.",
      });
      return;
    }

    try {
      const response = await fetch("/api/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: state.selectedRole }),
      });
      if (!response.ok) throw new Error("Failed to update user role");
      setState((prev) => ({
        ...prev,
        users: prev.users.map((u) =>
          u.id === userId ? { ...u, publicMetadata: { ...u.publicMetadata, role: state.selectedRole } } : u
        ),
        editingUserId: null,
        selectedRole: "",
      }));
      toast({
        variant: "success",
        title: "Success",
        description: "User role updated successfully.",
      });
    } catch (error) {
      console.error("[Settings] Error updating user role:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user role. Please try again.",
      });
    }
  };

  // Handle global settings save
  const handleSaveGlobalSettings = () => {
    toast({
      variant: "success",
      title: "Success",
      description: "Global settings saved successfully.",
    });
  };

  return (
    <SettingsLayout
      state={state}
      setState={setState}
      handleRoleUpdate={handleRoleUpdate}
      handleSaveGlobalSettings={handleSaveGlobalSettings}
      isFetching={isFetching}
    />
  );
}