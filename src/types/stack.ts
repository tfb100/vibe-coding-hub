export interface StackItem {
  name: string;
  desc: string;
  example?: string;
  isNew: boolean;
  isMCP?: boolean;
  link?: string;
  repo?: string;
  doc?: string;
  docLabel?: string;
}

export interface StackSection {
  cat: string;
  icon: string;
  items: StackItem[];
}
