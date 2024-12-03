export interface CNNNews {
  data: Data;
}

export interface Data {
  list: List;
}

export interface List {
  items: Item[];
}

export interface Item {
  title: string;
  published: string;
}
