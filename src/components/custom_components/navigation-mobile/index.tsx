import { useSidebar } from "@/components/ui/sidebar";
import { SettingIcon } from "@/theme/icons/setting-icon";

export default function NavigationMobile() {
  const { setOpenMobile } = useSidebar();
  return (
    <nav className="hidden h-16 bg-[#049EA4] px-6 w-full max-sm:flex max-sm:items-center max-sm:justify-between max-sm:pl-5 sm:flex sm:items-center sm:justify-between md:hidden lg:hidden">
      <h5 className="text-4xl text-[#00000075]">sisar</h5>
      <p className="cursor-pointer" onClick={() => setOpenMobile(true)}>
        <SettingIcon />
      </p>
    </nav>
  );
}
