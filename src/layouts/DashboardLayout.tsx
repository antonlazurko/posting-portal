"use client";

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/widgets/sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        {children}
      </div>
    </SidebarProvider>
  );
};
