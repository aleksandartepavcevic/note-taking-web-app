import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex items-center justify-center h-screen p-4">
      <Card className="mx-auto w-full max-w-md py-8 sm:p-12 space-y-4 shadow-lg rounded-xl">
        <div className="flex justify-center">
          <Image src="/logo.svg" alt="Logo" width={95} height={28} />
        </div>
        {children}
      </Card>
    </div>
  );
}

export default AuthLayout;
