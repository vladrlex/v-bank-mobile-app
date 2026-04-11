export enum TabRoutes {
  HOME = "HomeTab",
  SETTINGS = "SettingsTab",
  MARKET = "MarketTab",
  SUPPORT = "SupportTab",
}

export const TabIcons: Record<TabRoutes, { active: string; inactive: string }> =
  {
    [TabRoutes.HOME]: { active: "home", inactive: "home-outline" },
    [TabRoutes.SETTINGS]: { active: "settings", inactive: "settings-outline" },
    [TabRoutes.MARKET]: { active: "cart", inactive: "cart-outline" },
    [TabRoutes.SUPPORT]: {
      active: "help-circle",
      inactive: "help-circle-outline",
    },
  };
