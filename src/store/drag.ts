import { writable } from "svelte/store";

export const isDraggingContent = writable(false);

export const isDraggingBlock = writable(false);

export const dragOverTargetId = writable("");

export const dragOverTargetDirection = writable<"up" | "down" | null>(null);
