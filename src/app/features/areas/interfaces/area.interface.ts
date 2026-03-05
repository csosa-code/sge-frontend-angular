import { StatusOption } from "../../../core/catalogs/status.catalog";

export interface Area {
    areaId:   number;
    name:     string;
    description: string;
    statusId: number;
    status:   StatusOption;
}
