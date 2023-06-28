import { loadJobs } from "./functions.js";

export const jobsContainer = document.querySelector("#jobs");
export const filtersContainer = document.querySelector("#filters");
export const clearFiltersBtn = document.querySelector("#clear-filters");
export const jobsArray = await loadJobs();