"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getAdminUsers,
  deactivateAdminUser,
  activateAdminUser,
} from "../adminusers.api";
import { AdminUser } from "../adminusers.types";

export const useAdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchUsers = useCallback(async () => {
    const startTime = Date.now();
    try {
      setLoading(true);
      const response = await getAdminUsers(page, debouncedSearch);
      setUsers(response.results);
      setTotalCount(response.count);
    } catch (error) {
      console.error("Failed to fetch admin users:", error);
      setUsers([]);
      setTotalCount(0);
    } finally {
      const elapsed = Date.now() - startTime;
      const minimumLoadingTime = 500;
      if (elapsed < minimumLoadingTime) {
        await new Promise((resolve) =>
          setTimeout(resolve, minimumLoadingTime - elapsed),
        );
      }
      setLoading(false);
    }
  }, [page, debouncedSearch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const deactivateUser = async (userId: number) => {
    await deactivateAdminUser(userId);
    await fetchUsers();
  };

  const activateUser = async (userId: number) => {
    await activateAdminUser(userId);
    await fetchUsers();
  };

  return {
    users,
    loading,
    page,
    setPage,
    totalCount,
    search,
    setSearch,
    deactivateUser,
    activateUser,
  };
};
