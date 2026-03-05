import { StatusOption } from "../../../core/catalogs/status.catalog";

export interface Employee {
    employeeId:     number;
    firstName:      string;
    lastName:       string;
    fullName:       string;
    documentNumber: string;
    salary:         number;
    startDate:      Date;
    areaId:         number;
    areaName:       string;
    statusId:       number;
    status:         StatusOption;
    initials?: string;
    avatarColor?: string;
}
