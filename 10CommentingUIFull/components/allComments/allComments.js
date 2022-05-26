const allCommentsTemplate = document.createElement('template');
allCommentsTemplate.innerHTML = `
<style>
@import url('./components/allComments/allComments.css');
</style>
<div class="all-comments"><slot></slot></div>
`
class AllComments extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(allCommentsTemplate.content.cloneNode(true));
    }
}

window.customElements.define('all-comments', AllComments)