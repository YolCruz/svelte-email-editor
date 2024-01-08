import { writable, derived } from "svelte/store";
import type { ComponentType } from "svelte";
import { generateRandomSequence, ID_LENGTH } from "@src/helpers";

export function createRows() {
  const rows: EmailRow[] = [
    {
      id: generateRandomSequence(ID_LENGTH),
      styles: {
        padding: [10, 10, 10, 10],
        margin: [0, 0, 0, 0],
      },
      widths: [50, 50],
      columns: [
        {
          id: generateRandomSequence(ID_LENGTH),
          styles: {
            padding: [10, 10, 10, 10],
            margin: [0, 0, 0, 0],
          },
          children: [],
        },
        {
          id: generateRandomSequence(ID_LENGTH),
          styles: {
            padding: [10, 10, 10, 10],
            margin: [0, 0, 0, 0],
          },
          children: [],
        },
      ],
    },
  ];
  const { subscribe, set, update } = writable<EmailRow[]>(rows);

  return {
    subscribe,
    set,
    update,
    addRow: (columns: number, position: number) => {
      update((rows) => {
        rows.splice(position, 0, {
          id: generateRandomSequence(ID_LENGTH),
          styles: {
            padding: [10, 10, 10, 10],
            margin: [0, 0, 0, 0],
          },
          widths: Array.from({ length: columns }, () => 100 / columns),
          columns: Array.from({ length: columns }, () => ({
            id: generateRandomSequence(ID_LENGTH),
            styles: {
              padding: [10, 10, 10, 10],
              margin: [0, 0, 0, 0],
            },
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
          styles: {
            padding: [10, 10, 10, 10],
            margin: [0, 0, 0, 0],
          },
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
        const { rowIndex, columnIndex, childIndex } = findIndices(
          rows,
          rowId,
          columnId,
          childId
        );

        (
          rows[rowIndex].columns[columnIndex].children[childIndex] as TextBlock
        ).text = newText;
        return rows;
      });
    },
    updateChildSpaces: (
      rowIndex: number,
      columnIndex: number,
      childIndex: number,
      spacing: "margin" | "padding",
      side: "Top" | "Right" | "Bottom" | "Left" | "All sides",
      operator: "-" | "+"
    ) => {
      update((rows) => {
        const spacings =
          rows[rowIndex].columns[columnIndex].children[childIndex].styles[
            spacing as keyof Styles
          ];
        const sideIndex = {
          Top: 0,
          Right: 1,
          Bottom: 2,
          Left: 3,
          "All sides": 0,
        }[side];
        const oldValue = spacings[sideIndex];
        let newValue = oldValue;
        if (operator === "-") {
          newValue = oldValue - 1 < 0 ? 0 : oldValue - 1;
        } else {
          newValue = oldValue + 1 > 50 ? 50 : oldValue + 1;
        }
        if (side === "All sides") {
          rows[rowIndex].columns[columnIndex].children[childIndex].styles[
            spacing as keyof Styles
          ] = [newValue, newValue, newValue, newValue];
        } else {
          spacings[sideIndex] = newValue;
        }
        return rows;
      });
    },
    setChildSpacing: (
      rowIndex: number,
      columnIndex: number,
      childIndex: number,
      spacing: "margin" | "padding",
      side: "Top" | "Right" | "Bottom" | "Left" | "All sides",
      value: number
    ) => {
      update((rows) => {
        const spacings =
          rows[rowIndex].columns[columnIndex].children[childIndex].styles[
            spacing as keyof Styles
          ];
        const sideIndex = {
          Top: 0,
          Right: 1,
          Bottom: 2,
          Left: 3,
          "All sides": 0,
        }[side];
        const newValue = Math.max(0, Math.min(50, value));
        if (side === "All sides") {
          rows[rowIndex].columns[columnIndex].children[childIndex].styles[
            spacing as keyof Styles
          ] = [newValue, newValue, newValue, newValue];
        } else {
          spacings[sideIndex] = newValue;
        }
        return rows;
      });
    },
    resetChildSpaces: (
      rowIndex: number,
      columnIndex: number,
      childIndex: number,
      spacing: "margin" | "padding"
    ) => {
      update((rows) => {
        rows[rowIndex].columns[columnIndex].children[childIndex].styles[
          spacing as keyof Styles
        ] = [10, 10, 10, 10];
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

export function findIndices(
  rows: EmailRow[],
  rowId: string,
  columnId: string,
  childId: string
) {
  const rowIndex = rows.findIndex((row) => row.id === rowId);
  const columnIndex = rows[rowIndex].columns.findIndex(
    (column) => column.id === columnId
  );
  const childIndex = rows[rowIndex].columns[columnIndex].children.findIndex(
    (child) => child.id === childId
  );

  return { rowIndex, columnIndex, childIndex };
}

export const selectedRowId = writable<string | null>(null);

export const selectedRowIndex = derived(
  [rows, selectedRowId],
  ([$rows, $selectedRowId]) => {
    if (!$selectedRowId) return null;

    return $rows.findIndex((row) => row.id === $selectedRowId);
  }
);

export const selectedColumnId = writable<string | null>(null);

export const selectedColumnIndex = derived(
  [rows, selectedRowIndex, selectedColumnId],
  ([$rows, $selectedRowIndex, $selectedColumnId]) => {
    if ($selectedRowIndex === null || !$selectedColumnId) return null;

    return $rows[$selectedRowIndex].columns.findIndex(
      (column) => column.id === $selectedColumnId
    );
  }
);

export const selectedChildId = writable<string | null>(null);

export const selectedChildIndex = derived(
  [rows, selectedRowIndex, selectedColumnIndex, selectedChildId],
  ([$rows, $selectedRowIndex, $selectedColumnIndex, $selectedChildId]) => {
    if (
      $selectedRowIndex === null ||
      $selectedColumnIndex === null ||
      !$selectedChildId ||
      !$rows[$selectedRowIndex].columns[$selectedColumnIndex].children.length
    )
      return null;

    return $rows[$selectedRowIndex].columns[
      $selectedColumnIndex
    ].children.findIndex((child) => child.id === $selectedChildId);
  }
);

export const selectedChildType = writable<BlockType | null>(null);
