interface EmailBody {
  rows: EmailRow[];
}

interface Cell {
  id: string;
  styles: any;
}

interface EmailRow extends Cell {
  widths: number[]; // Columns width
  columns: EmailColumn[];
}

interface EmailColumn extends Cell {
  children: Children[];
}

type BlockType = "image" | "text" | "header";

type Children = ImageBlock | TextBlock | HeaderBlock;

interface Block {
  id: string;
  type: BlockType;
  styles: any;
}

interface ImageBlock extends Block {
  type: "image";
  src: string;
  alt: string;
}

interface TextBlock extends Block {
  type: "text";
  text: string;
}

interface HeaderBlock extends Block {
  type: "header";
  text: string;
}

type DraggableType = "row" | "content";
