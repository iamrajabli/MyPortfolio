const allCommentsSortTemplate = document.createElement('template');
allCommentsSortTemplate.innerHTML = `
<style>
@import url('./components/allCommentsSort/allCommentsSort.css');
</style>
<div class="all-comments-sort">
<ul>
    <li class="dropdown">Sort <i class="fa-solid fa-caret-down"></i>
        <ul class="">
            <li class="ky">Zamana görə [K-Y]</li>
            <li class="yk">Zamana görə [Y-K]</li>
        </ul>
    </li>
</ul>
<span><span id="countComment">18</span> Comments</span>
</div>
</div>
`
class AllCommentsSort extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(allCommentsSortTemplate.content.cloneNode(true));
    }
}

window.customElements.define('all-comments-sort', AllCommentsSort)