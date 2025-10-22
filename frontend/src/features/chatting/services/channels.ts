import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type { ChannelsResponse } from "../types";

export function useChannels() {
  return useQuery({
    queryKey: ["channels"],
    queryFn: async (): Promise<ChannelsResponse> => {
      const response = await apiClient.get("/channels");
      return response.data;
    },
  });
}
