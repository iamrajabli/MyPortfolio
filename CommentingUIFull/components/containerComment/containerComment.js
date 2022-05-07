const containerCommentTemplate = document.createElement('template');
containerCommentTemplate.innerHTML = `
<style>
@import url('./components/containerComment/containerComment.css');
</style>
<div class="container">
<slot></slot>
</div>
`
class containerComment extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(containerCommentTemplate.content.cloneNode(true));
    }
}

window.customElements.define('container-comment', containerComment)