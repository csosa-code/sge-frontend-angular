import { SidebarNavigationItem } from './sidebar-navigation.interface';

export const SIDEBAR_NAVIGATION: SidebarNavigationItem[] = [
  {
    label: 'Inicio',
    icon: 'home',
    route: '/app/dashboard'
  },
  {
    label: 'Empleados',
    icon: 'group',  
    route: '/app/employees'
  },
  {
    label: 'Departamentos',
    icon: 'domain',
    route: '/app/areas'
  }
];