
import { Sidebar as SidebarFB } from "flowbite-react";
import { HiHome, HiUser } from "react-icons/hi";
import { FaCar } from "react-icons/fa";

export default function Sidebar() {
  return (
    <SidebarFB aria-label="Sidebar with logo branding example">
      <SidebarFB.Logo href="/" img="/rebitsLogo.webp" imgAlt="reBits logo">
      </SidebarFB.Logo>
      <SidebarFB.Items>
        <SidebarFB.ItemGroup>
          <SidebarFB.Item href="/" icon={HiHome}>
            Inicio
          </SidebarFB.Item>
          <SidebarFB.Item href="/users" icon={HiUser}>
            Usuarios
          </SidebarFB.Item>
          <SidebarFB.Item href="/vehicles" icon={FaCar}>
            Vehiculos
          </SidebarFB.Item>
        </SidebarFB.ItemGroup>
      </SidebarFB.Items>
    </SidebarFB>
  );
}
