import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    type: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '', type: 'donor' },
    { path: '/government', title: 'Dashboard', icon: 'nc-bank', class: '', type: 'government' },
    { path: '/maps', title: 'Locate Entities', icon: 'nc-pin-3', class: '', type: 'government' },
    { path: '/maps', title: 'Locate Users', icon: 'nc-pin-3', class: '', type: 'donor' },
    { path: '/inventory', title: 'Inventory', icon: 'nc-box', class: '', type: 'donor' },

    { path: '/notifications', title: 'Notifications', icon: 'nc-bell-55', class: '', type: '' }

    // { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    // { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '', type:'' },
    // { path: '/typography',    title: 'Contact Us',        icon:'nc-email-85', class: '', type: 'government' }
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro', type:'citizen' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        var user = localStorage.getItem('ACCESS_TOKEN');
        this.menuItems = ROUTES.filter(menuItem => (menuItem.type == '' || menuItem.type == user));
    }
}
