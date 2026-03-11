import type { Cell as CellType } from '../interfaces';

interface CellProps {
  cell: CellType;
}

export function Cell({ cell }: CellProps) {
  return (
    <div
      className={`cell ${cell.locked ? 'cell--locked' : ''} ${cell.value ? 'cell--filled' : ''}`}
      style={{ backgroundColor: cell.value ? cell.color : undefined }}
    />
  );
}
