import DashboardClientWrapper from "@/components/DashboardClientWrapper";
export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardClientWrapper>{children}</DashboardClientWrapper>;
}
