class TestCal extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
      <div id="shadow-root">
        <input className="shadow-input" />
        <h1>SHADOW ROOT TEST</h1>
        <button>HELLO WORLD!</button>
      </div>
    `

    const style = document.createElement('style')
    style.textContent = `
      @import "https://unpkg.com/js-datepicker/dist/datepicker.min.css";
      #shadow-root {
        padding: 20px;
        border: 1px solid lime;
        background: #aaa;
      }
    `
    shadow.appendChild(style)

    const instance = datepicker(shadow.querySelector('input'), { root: shadow })
  }
}

customElements.define('test-cal', TestCal)

const el = document.createElement('test-cal')
document.body.appendChild(el)
