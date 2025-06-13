"use client";

import { useForm, Controller } from "react-hook-form";
import { useCreatePost } from "@/hooks/usePosts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import clsx from "clsx";

type FormValues = {
  title: string;
  body: string;
};

export default function CreatePostPage() {
  const { addPost } = useCreatePost();

  const {
    handleSubmit,
    control,
    setValue,
    register,
    watch,
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
        class:
          "prose prose-sm sm:prose-base focus:outline-none min-h-[200px]",
      },
    },
    onUpdate: ({ editor }) => {
      setValue("body", editor.getHTML(), { shouldValidate: true });
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(watch("body"));
    }
  }, [editor]);

  const onSubmit = (data: any) => {
    addPost(data);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Post title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Body Field (Tiptap) */}
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
              Publish
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
