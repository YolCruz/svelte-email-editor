import { writable } from "svelte/store";
import type { ComponentType } from "svelte";
import { generateRandomSequence, ID_LENGTH } from "@src/helpers";

export function createRows() {
  const rows: EmailRow[] = [
    {
      id: generateRandomSequence(ID_LENGTH),
      styles: {},
      widths: [50, 50],
      columns: [
        {
          id: generateRandomSequence(ID_LENGTH),
          styles: {},
          children: [],
        },
        {
          id: generateRandomSequence(ID_LENGTH),
          styles: {},
          children: [],
        },
      ],
    },
  ];
  const { subscribe, set, update } = writable<EmailRow[]>(rows);
  return {
    subscribe,
    set,
    addRow: (columns: number, position: number) => {
      update((rows) => {
        rows.splice(position, 0, {
          id: generateRandomSequence(ID_LENGTH),
          styles: {},
          widths: Array.from({ length: columns }, () => 100 / columns),
          columns: Array.from({ length: columns }, () => ({
            id: generateRandomSequence(ID_LENGTH),
            styles: {},
            children: [],
          })),
        });
        return rows;
      });
    },
    addColumn: (rowId: string) => {
      update((rows) => {
        const rowIndex = rows.findIndex((row) => row.id === rowId);
        rows[rowIndex].widths = Array.from(
          { length: rows[rowIndex].widths.length + 1 },
          () => 100 / (rows[rowIndex].widths.length + 1)
        );
        rows[rowIndex].columns.push({
          id: generateRandomSequence(ID_LENGTH),
          styles: {},
          children: [],
        });
        return rows;
      });
    },
    addChild: (
      rowId: string,
      columnId: string,
      position: number,
      childProps: Children
    ) => {
      update((rows) => {
        const rowIndex = rows.findIndex((row) => row.id === rowId);
        const columnIndex = rows[rowIndex].columns.findIndex(
          (column) => column.id === columnId
        );
        rows[rowIndex].columns[columnIndex].children.splice(
          position,
          0,
          childProps
        );
        return rows;
      });
    },
    updateChildText: (
      rowId: string,
      columnId: string,
      childId: string,
      newText: string
    ) => {
      update((rows) => {
        const rowIndex = rows.findIndex((row) => row.id === rowId);
        const columnIndex = rows[rowIndex].columns.findIndex(
          (column) => column.id === columnId
        );
        const childIndex = rows[rowIndex].columns[
          columnIndex
        ].children.findIndex((child) => child.id === childId);
        (
          rows[rowIndex].columns[columnIndex].children[childIndex] as TextBlock
        ).text = newText;
        return rows;
      });
    },
    removeRow: (rowId: string) => {
      update((rows) => {
        const rowIndex = rows.findIndex((row) => row.id === rowId);
        rows.splice(rowIndex, 1);
        return rows;
      });
    },
  };
}
export const rows = createRows();

export const selectedBlockId = writable<string | null>(null);
