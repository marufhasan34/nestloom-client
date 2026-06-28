import { auth } from "@/lib/auth";
import {
  Heart,
  Persons,
  Factory,
  Bookmark,
  House,
  CirclePlus,
  Person,
  LayoutSideContent,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { headers } from "next/headers";
import Link from "next/link";

export async function DashboardSidebar() {
 

  const session = await auth.api.getSession({
    headers:await headers()
  })
  const user = session?.user
  const role = user?.role;
  const dashboardItems = {
    owner: [
      {icon: House, label: 'Overview', link: '/dashboard/owner'},
      {icon: CirclePlus, label: 'Add Property', link: '/dashboard/owner/add_property'},
      {icon: Factory, label: 'My Property', link: '/dashboard/owner/my_property'},
      {icon: Bookmark, label: 'Bookings', link: '/dashboard/owner/bookings'},
      {icon: Person, label: 'Profile', link: '/dashboard/owner/profile'}
    ],
    tenant: [
      {icon: House, label: 'Overview', link: '/dashboard/tenant'},
      {icon: Bookmark, label: 'My Bookings', link: '/dashboard/tenant/my_bookings'},
      {icon: Heart, label: 'Favorites', link: '/dashboard/tenant/my_property'},
      {icon: Person, label: 'Profile', link: '/dashboard/tenant/profile'}
    ],
    admin: [
      {icon: House, label: 'Overview', link: '/dashboard/admin'},
      {icon: Persons, label: 'Users', link: '/dashboard/admin/users'},
      {icon: Factory, label: 'Property', link: '/dashboard/admin/property'},
      {icon: Bookmark, label: 'Bookings', link: '/dashboard/admin/bookings'},
      {icon: Person, label: 'Profile', link: '/dashboard/admin/profile'}
    ],
  }

 const navItems = dashboardItems[role]

  

 

  return (
    <>
    <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
         <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link key={item.label} href={item.link}>
                      <button
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                      type="button"
                    >
                      <item.icon className="size-5 text-muted" />
                      {item.label}
                    </button>
                    </Link>
                  ))}
                </nav>
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
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                     <Link key={item.label} href={item.link}>
                      <button
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                      type="button"
                    >
                      <item.icon className="size-5 text-muted" />
                      {item.label}
                    </button>
                    </Link>
                  ))}
                </nav>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
