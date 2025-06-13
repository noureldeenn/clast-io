// hooks/usePosts.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "@/lib/api";

export function usePosts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return {
    data,
    isLoading,
    error,
  };
}

export function usePost(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    enabled: !!id,
  });

  return {
    data,
    isLoading,
    error,
  };
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const {
    mutate: addPost,
    isPending: isAddingPost,
    isSuccess,
  } = useMutation({
    mutationFn: (data: { id: string; title: string; body: string }) =>
      createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: () => {},
  });

  return { addPost, isAddingPost, isSuccess };
};

export const useUpdatePost = (id: string) => {
  const queryClient = useQueryClient();
  const { mutate: updatePostApi, isPending: isUpdatingPost } = useMutation({
    mutationFn: (data: any) => updatePost({ data, id }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["posts", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
    },
    onError: () => {},
  });
  return { updatePostApi, isUpdatingPost };
};

export const useDeletePost = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const { mutate: deletePostApi, isPending: isDeletingPost } = useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: () => {},
  });

  return { deletePostApi, isDeletingPost };
};
