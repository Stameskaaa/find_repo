export interface RowData {
  forkCount: number;
  id: number;
  primaryLanguage: string;
  name: string;
  stargazerCount: number;
  updatedAt: string;
  licenseInfo: null | { name: string };
  topics: string[];
} //Тип преобразованных данных для более удобного использования в строках таблицы

export interface ResponseData {
  forkCount: number;
  name: string;
  updatedAt: string;
  stargazerCount: number;
  primaryLanguage: { name: string };
  licenseInfo: { name: string } | null;
  languages: { nodes: { name: string }[] };
  topics: string[];
}

export interface SearchReqest {
  edges: { node: ResponseData }[];
  pageInfo: { hasNextPage: boolean; endCursor: string };
}

export interface ResponseSearchRepo {
  results: ResponseData[];
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  perPage: number;
  totalCount: number;
} //Тип ответа на запрос репозиториев через api
