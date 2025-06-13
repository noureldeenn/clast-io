"use client";

import { useForm, Controller } from "react-hook-form";
import { useParams } from "next/navigation";
import { usePost, useUpdatePost } from "@/hooks/usePosts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import clsx from "clsx";
import { useEffect } from "react";

type FormValues = {
  title: string;
  body: string;
};

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, error } = usePost(id);
  const { updatePostApi } = useUpdatePost(id);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose focus:outline-none min-h-[200px]",
      },
    },
    onUpdate: ({ editor }) => {
      setValue("body", editor.getHTML(), { shouldValidate: true });
    },
  });

  // Set form and editor content once post data is loaded
  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("body", post.body);
      if (editor) {
        editor.commands.setContent(post.body);
      }
    }
  }, [post, setValue, editor]);

  const onSubmit = (data: FormValues) => {
    updatePostApi(data);
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading post...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Failed to load post.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title", { required: "Title is required" })}
                placeholder="Post title"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Body (Tiptap) */}
            <div className="space-y-2">
              <Label htmlFor="body">Body</Label>
              <div
                className={clsx(
                  "rounded-md border border-input bg-background p-3",
                  editor?.isFocused ? "ring-2 ring-ring" : ""
                )}
              >
                <Controller
                  name="body"
                  control={control}
                  rules={{ required: "Body is required" }}
                  render={() => <EditorContent editor={editor} />}
                />
              </div>
              {errors.body && (
                <p className="text-sm text-red-500">{errors.body.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Update
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
