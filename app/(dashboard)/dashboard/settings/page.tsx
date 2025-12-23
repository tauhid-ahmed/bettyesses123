import AdminInfo from "@/features/admin/settings/components/AdminInfo";
import SuspendedUsers from "@/features/admin/settings/components/SuspendedUsers";
import TopProviders from "@/features/admin/settings/components/TopProviders";
import {
  ADMIN_INFO,
  SUSPENDED_USERS,
  TOP_PROVIDERS,
} from "@/features/admin/settings/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const tabs = [
  {
    label: "Admin Info",
    value: ADMIN_INFO,
  },
  {
    label: "Suspended Users",
    value: SUSPENDED_USERS,
  },
  {
    label: "Admin Management",
    value: TOP_PROVIDERS,
  },
];

export default async function SettingsPage({ searchParams }: Props) {
  const query = await searchParams;
  const t = query.t || ADMIN_INFO;

  return (
    <div className="flex flex-col gap-4">
      <div className=" space-y-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-medium py-4">
          Admin Profile
        </h1>
        <ul className="flex flex-wrap gap-2 lg:gap-4 relative">
          {tabs.map((tab) => (
            <li
              className={cn(
                "whitespace-nowrap py-2 px-2 rounded bg-[#FEFEFE] overflow-hidden text-sm lg:text-md",
                tab.value === t && "bg-[#00244A] text-white"
              )}
              key={tab.value}
            >
              <Link href={`?t=${tab.value}`}>{tab.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      {t === ADMIN_INFO && <AdminInfo />}
      <div className="lg:-mt-12">
        {t === SUSPENDED_USERS && (
          <SuspendedUsers searchParams={searchParams} />
        )}
        {t === TOP_PROVIDERS && <TopProviders />}
      </div>
    </div>
  );
}
