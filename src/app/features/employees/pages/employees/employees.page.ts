import { Component, computed, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../interfaces/employee.interface';
import { inject, signal } from '@angular/core';
import { DatePipe, TitleCasePipe, CurrencyPipe, NgClass } from "@angular/common";
import { getStatusById } from '../../../../core/catalogs/status.catalog';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import EmployeeUpsertDialog from '../../components/employee-upsert/employee-upsert.dialog';
import { MatMenuTrigger, MatMenu, MatMenuItem } from "@angular/material/menu";
import { MatIconButton } from "@angular/material/button";
import { PageHeaderService } from '../../../../core/services/page-header.service';

@Component({
  selector: 'employees-page',
  imports: [DatePipe, TitleCasePipe, CurrencyPipe, NgClass, MatMenuTrigger, MatIconButton, MatMenu, MatMenuItem],
  templateUrl: './employees.page.html',
  styleUrl: './employees.page.scss',
})
export default class EmployeesPage implements OnInit {
  employees = signal<Employee[]>([]);
  employeeSrv = inject(EmployeeService);
  router = inject(Router);
  dialog = inject(MatDialog);
  header = inject(PageHeaderService);
  query = signal(this.initQuery());
  resultsLength = signal(0);
  totalPages = computed(() =>
    Math.ceil(this.resultsLength() / this.query().pageSize)
  );
  pages = computed(() =>
    this.buildPages(this.totalPages(), this.query().page)
  );

  ngOnInit() {
    this.header.set('Directorio del Personal', 'Administre la información y el estado de su personal de SGE.');
    this.getEmployees();
  }

  getEmployees() {

    this.employeeSrv.getAll(this.query()).subscribe((resp) => {
      if (resp.status) {

        this.employees.set(resp.data.data.map((employee: Employee) => ({
          ...employee,
          status: getStatusById(employee.statusId),
          initials: this.getInitials(employee.firstName, employee.lastName),
          avatarColor: this.getAvatarColor(employee.firstName + employee.lastName)
        })));

        this.resultsLength.set(resp.data.totalItems);
      }
    });
  }

  upsertEmployee(employee?: Employee) {
    this.dialog.open(EmployeeUpsertDialog, {
      width: '950px',
      maxWidth: '950px',
      panelClass: 'custom-dialog',
      data: { employeeId: employee?.employeeId }
    })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.getEmployees()
        }
      });
  }

  toggleStatus(employee: Employee) {
    const request$ = employee.statusId === 1
      ? this.employeeSrv.deactivate(employee.employeeId)
      : this.employeeSrv.activate(employee.employeeId);

    request$.subscribe(resp => {
      if (resp.status) {
        this.getEmployees();
      }
    });
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName?.charAt(0) ?? ''}${lastName?.charAt(0) ?? ''}`.toUpperCase();
  }

  getAvatarColor(name: string): string {
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-red-100 text-red-600',
      'bg-yellow-100 text-yellow-700',
      'bg-green-100 text-green-600',
      'bg-purple-100 text-purple-600'
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  }

  nextPage() {

    this.query.update(q => ({
      ...q,
      page: q.page + 1
    }));

    this.getEmployees();
  }

  prevPage() {

    if (this.query().page === 1) return;

    this.query.update(q => ({
      ...q,
      page: q.page - 1
    }));

    this.getEmployees();
  }

  changePageSize(size: number) {

    this.query.update(q => ({
      ...q,
      pageSize: size,
      page: 1
    }));
  
    this.getEmployees();
  }

  search(filter: string) {

    this.query.update(q => ({
      ...q,
      filter,
      page: 1
    }));
  
    this.getEmployees();
  }

  goToPage(page: number) {

    this.query.update(q => ({
      ...q,
      page
    }));
  
    this.getEmployees();
  }

  buildPages(total: number, current: number): (number | string)[] {

    const delta = 2;
  
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
  
    let last: number | undefined;
  
    for (let i = 1; i <= total; i++) {
  
      if (
        i === 1 ||
        i === total ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i);
      }
  
    }
  
    for (const i of range) {
  
      if (last !== undefined) {
  
        if (i - last === 2) {
          rangeWithDots.push(last + 1);
        }
  
        else if (i - last !== 1) {
          rangeWithDots.push('...');
        }
  
      }
  
      rangeWithDots.push(i);
      last = i;
  
    }
  
    return rangeWithDots;
  }

  initQuery() {
    return {
      page: 1,
      pageSize: 6,
      sortActive: 'EmployeeId',
      sortDirection: 'desc',
      filter: ''
    };
  }

}
