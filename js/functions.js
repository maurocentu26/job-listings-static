import { filtersContainer } from "./selectors.js";

let ui;

let jobsFilter;

async function initializeUI() {
    try {
        const UI = await import("./classes/UI.js");
        ui = new UI.default();
    } catch (error) {
        console.error("Error al inicializar UI:", error);
    }
}


export async function loadJobs() {
    try {
        const response = await fetch("../data.json");
        const data = await response.json();
        return data;
    } catch (error) {
        return [];
    }
}


export async function filterJobs(e) {
    const tag = e.target;

    if(tag.classList.contains("tags__item")) {
        ui.putFilter(tag.textContent, tag.dataset.type);

        filterJobsFunction(extractTags());
    }
}

function extractTags() {
    const arr = [];
    const tags = Array.from(filtersContainer.querySelectorAll(".filters__item"));

    tags.forEach(tag => {
        const dataContent = {
            type: tag.getAttribute("data-tag"),
            content: tag.getAttribute("data-content"),
        }
        arr.push(dataContent);
    });

    return arr;
}

async function filterJobsFunction(tags) {
    jobsFilter = await loadJobs();

    if (tags.length !== 0) {
        jobsFilter = jobsFilter.filter( job => {
            return tags.every( tag => {
                if(tag.type === "roles" || tag.type === "levels") return job[tag.type] === tag.content;
                else return job[tag.type].includes(tag.content)
                
            });
        });
    }

    ui.clearArticles();
    jobsFilter.forEach( job => {
        ui.showArticle(job);
    });
}

export function deleteFilter(tag) {
    ui.deleteFilter(tag);

    filterJobsFunction(extractTags());
}

export function clearFilters() {
    ui.clearFilters();
    filterJobsFunction(extractTags());
}

initializeUI();