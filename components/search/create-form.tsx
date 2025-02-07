"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createPost, State } from "@/lib/actions/post";
import { useActionState } from "react";

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createPost, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            募集タイトル
          </label>
          <Input
            id="title"
            name="title"
            type="string"
            placeholder="Title"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            募集内容
          </label>
          <Input
            id="description"
            name="description"
            type="description"
            placeholder="description"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            required
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          <Link href="/search">Cancel</Link>
        </Button>
        <Button type="submit">投稿</Button>
      </div>
    </form>
  );
}
