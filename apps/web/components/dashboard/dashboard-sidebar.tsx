"use client";

import Image from "next/image";
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
   SidebarTrigger,
} from "@/components/ui/sidebar";
import {
   LayoutDashboard,
   FileText,
   ImageIcon,
   DollarSign,
   Settings,
   LogOut,
   User,
   ChevronUp,
   Sparkles,
   Compass,
   Wallet,
   Coins,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardSidebar() {
   // Add the staking menu item to the dashboard sidebar
   const menuItems = [
      {
         title: "Dashboard",
         icon: LayoutDashboard,
         href: "/dashboard",
         isActive: true,
      },
      {
         title: "Explore",
         icon: Compass,
         href: "/explore",
      },
      {
         title: "My Content",
         icon: FileText,
         href: "/dashboard/content",
      },
      {
         title: "NFT Manager",
         icon: ImageIcon,
         href: "/dashboard/nft",
      },
      {
         title: "Wallet",
         icon: Wallet,
         href: "/wallet-manager",
      },
      {
         title: "Staking",
         icon: Coins,
         href: "/staking",
      },
      {
         title: "Earnings",
         icon: DollarSign,
         href: "/earnings",
      },
      {
         title: "Settings",
         icon: Settings,
         href: "/dashboard/settings",
      },
   ];

   return (
      <Sidebar>
         <SidebarHeader>
            <div className="flex items-center justify-between p-2">
               <div className="flex items-center gap-2">
                  <Image src={"/logo.png"} alt="Logo" width={40} height={40} />
                  <span className="font-bold text-xl">CulturaX</span>
               </div>
               <SidebarTrigger />
            </div>
         </SidebarHeader>
         <SidebarContent>
            <SidebarGroup>
               <SidebarGroupLabel>Navigation</SidebarGroupLabel>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {menuItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                           <SidebarMenuButton asChild isActive={item.isActive}>
                              <Link href={item.href}>
                                 <item.icon className="h-5 w-5" />
                                 <span>{item.title}</span>
                              </Link>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
               <SidebarGroupLabel>AI Tools</SidebarGroupLabel>
               <SidebarGroupContent>
                  <SidebarMenu>
                     <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                           <Link href="/dashboard/ai-tools">
                              <Sparkles className="h-5 w-5" />
                              <span>AI Assistant</span>
                           </Link>
                        </SidebarMenuButton>
                     </SidebarMenuItem>
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>

         <SidebarFooter>
            <SidebarMenu>
               <SidebarMenuItem>
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <SidebarMenuButton>
                           <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                 <AvatarImage
                                    src="/placeholder.svg?height=32&width=32"
                                    alt="User"
                                 />
                                 <AvatarFallback>JD</AvatarFallback>
                              </Avatar>
                              <span>John Doe</span>
                           </div>
                           <ChevronUp className="ml-auto h-4 w-4" />
                        </SidebarMenuButton>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent
                        side="top"
                        className="w-[--radix-popper-anchor-width]"
                     >
                        <DropdownMenuItem asChild>
                           <Link href="/creator-profile">
                              <User className="mr-2 h-4 w-4" />
                              <span>Profile</span>
                           </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                           <Settings className="mr-2 h-4 w-4" />
                           <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                           <LogOut className="mr-2 h-4 w-4" />
                           <span>Logout</span>
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarFooter>
      </Sidebar>
   );
}
