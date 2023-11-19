import { writable } from "svelte/store";
import Header from "@components/header.svelte";
import Text from "@components/text.svelte";
import type { ComponentType } from "svelte";

export function createContentBlocks() {
  const { subscribe, set, update } = writable<ContentBlock[]>([]);
  return {
    subscribe,
    set,
    addBlock: (type: string, index: number, id: string) => {
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
    },
    removeBlock: (index: number) => {
      update((blocks) => {
        blocks.splice(index, 1);
        return blocks;
      });
    },
  };
}
export const contentBlocks = createContentBlocks();

export const selectedBlockId = writable<string | null>(null);

export const isDraggingElement = writable(false);
