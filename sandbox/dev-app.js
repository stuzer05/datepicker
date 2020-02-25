// https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
// https://css-tricks.com/styling-a-web-component/

class TestCal extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'closed' })

    shadow.innerHTML = `
      <div id="shadow-root">
        <input className="shadow-input" />
        <h1>SHADOW ROOT TEST</h1>
        <button>HELLO WORLD!</button>
      </div>
    `

    const style = document.createElement('style')
    style.textContent = `
      @import "http://localhost:9001/datepicker.min.css";
      #shadow-root {
        padding: 20px;
        border: 1px solid lime;
        background: #aaa;
      }
    `
    shadow.appendChild(style)

    window.x = datepicker(shadow.querySelector('input'), { shadowDom: shadow })
    window.y = datepicker(shadow.querySelector('h1'), { shadowDom: shadow })
  }
}

customElements.define('test-cal', TestCal)

const el = document.createElement('test-cal')
document.body.appendChild(el)

window.z = datepicker('input')
