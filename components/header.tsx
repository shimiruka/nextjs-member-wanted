"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <div className="fixed flex justify-between px-8 w-screen h-16 bg-gray-100 items-center drop-shadow-2xl border-b border-gray-300 shadow-md">
      <h1 className="font-bold text-2xl">募集掲示板</h1>
      <div className="flex gap-3">
        <Button>
          <Link href="/search">検索</Link>
        </Button>
        <Button variant="outline">login</Button>
      </div>
    </div>
  );
}
