export interface StatusOption {
    statusId: number | null;
    name: string;
    description: string;
    message: string;
    color: 'red' | 'green' | 'yellow' | 'blue' | 'gray';
    badgeClass: string;
  }

  export const DEFAULT_STATUS: StatusOption = {
    statusId: null,
    name: 'No definido',
    description: 'Estado no encontrado',
    message: 'Es necesario verificar el estado',
    color: 'gray',
    badgeClass: 'bg-gray-500 text-white'
  };

  export const STATUS_OPTIONS: StatusOption[] = [
    {
      statusId: 0,
      name: 'Inactivo',
      description: 'Inactivo',
      message: '',
      color: 'red',
      badgeClass: 'bg-danger-pastel text-danger-text'
    },
    {
      statusId: 1,
      name: 'Activo',
      description: 'Activo',
      message: '',
      color: 'green',
      badgeClass: 'bg-success-pastel text-success-text'
    }
  ];


  const STATUS_MAP = new Map<number, StatusOption>(
    STATUS_OPTIONS.map(status => [status.statusId!, status])
  );


  export function getStatusById(id: number | null | undefined): StatusOption {
    if (id === null || id === undefined) {
      return DEFAULT_STATUS;
    }
  
    return STATUS_MAP.get(id) ?? DEFAULT_STATUS;
  }
  
  