"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePosts } from "@/hooks/usePosts";
import { useDeletePost } from "@/hooks/usePosts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import "../globals.css";

export default function AdminPage() {
  const router = useRouter();
  const { data: posts, isLoading } = usePosts();

  if (isLoading) {
    return (
      <div className="p-6 max-w-5xl mx-auto text-center">
        <p className="text-muted-foreground">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">🛠️ Admin Dashboard</h1>
        <Link href="/admin/create">
          <Button>Create New Post</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {posts?.map((post: any) => (
          <Card
            key={post.id}
            className="transition-shadow hover:shadow-md"
          >
            <CardHeader>
              <CardTitle className="text-xl">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-muted-foreground text-sm max-w-2xl">
                {post.body.slice(0, 100)}...
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/admin/edit/${post.id}`)}
                >
                  Edit
                </Button>
                <DeleteComponent post={post} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

const DeleteComponent = ({ post }: { post: any }) => {
  const { deletePostApi, isDeletingPost } = useDeletePost({
    id: post.id,
  });

  return (
    <Button
      variant="destructive"
      disabled={isDeletingPost}
      onClick={() => deletePostApi()}
    >
      {isDeletingPost ? "Deleting..." : "Delete"}
    </Button>
  );
};
