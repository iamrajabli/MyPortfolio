const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = `
<style>
    @import url('./components/appHeader/appHeader.css');
</style>
    <header>
    Javascript Web Components | Movie App
    </header>
`
class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));
    }
}

window.customElements.define('app-header', AppHeader);