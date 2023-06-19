import { DataTable } from '@interfaces/index';

export function sortData(
  data: DataTable[],
  sortType: number | string,
  sortKey: string,
  sortOrder: 'asc' | 'desc'
): DataTable[] {
  let arr = [];
  if (typeof sortType === 'number') {
    arr = data.slice().sort((a, b) => {
      return sortOrder === 'desc'
        ? a[sortKey] - b[sortKey]
        : b[sortKey] - a[sortKey];
    });
  } else if (typeof sortType === 'string') {
    arr = data.slice().sort((a, b) => {
      const userA = a[sortKey].toUpperCase();
      const userB = b[sortKey].toUpperCase();

      if (userA < userB) {
        return sortOrder === 'desc' ? 1 : -1;
      }
      if (userA > userB) {
        return sortOrder === 'desc' ? -1 : 1;
      }
      return 0;
    });
  }
  return arr;
}
