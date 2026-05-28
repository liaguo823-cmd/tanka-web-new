"use client";

// Root route just bounces to /flow (the New Flow composer). next/router
// handles basePath, so this works both at localhost:3000 and at
// liaguo823-cmd.github.io/tanka-web-current/. The <meta refresh> is a
// no-JS fallback; it also includes the basePath prefix from build time.

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/flow");
  }, [router]);

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${BASE_PATH}/flow/`} />
      <div className="flex items-center justify-center min-h-screen text-warm-black/60">
        Loading…
      </div>
    </>
  );
}
