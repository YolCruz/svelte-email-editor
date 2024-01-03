import { writable } from "svelte/store";
import Text from "@components/text.svelte";
import type { ComponentType } from "svelte";

export function createSections() {
  const { subscribe, set, update } = writable<Sections[]>([]);
  return {
    subscribe,
    set,
    addSection: (columns: number, position: number) => {
      update((sections) => {
        sections.splice(position, 0, {
          type: "section",
          columns,
          parentId: `section-${sections.length + 1}`,
          children: [],
        });
        return sections;
      });
    },
    addChild: (
      parentId: string,
      position: number,
      childProps: ContentBlock
    ) => {
      update((sections) => {
        const parentIndex = sections.findIndex(
          (section) => section.parentId === parentId
        );
        sections[parentIndex].children.splice(position, 0, childProps);
        return sections;
      });
    },
    /* addBlock: (type: string, index: number, id: string) => {
      let component: ComponentType;
      switch (type) {
        case "h1":
          component = Text;
          break;
        case "p":
          component = Text;
          break;
        default:
          break;
      }
      update((blocks) => {
        blocks.splice(index, 0, {
          id,
          type,
          component,
          styles: {},
        });
        return blocks;
      });
    }, */
    removeBlock: (index: number) => {
      update((sections) => {
        sections.splice(index, 1);
        return sections;
      });
    },
  };
}
export const sections = createSections();

export const selectedBlockId = writable<string | null>(null);

export const isDraggingElement = writable(false);
