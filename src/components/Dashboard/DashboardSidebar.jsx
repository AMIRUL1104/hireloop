import {
  Bars,
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { Cannabis, Factory, Mail, Settings } from "lucide-react";
import Link from "next/link";
import { BsPostcard } from "react-icons/bs";

export function DashboardSidebar() {
  const navItems = [
    { icon: House, label: "Home", href: "/" },
    { icon: Cannabis, label: "Job", href: "/dashboard/recruiter/job" },
    {
      icon: BsPostcard,
      label: "Post A Job",
      href: "/dashboard/recruiter/job/job-post",
    },
    {
      icon: Factory,
      label: "Company Profile",
      href: "/dashboard/recruiter/company",
    },
    { icon: Person, label: "Profile", href: "/dashboard/recruiter/profile" },
    { icon: Mail, label: "Messages", href: "/dashboard/recruiter/messages" },
    {
      icon: Settings,
      label: "Settings",
      href: "/dashboard/recruiter/settings",
    },
  ];

  const drawerItems = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className="px-3 py-2.5 hover:bg-default rounded-xl transition-colors "
        >
          <button
            className="flex items-center gap-3 rounded-xl  text-sm text-foreground transition-colors hover:bg-default"
            type="button"
          >
            <item.icon className="size-5 text-muted" />
            {item.label}
          </button>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className=" hidden w-64 shrink-0 border-r md:block px-4 py-6 bg-default ">
        {drawerItems}
      </aside>
      <Drawer>
        <Button className="md:hidden" variant="secondary">
          <Bars />
          Menu
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{drawerItems}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
