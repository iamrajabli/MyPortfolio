const writeCommentTemplate = document.createElement('template');
writeCommentTemplate.innerHTML = `
<style>
@import url('./components/writeComment/writeComment.css');
</style>
<div class="write-comment">
    <img src="./assets/img/1.jpg" alt="">
    <form action="">
        <input type="text" placeholder="Write a comment">
    </form>
    <i id="enter" class="fa-solid fa-play"></i>
    </div>
</div>
`
class WriteComment extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(writeCommentTemplate.content.cloneNode(true));
    }
}

window.customElements.define('write-comment', WriteComment)