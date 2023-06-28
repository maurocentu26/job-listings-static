import UI from "./UI.js"
import { jobsArray, jobsContainer, clearFiltersBtn } from "../selectors.js";
import { filterJobs, clearFilters } from "../functions.js";

const ui = new UI();

class App{
    constructor() {
        this.initApp();
    }

    initApp() {
        jobsArray.forEach( job => {
            ui.showArticle(job);
        })
        
        jobsContainer.addEventListener("click", filterJobs)
        clearFiltersBtn.addEventListener("click", clearFilters);
    }
}

export default App;