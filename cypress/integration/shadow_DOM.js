describe('Usage in a shadow DOM / web component', () => {
  let dp
  let shadowPicker
  let picker2

  class ShadowCalendar extends HTMLElement {
    constructor() {
      super()
      console.log('CONSTRUCTOR')
    }

    connectedCallback() {
      const shadow = this.attachShadow({ mode: 'open' })

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
      shadowPicker = dp(shadow.querySelector('input'), { shadowDom: shadow })

      console.log('test')
    }
  }

  before(() => {
    cy.visit('http://localhost:9001')
    cy.window().then(win => {
      dp = win.dp
      window.customElements.define('shadow-calendar', ShadowCalendar)
      const webComponent = window.document.createElement('shadow-calendar')
      win.document.querySelector('.shadow-container').append(webComponent)
    })
  })

  it('should load', () => {
    expect(true).to.equal(true)
  })
})
