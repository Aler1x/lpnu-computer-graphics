import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { APP_ROUTES } from "@/lib/navigation";

export function AppSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-1 py-1">
          <div className="grid size-8 place-items-center rounded-lg bg-sidebar-primary text-xs font-semibold text-sidebar-primary-foreground">
            КГ
          </div>
          <div className="grid text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="font-semibold">Комп&apos;ютерна графіка</span>
            <span className="text-xs text-sidebar-foreground/70">ЛПНУ</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Розділи</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {APP_ROUTES.map((route) => (
                <SidebarMenuItem key={route.path}>
                  <SidebarMenuButton
                    isActive={pathname === route.path}
                    tooltip={route.title}
                    onClick={() => navigate(route.path)}
                  >
                    <route.icon />
                    <span>{route.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">
        Фрактали, колір і афінні перетворення
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
