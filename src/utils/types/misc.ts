import type {CATEGORIES as CategoryType} from "../constants.ts";


export type FiltersType = {search: string, category: CategoryType, current: "search"|"category" | null}