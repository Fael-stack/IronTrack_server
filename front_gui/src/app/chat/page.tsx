"use client";

import dynamic from "next/dynamic";
import React from "react";

const ChatWithId = dynamic(() => import("./[id]/page").then(m => m.default), { ssr: false });

export default function ChatIndex() {
  return <ChatWithId />;
}
