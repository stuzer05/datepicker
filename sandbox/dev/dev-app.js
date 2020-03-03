require('./dev-styles.css')

// // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
// // https://css-tricks.com/styling-a-web-component/

const dp = datepicker

const inputs = document.querySelectorAll('input')
window.x = datepicker(inputs[0])
window.y = datepicker(inputs[1])

class ShadowCalendar extends HTMLElement {
  connectedCallback() {
    const shadow = window.s = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
      <h1>SHADOW ROOT TEST</h1>
      <input type="text" />
    `

    const style = document.createElement('style')
    style.textContent = `
      @import "http://localhost:9001/datepicker.min.css";
      input {
        font-family: inherit;
        font-size: inherit;
        padding: .5em;
      }
    `
    shadow.appendChild(style)
    window.shadowPicker = dp(shadow.querySelector('input'), { shadowDom: shadow })
  }
}

customElements.define('shadow-calendar', ShadowCalendar)

window.shadow = shadow
function shadow() {
  const sCal = document.createElement('shadow-calendar')
  document.body.appendChild(sCal)
}

shadow()
