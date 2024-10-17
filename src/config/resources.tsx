import { DashboardOutlined, ProjectOutlined, ShopOutlined } from "@ant-design/icons";
import  { IResourceItem } from "@refinedev/core";


export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
  },
  {
    name: "members",
    list: "/members",
    show: "/members/:id",
    create: "/members/new",
    edit: "/members/edit/:id",
    meta: {
      label: "Members",
      icon: <ShopOutlined />,
    },
  },
  {
    name: "manage",
    list: "/manage",
    create: "/manage/new",
    edit: "/manage/edit/:id",
    meta: {
      label: "Manage",
      icon: <ProjectOutlined />,
    },
  },
];
