const datepicker = require('../src/datepicker')
const todaysDate = require('./todaysDate')

const properties = [
  'el',
  'parent',
  'nonInput',
  'noPosition',
  'position',
  'startDate',
  'dateSelected',
  'disabledDates',
  'minDate',
  'maxDate',
  'noWeekends',
  'weekendIndices',
  'calendar',
  'currentMonth',
  'currentMonthName',
  'currentYear',
  'months',
  'days',
  'startDay',
  'overlayPlaceholder',
  'overlayButton',
  'disableYearOverlay',
  'disableMobile',
  'isMobile',
  'alwaysShow',
  'id'
]

const methods = [
  'setDate',
  'remove',
  'setMin',
  'setMax',
  'show',
  'hide'
]

const callbacks = [
  'onSelect',
  'onShow',
  'onHide',
  'onMonthChange'
]

const functions = [
  'formatter',
  'disabler'
]

const conditionals = [
  'sibling',
  'first',
  'inlinePosition'
]

const defaultDays = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
]

const defaultMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]


describe('Properties', () => {
  describe('Single Instance', () => {
    describe('No Options', () => {
      let picker = undefined
      let year = undefined
      let month = undefined
      let day = undefined

      beforeEach(() => {
        [year, month, day] = todaysDate(true)
        document.body.innerHTML = '<input type="text" />'
        picker = datepicker('input')
      })

      afterEach(() => picker.remove())

      it('should have the correct properties & values', () => {
        // Properties.
        expect(picker.el).toBe(document.querySelector('input'))
        expect(picker.parent).toBe(document.body)
        expect(picker.nonInput).toBe(false)
        expect(picker.noPosition).toBe(false)
        expect(+picker.startDate).toBe(+new Date(year, month, day))
        expect(picker.dateSelected).toBe(undefined)
        expect(picker.disabledDates).toEqual([])
        expect(picker.minDate).toBe(undefined)
        expect(picker.maxDate).toBe(undefined)
        expect(picker.noWeekends).toBe(false)
        expect(picker.weekendIndices).toEqual([6, 0])
        expect(picker.calendar).toBe(document.querySelector('.qs-datepicker'))
        expect(picker.currentMonth).toBe(month)
        expect(picker.currentMonthName).toBe(defaultMonths[month])
        expect(picker.currentYear).toBe(year)
        expect(picker.months).toEqual(defaultMonths)
        expect(picker.days).toEqual(defaultDays)
        expect(picker.startDay).toBe(0)
        expect(picker.overlayPlaceholder).toBe('4-digit year')
        expect(picker.overlayButton).toBe('Submit')
        expect(picker.disableYearOverlay).toBe(false)
        expect(picker.disableMobile).toBe(false)
        // expect(picker.isMobile).toBe(false) // This checks for `'ontouchstart' in window`.
        expect(picker.alwaysShow).toBe(false)
        expect(picker.id).toBe(undefined)

        // Methods.
        methods.forEach(method => expect(typeof picker[method]).toBe('function'))

        // Callbacks - when not defined, they are false.
        callbacks.forEach(cb => expect(picker[cb]).toBe(false))

        // Functions - when not defined, they are false.
        functions.forEach(fxn => expect(picker[fxn]).toBe(false))

        // Conditionals.
        expect(picker.sibling).toBe(undefined)
        expect(picker.first).toBe(undefined)
        expect(picker.inlinePosition).toBe(true) // Because the parent has no explicit position set.
      })

      it('should not set `inlinePosition` if the parent has an explicit position set', () => {
        picker.remove()

        document.body.innerHTML = `
          <div style="position: absolute;">
            <input type="text" />
          </div>
        `

        picker = datepicker('input')

        expect(picker.inlinePosition).toBe(undefined)
      })
    })

    describe('Options Passed In', () => {
      let picker = undefined
      let year = undefined
      let month = undefined
      let day = undefined

      beforeEach(() => {
        [year, month, day] = todaysDate(true)
        document.body.innerHTML = '<input type="text" />'
      })

      afterEach(() => picker.remove())

      // Callbacks.
      it('should set callbacks to false if the values provided are not functions', () => {
        picker = datepicker('input', {
          onSelect: 5,
          onShow: 5,
          onHide: 5,
          onMonthChange: 5
        })

        callbacks.forEach(cb => expect(picker[cb]).toBe(false))
      })

      it('should have the correct properties & values when *every* option is passed in', () => {
        const fxn = () => {}
        const customDays = ['1', '2', '3', '4', '5', '6', '7']
        const customMonths = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        const today = new Date()
        const disabledDate = new Date(2001, 0, 1)
        const minDate = new Date(2000, 0, 1)
        const maxDate = new Date(2099, 0, 1)

        picker = datepicker('input', {
          onSelect: fxn,
          onShow: fxn,
          onHide: fxn,
          onMonthChange: fxn,
          formatter: fxn,
          startDay: 5,
          customDays,
          customMonths,
          overlayButton: 'Overlay Button',
          overlayPlaceholder: 'Overlay Placeholder',
          alwaysShow: true,
          dateSelected: today,
          maxDate,
          minDate,
          startDate: today,
          noWeekends: true,
          disabler: fxn,
          disabledDates: [disabledDate],
          disableMobile: true,
          disableYearOverlay: true,
          id: 1,
          // position: 'bl' => this is the default position.
        })

        // This picker is only here to trigger a daterange pair so
        // that the `id` property above actually does something.
        const picker2 = datepicker('body', { id: 1 })

        // Properties.
        expect(picker.el).toBe(document.querySelector('input'))
        expect(picker.parent).toBe(picker.el.parentElement)
        expect(picker.nonInput).toBe(false)
        expect(picker.noPosition).toBe(false)
        expect(picker.position).toEqual({ bottom: 1, left: 1 })
        expect(+picker.startDate).toBe(+new Date(year, month, day))
        expect(+picker.dateSelected).toBe(+new Date(year, month, day))
        expect(picker.disabledDates.length).toBe(1)
        expect(+picker.disabledDates[0]).toBe(+disabledDate)
        expect(+picker.minDate).toBe(+minDate)
        expect(+picker.maxDate).toBe(+maxDate)
        expect(picker.noWeekends).toBe(true)
        expect(picker.weekendIndices).toEqual([1, 2])
        expect(picker.calendar).toBe(document.querySelector('.qs-datepicker'))
        expect(picker.currentMonth).toBe(month)
        expect(picker.currentMonthName).toBe(customMonths[month])
        expect(picker.currentYear).toBe(year)
        expect(picker.months).toEqual(customMonths)
        expect(picker.days).toEqual(['6','7','1','2','3','4','5']) // Because `startDay` is 5.
        expect(picker.startDay).toBe(5)
        expect(picker.overlayPlaceholder).toBe('Overlay Placeholder')
        expect(picker.overlayButton).toBe('Overlay Button')
        expect(picker.disableYearOverlay).toBe(true)
        expect(picker.disableMobile).toBe(true)
        expect(picker.isMobile).toBe(false)
        expect(picker.alwaysShow).toBe(true)
        expect(picker.id).toBe(1)

        // Methods.
        methods.forEach(method => expect(typeof picker[method]).toBe('function'))

        // Callbacks.
        callbacks.forEach(cb => expect(picker[cb]).toBe(fxn))

        // Functions.
        expect(picker.formatter).toBe(fxn)
        expect(picker.disabler).toBe(fxn)

        // Conditionals.
        expect(picker.sibling).toBe(picker2)
        expect(picker.first).toBe(true)

        /*
        'sibling',
        'first',
        'inlinePosition'
        */
      })
    })
  })

  describe('Daterange Instance', () => {})
})
