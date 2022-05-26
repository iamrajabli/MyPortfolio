const allCommentsContentTemplate = document.createElement('template');
allCommentsContentTemplate.innerHTML = `
<style>
@import url('./components/allCommentsContent/allCommentsContent.css');
</style>
<div class="all-comments-content">

<!--
    <div class="all-comments-content-item">
        <div class="all-comments-content-item-pp">
            <img src="./assets/img/1.jpg" alt="">
        </div>
        <div class="all-comments-content-details">
            <div class="all-comments-content-details-header">
                <h3>Hikmat Rajabli</h3>
                <span id="dateOfComment">27 aprel</span>
            </div>
        <div class="all-comments-content-details-comment">
            <span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, inventore tenetur error quam aliquid libero ex enim, veritatis quia sequi aspernatur consequatur facere eos repudiandae fugit nostrum id expedita obcaecati.</span>
        </div>
    </div>                        
    </div>

-->
</div>

`
class AllCommentsContent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(allCommentsContentTemplate.content.cloneNode(true));
    }
}

window.customElements.define('all-comments-content', AllCommentsContent)