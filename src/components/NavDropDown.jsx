import { signOut, useSession } from "@/lib/auth-client";
import {ArrowRightFromSquare, FolderOpen} from "@gravity-ui/icons";
import {Avatar, Dropdown, Label} from "@heroui/react";
import Link from "next/link";

export function NavDropDown() {
    const {data:session} = useSession()
      const user = session?.user

      const handleSignOut = async () => {
        await signOut()
      }

  return (
    <Dropdown>
      <Dropdown.Trigger className="rounded-full">
        <Avatar>
          <Avatar.Image
            alt={user?.name}
            src={user?.image}
          />
          <Avatar.Fallback delayMs={600}>{user.name.charAt(0)}</Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image
                alt="Jane"
                src={user?.image}
              />
              <Avatar.Fallback delayMs={600}>{user.name.charAt(0)}</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <p className="text-sm leading-5 font-medium">{user?.name}</p>
              <p className="text-xs leading-none text-muted">{user?.email}</p>
            </div>
          </div>
        </div>
        <Dropdown.Menu>
          <Dropdown.Item id="dashboard" textValue="dashboard">
            <Link href={`/dashboard/${user?.role}`}>
              <div className="flex w-full items-center justify-between gap-2">
              <div><Label>Dashboard</Label></div>
              <div><FolderOpen /></div>
            </div>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item id="logout" textValue="Logout" variant="danger">
            <div onClick={handleSignOut} className="flex w-full items-center justify-between gap-2">
              <Label>Log Out</Label>
              <ArrowRightFromSquare className="size-3.5 text-danger" />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}