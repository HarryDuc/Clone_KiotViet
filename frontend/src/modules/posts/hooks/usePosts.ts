import { useQuery, useMutation, useQueryClient } from "react-query";
import { getPosts, getPostById, createPost, updatePost, deletePost } from "../services/postService";
import { Post, UpdatePostDto } from "../types/postTypes";

/**
 * ✅ Hook lấy danh sách bài viết
 */
export const usePosts = () => {
    const queryClient = useQueryClient();

    // Lấy danh sách bài viết
    const postsQuery = useQuery<Post[]>("posts", getPosts);

    // Tạo bài viết mới
    const createMutation = useMutation(createPost, {
        onSuccess: () => queryClient.invalidateQueries("posts"),
    });

    // Cập nhật bài viết (Đảm bảo `data` có đúng kiểu dữ liệu)
    const updateMutation = useMutation(
        ({ id, data }: { id: string; data: UpdatePostDto }) => updatePost(id, data),
        {
            onSuccess: () => queryClient.invalidateQueries("posts"),
        }
    );

    // Xóa bài viết
    const deleteMutation = useMutation(deletePost, {
        onSuccess: () => queryClient.invalidateQueries("posts"),
    });

    return { postsQuery, createMutation, updateMutation, deleteMutation };
};

/**
 * ✅ Hook lấy bài viết theo ID
 */
export const usePostById = (id: string) => {
    return useQuery<Post>(["post", id], () => getPostById(id), {
        enabled: !!id, // Chỉ chạy nếu `id` hợp lệ
    });
};
