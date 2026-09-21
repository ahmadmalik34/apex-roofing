import { getConfig } from "@/app/actions/config";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboardPage() {
  const config = await getConfig();
  return <AdminDashboardClient config={config} />;
}
