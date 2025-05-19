"use client"

import { Button } from "@/components/ui/button"
import { ProfileTab } from "@/types/profile"

interface TabNavigationProps {
  tabs: ProfileTab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="border-b mb-6">
      <div className="flex space-x-2 overflow-x-auto">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            className={`gap-2 hover:rounded-b-none hover:border-b ${
              activeTab === tab.id ? "rounded-b-none border-b-0" : ""
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
