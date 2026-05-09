import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import AdminSidebar from "@/components/AdminSidebar";
import AdminClientWrapper from "@/components/AdminClientWrapper";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const user = session?.user as { role?: string } | undefined;
  if (!session || user?.role !== "admin") redirect("/login");

  return (
    <AdminClientWrapper>
      <div style={{ display: "flex", minHeight: "100vh", background: "#0a0e1a" }}>
        <AdminSidebar />
        <main style={{ marginLeft: "240px", flex: 1, minHeight: "100vh", overflowX: "hidden" }}>
          {children}
        </main>
      </div>
    </AdminClientWrapper>
  );
}
