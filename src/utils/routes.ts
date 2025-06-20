// utils/routes.ts
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  TEAMS: (teamId: string) => `/main/teams/${teamId}`,
  MAIN: '/main',
  COLLABORATIONDASHBOARD:'/main/collaborationdashboard',
  PROJECT: (projectId: string) => `/project/${projectId}`,
}
