import {
  Factory,
  Bookmark,
  House,
  CirclePlus,
  Person,
  LayoutSideContent,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashboardSidebar() {
  const navItems = [
    { icon: House, href:'/dashboard/' , label: "Overview" },
    { icon: CirclePlus, href:'/dashboard/owner/add_property' , label: "Add Property" },
    { icon: Factory, href:'/dashboard/owner/my_property' , label: "My Property" },
    { icon: Bookmark, href:'/dashboard/' , label: "Bookings" },
    { icon: Person, href:'/dashboard/' , label: "Profile" },
  ];

  const navContent =  <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                      href={item.href}
                    >
                      <item.icon className="size-5 text-muted" />
                      {item.label}
                    </Link>
                  ))}
                </nav>

  return (
    <>
    <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
    </aside>
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <LayoutSideContent />
          sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
               {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
