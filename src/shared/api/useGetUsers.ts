
import { client } from "@/shared/api/config";
import { IUser, PAGE_ITEMS_LIMIT, DEFAULT_PAGE } from "@/shared/model";
import { useInfiniteQuery } from "@tanstack/react-query";

const getUsers = async (pageParam = 0): Promise<IUser[]> => {
  try {
    const start = pageParam * PAGE_ITEMS_LIMIT;
    const response = await client.get<IUser[]>(
      `/employees?_start=${start}&_limit=${PAGE_ITEMS_LIMIT}`
    );
    if (response.status === 200) {      
      return response.data
    } else {
      throw new Error("Failed to get users data");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const useGetUsers = () => {
  return useInfiniteQuery<IUser[]>({
    queryKey: ["users"],
    queryFn: (pageParam) => getUsers(pageParam.pageParam as number),
    initialPageParam: DEFAULT_PAGE,
    getNextPageParam: (_lastGroup, groups) => {
      return groups[groups.length - 1].length === PAGE_ITEMS_LIMIT ? groups.length : undefined;
    },
    refetchOnWindowFocus: false,
  });
};
