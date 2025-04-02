// src/modules/posts/components/PostList.tsx

import React from 'react';
import Link from 'next/link';
import { PostItem } from './PostItem';
import { usePosts } from '@/modules/posts/hooks/usePosts';
import { Post } from '../types/postTypes';

const PostList: React.FC = () => {
    const { postsQuery } = usePosts();

    if (postsQuery.isLoading) {
        return <p>Đang tải dữ liệu...</p>;
    }

    if (postsQuery.isError) {
        return <p>Đã xảy ra lỗi khi tải bài viết.</p>;
    }

    const posts = postsQuery.data as Post[] ?? [];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Danh sách Bài viết</h2>
                <Link href="/admin/posts/create">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Thêm mới Bài viết
                    </button>
                </Link>
            </div>

            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="p-3 border">ID</th>
                        <th className="p-3 border">Tiêu đề</th>
                        <th className="p-3 border">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post: Post) => (
                        <PostItem key={post.id} post={post} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PostList;
