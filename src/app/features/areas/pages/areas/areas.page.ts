import { Component, computed, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { getStatusById } from '../../../../core/catalogs/status.catalog';
import EmployeeUpsertDialog from '../../../employees/components/employee-upsert/employee-upsert.dialog';
import { Employee } from '../../../employees/interfaces/employee.interface';
import { EmployeeService } from '../../../employees/services/employee.service';
import { Area } from '../../interfaces/area.interface';
import { AreaService } from '../../services/area.service';
import { MatMenu, MatMenuTrigger, MatMenuItem } from "@angular/material/menu";
import { MatIconButton } from "@angular/material/button";
import { NgClass, TitleCasePipe } from "@angular/common";
import AreaUpsertDialog from '../../components/area-upsert/area-upsert.dialog';
import { PageHeaderService } from '../../../../core/services/page-header.service';

@Component({
  selector: 'areas-page',
  imports: [MatMenu, MatMenuTrigger, MatIconButton, NgClass, TitleCasePipe, MatMenuItem],
  templateUrl: './areas.page.html',
  styleUrl: './areas.page.scss',
})
export default class AreasPage { 
  areas = signal<Area[]>([]);
  areaSrv = inject(AreaService);
  header = inject(PageHeaderService);
  router = inject(Router);
  dialog = inject(MatDialog);
  query = signal({
    page: 1,
    pageSize: 5,
    filter: ''
  });
  
  resultsLength = signal(0);

  ngOnInit() {
    this.header.set('Departamentos', 'Administre la información y el estado de sus departamentos.');
    this.getAreas();
  }

  getAreas() {
    this.areaSrv.getAll().subscribe((resp) => {
      if (resp.status) {
        this.areas.set(resp.data.map(area => ({
          ...area,
          status: getStatusById(area.statusId)
        })).reverse());
      }
    });
  }

  upsertArea(area?: Area) {
    this.dialog.open(AreaUpsertDialog, {
      width: '950px',
      maxWidth: '950px',
      panelClass: 'custom-dialog',
      data: { areaId: area?.areaId }
    })
    .afterClosed()
    .subscribe(result => {
      if (result) {
        this.getAreas()
      }
    });
  }

  filteredAreas = computed(() => {

    const filter = this.query().filter;
    const areas = this.areas();
  
    if (!filter) return areas;
  
    return areas.filter(a =>
      a.name.toLowerCase().includes(filter) ||
      (a.description ?? '').toLowerCase().includes(filter)
    );
  
  });

  totalPages = computed(() =>
    Math.ceil(this.filteredAreas().length / this.query().pageSize)
  );

  pagedAreas = computed(() => {

    const page = this.query().page;
    const pageSize = this.query().pageSize;
  
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
  
    return this.filteredAreas().slice(start, end);
  
  });

  search(filter: string) {

    this.query.update(q => ({
      ...q,
      filter: filter.toLowerCase(),
      page: 1
    }));
  
  }

  nextPage() {

    if (this.query().page >= this.totalPages()) return;
  
    this.query.update(q => ({
      ...q,
      page: q.page + 1
    }));
  
  }
  
  prevPage() {
  
    if (this.query().page <= 1) return;
  
    this.query.update(q => ({
      ...q,
      page: q.page - 1
    }));
  
  }
  
  goToPage(page: number) {
  
    this.query.update(q => ({
      ...q,
      page
    }));
  
  }

  pages = computed(() =>
    this.buildPages(this.totalPages(), this.query().page)
  );

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
}
