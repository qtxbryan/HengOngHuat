import { cn } from "@/lib/utils";

function SidebarItem({ icon: Icon, label, isActive, href }) {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
        isActive
          ? "bg-gradient-to-r from-indigo-600/40 to-purple-600/40 text-white"
          : "text-indigo-100 hover:bg-indigo-800/30 hover:text-white"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
      {isActive && (
        <div className="ml-auto h-2 w-2 rounded-full bg-indigo-400"></div>
      )}
    </a>
  );
}

export default SidebarItem;
