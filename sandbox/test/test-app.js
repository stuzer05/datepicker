require('./test-styles.css')

/*
  The Cypress tests will instantiate and remove the datepicker instances we wish to test.
  Here we're simply making the datepicker library available to Cypress via a global variable.
*/
window.dp = datepicker

// This function is for manual testing purposes.
window.go = function() {
  const inputs = document.querySelectorAll('input')
  x = dp(inputs[0], { id: 1, alwaysShow: 1 })
  y = dp(inputs[1], { id: 1, alwaysShow: 1 })
}
