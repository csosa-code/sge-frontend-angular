import { Component, inject, signal } from '@angular/core';
import { PageHeaderService } from '../../../../core/services/page-header.service';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardSummary } from '../../interfaces/dashboard-summary.interface';
import { CurrencyPipe, DatePipe, TitleCasePipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { AppSettingsService } from '../../../../core/services/app-settings.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe, RouterLink, DatePipe, TitleCasePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export default class DashboardComponent {
  header = inject(PageHeaderService);
  dashboardSrv = inject(DashboardService);
  dashboardSummary = signal<DashboardSummary | null>(null);
  appProps = inject(AppSettingsService).appProps;

  ngOnInit() {
    this.header.set('Dashboard', 'Bienvenido de nuevo al panel de gestión, revisa las métricas de hoy.');
    this.getDashboardSummary();
  }

  getDashboardSummary() {
    this.dashboardSrv.getDashboardSummary().subscribe((response) => {
      if(response.status){
        this.dashboardSummary.set(response.data);
      }
    });
  }

  exportPayroll() {

    this.dashboardSrv.getPayroll().subscribe(resp => {
  
      if (!resp.status) return;
  
      const data = resp.data.map((e: any) => {
        // Convierte la fecha a dd/mm/yyyy si existe
        let rawDate = e.startDate;
        let startDate = '';
        if (rawDate) {
          const dateObj = new Date(rawDate);
          const day = String(dateObj.getDate()).padStart(2, '0');
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const year = dateObj.getFullYear();
          startDate = `${day}/${month}/${year}`;
        }
        return {
          Empleado: `${e.firstName} ${e.lastName}`,
          Documento: e.documentNumber,
          Departamento: e.areaName,
          Salario: e.salary,
          'Fecha Ingreso': startDate
        }
      });
      const worksheet = XLSX.utils.json_to_sheet(data);
  
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Nomina');
  
      XLSX.writeFile(workbook, 'nomina.xlsx');
  
    });
  
  }
 }
