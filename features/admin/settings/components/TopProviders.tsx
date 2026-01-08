import AdminListClient from "./AdminListClient";
import { getAdminList } from "../actions/get-admin-list";

export default async function AdminList() {
  const admins = (await getAdminList()) || [];

  // normalize to client shape
  const items = admins.map((a) => ({
    id: a.id,
    firstName: a.firstName,
    lastName: a.lastName,
    email: a.email,
    role: a.role,
  }));

  return <AdminListClient admins={items} />;
}
