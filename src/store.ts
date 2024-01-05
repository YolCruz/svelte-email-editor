import { writable } from "svelte/store";
import type { ComponentType } from "svelte";
import { generateRandomSequence, ID_LENGTH } from "./helpers";



export const isDraggingContent = writable(false);

export const isDraggingBlock = writable(false);
