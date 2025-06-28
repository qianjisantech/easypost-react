// utils/routes.ts
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  TEAMS: (teamId: string) => `/main/teams/${teamId}`,
  MAIN: '/main',
  COLLABORATIONDASHBOARD:'/main/collaborationdashboard',
  RECENTLYVISITED:  '/main/recentlyvisited',
  MYCOLLECTION: '/main/mycollection',
  RESOURCEMARKET:'/main/resourcemarket',
  PROJECT: (projectId: string) => `/project/${projectId}`,
  MAIN_ORGANIZATIONS:'/main/organizations',
  SETTINGS_ORGANIZATIONS:'/main/settings/organizations'
}
