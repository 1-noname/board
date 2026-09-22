import { userSchema } from "../model/schema";

import { api } from "@shared/api/base";
import { useAuthStore } from "@shared/store/authStore";
import { useQuery } from "@tanstack/react-query";

const getProfileRequest = async () => {
  const { data } = await api.get("/users/profile");

  return userSchema.parse(data);
};

export const useProfileQuery = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const user = await getProfileRequest();
      setUser(user);
      return user;
    },
  });
};
