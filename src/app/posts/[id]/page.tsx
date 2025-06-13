'use client'

import { useParams } from 'next/navigation'
import { usePost } from '@/hooks/usePosts'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import '../../globals.css'

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: post, isLoading } = usePost(id)

  if (isLoading) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-2/3 mb-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-4/6" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center text-muted-foreground">
        Post not found.
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {post.body}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
