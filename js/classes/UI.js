import { jobsContainer, filtersContainer } from "../selectors.js";
import { deleteFilter } from "../functions.js";

class UI{
    showArticle({
        id,
        company,
        logo,
        newB,
        featured,
        position,
        role,
        level,
        postedAt,
        contract,
        location,
        languages,
        tools}) 
    {
        const jobContainer = document.createElement("article");
        jobContainer.className = "jobs__item flex fade-in-size";

        const jobNews = document.createElement("div");
        jobNews.className = "jobs__news flex";

        if (newB) {
            jobContainer.classList.add("new");

            const jobNewAdvice = document.createElement("span");
            jobNewAdvice.className = "news__item new flex";
            jobNewAdvice.textContent = "NEW!";

            jobNews.appendChild(jobNewAdvice);
        }
        if (featured) {
            jobContainer.classList.add("featured");

            const jobFeaturedAdvice = document.createElement("span");
            jobFeaturedAdvice.className = "news__item featured flex";
            jobFeaturedAdvice.textContent = "FEATURED";

            jobNews.appendChild(jobFeaturedAdvice);
        }

        jobContainer.dataset.id = id;

        const jobTags = document.createElement("div");
        jobTags.className = "jobs__tags flex"

        const jobRole = document.createElement("span");
        jobRole.className = "tags__item";
        jobRole.dataset.type = "role";
        jobRole.dataset.content = role;
        jobRole.textContent = role;

        const jobLevel = document.createElement("span");
        jobLevel.className = "tags__item";
        jobLevel.dataset.content = level;
        jobLevel.dataset.type = "level";
        jobLevel.textContent = level;

        jobTags.appendChild(jobRole);
        jobTags.appendChild(jobLevel);

        languages.forEach( language => {
            const jobLanguage = document.createElement("span");
            jobLanguage.className = "tags__item";
            jobLanguage.dataset.type = "languages";
            jobLanguage.dataset.content = language;
            jobLanguage.textContent = language;

            jobTags.appendChild(jobLanguage);
        });
        tools.forEach( tool => {
            const jobTool = document.createElement("span");
            jobTool.className = "tags__item";
            jobTool.dataset.content = tool;
            jobTool.dataset.type = "tools";
            jobTool.textContent = tool;

            jobTags.appendChild(jobTool);
        } )

        jobContainer.innerHTML = `
            <div class="jobs__info flex">
                <img src=${logo} alt="${company}-logo" class="jobs__image">
                <div class="jobs__text flex">
                    <div class="jobs__title flex">
                        <h2 class="jobs__company">${company}</h2>
                    </div>
                        <h3 class="jobs__position">${position}</h3>
                        <div class="jobs__conditions flex">
                        <span class="conditions__item">${postedAt}</span>
                        <span class="conditions__item">${contract}</span>
                        <span class="conditions__item">${location}</span>
                    </div>
                </div>
            </div>
            <span class="separator"></span>
        `;
        jobContainer.querySelector(".jobs__title").appendChild(jobNews);
        jobContainer.appendChild(jobTags);

        jobsContainer.appendChild(jobContainer);
    }

    activeContainer(container) {
        container.classList.add("active");
    }

    disableContainer(container) {
        container.classList.remove("active");
    }

    putFilter(tag, type) {
        if(!filtersContainer.parentElement.classList.contains("active"))
            this.activeContainer(filtersContainer.parentElement);
        if(!filtersContainer.querySelector(`[data-content="${tag}"]`)) {
            const filterItem = document.createElement("div");
            filterItem.className = "filters__item";
            filterItem.dataset.content = tag;
            filterItem.dataset.tag = type;

            const filterText = document.createElement("span");
            filterText.className = "filters__text";
            filterText.textContent = tag;

            const filterDeleteBtn = document.createElement("button");
            filterDeleteBtn.className = "filters__button";
            filterDeleteBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path fill="#FFF" fill-rule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"></path></svg>
            `
            filterDeleteBtn.onclick = () => deleteFilter(tag);

            filterText.appendChild(filterDeleteBtn);
            filterItem.appendChild(filterText);
            filtersContainer.appendChild(filterItem);
        }
    }

    deleteFilter(tag) {
        filtersContainer.querySelector(`[data-content="${tag}"]`).remove();
        if(!filtersContainer.querySelector(".filters__item")) 
            this.disableContainer(filtersContainer.parentElement);
    }

    clearFilters() {
        while(filtersContainer.firstChild) {
            filtersContainer.firstChild.remove();
        }

        this.disableContainer(filtersContainer.parentElement);
    }

    clearArticles() {
        while(jobsContainer.querySelector("article.jobs__item")) {
            jobsContainer.querySelector("article.jobs__item").remove();
        }
    }
}

export default UI;