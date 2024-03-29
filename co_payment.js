"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Tutorial Case

   Payment Form Script
   
   Author: 
   Date:   
   
   Filename: co_payment.js
   
   Function List
   =============
   
   runSubmit()
      Runs validation tests when the submit button is clicked
      
   validateCVC()
      Validates the credit card CVC number
      
   validateMonth()
      Validates that the user has selected the expiration month of the credit card
      
   validateYear()
      Validates that the user has selected the expiration year of the credit card
      
   validateNumber()
      Validates that the user has entered a valid and legitimate card number
      
   validateCredit()
      Validates that the user has selected a credit card type
      
   validateName()
      Validates that the user has specified the name on the credit card
      
   sumDigits(numStr)
      Sums the digits characters in a text string
      
   luhn(idNum)
      Returns true of idNum satisfies the Luhn Algorithm

*/

window.addEventListener("load", function() {
   // Retrieve the field/value pairs from the URL
   var formData = location.search.slice(1);
   formData = formData.replace(/\+/g, " ");
   formData = decodeURIComponent(formData);
   var formFields = formData.split(/[&=]/g);

   // Write the field values to the order form
   document.forms.order.elements.orderDate.value = formFields[1];
   document.forms.order.elements.modelName.value = formFields[5];
   document.forms.order.elements.qty.value = formFields[7];
   document.forms.order.elements.initialCost.value = formFields[9];
   document.forms.order.elements.protectionName.value = formFields[13];
   document.forms.order.elements.protectionCost.value = formFields[15];
   document.forms.order.elements.subtotal.value = formFields[17];
   document.forms.order.elements.salesTax.value = formFields[19];
   document.forms.order.elements.totalCost.value = formFields[21];

});

// Additional event listener for the page load that focuses on the payment form
window.addEventListener("load", function() {
   // Add event handlers to different parts of the form
   document.getElementById("subButton").onclick = runSubmit;
   document.getElementById("cardName").oninput = validateName;
   document.getElementById("cardNumber").oninput = validateNumber;
   document.getElementById("expMonth").onchange = validateMonth;
   document.getElementById("expYear").onchange = validateYear;
   document.getElementById("cvc").oninput = validateCVC;
});

// Definition of the runSubmit() function
function runSubmit() {
   validateName();
   validateCredit();
   validateNumber();
   validateMonth();
   validateYear();
   validateCVC();
}

// Definition of the validateName() function
function validateName() {
   var cardName = document.getElementById("cardName");
   // Check the validity of that object, if there is a valueMissing property, user must have left the field empty
   if(cardName.validity.valueMissing) {
      cardName.setCustomValidity("Please enter your name as it appears on the card.");
   } else { 
      cardName.setCustomValidity("");
   }
}

// Definition of the validateCredit() function
function validateCredit() {
   var creditCard = document.forms.payment.elements.credit[0];
   // Check the validity of that object, if there is a valueMissing property, user must have left the field empty
   if(creditCard.validity.valueMissing) {
      creditCard.setCustomValidity("Please select your credit card.");
   } else { 
      creditCard.setCustomValidity("");
   }
}

// Definition of the validateNumber() function
function validateNumber() {
   var cardNumber = document.getElementById("cardNumber");
   if(cardNumber.validity.valueMissing) {
      cardNumber.setCustomValidity("Please enter your card number.");
   } else if(cardNumber.validity.patternMismatch) {
      cardNumber.setCustomValidity("Please enter a valid credit card number.");
   } else {
      cardNumber.setCustomValidity("");
   }
}

// Definition of the validateMonth() function
function validateMonth() {
   var cardMonth = document.getElementById("expMonth");
   if(cardMonth.selectedIndex === 0) {
      cardMonth.setCustomValidity("Please select the expiration month.")
   } else {
      cardMonth.setCustomValidity("");
   }
}

// Definition of the validateYear() function

function validateYear() {
   var cardYear = document.getElementById("expYear");
   if(cardYear.selectedIndex === 0) {
      cardYear.setCustomValidity("Please select the expiration year.")
   } else {
      cardYear.setCustomValidity("");
   }
}

// Definition of the validateCVC function
function validateCVC() {
   var cardCVC = document.getElementById("cvc");
   var creditCard = document.querySelector('input[name="credit"]:checked');
   if(cardCVC.validity.valueMissing) {
      cardCVC.setCustomValidity("Please enter your card's CVC number.");
   } else if((creditCard.value === "amex") && (/^\d{4}$/.test(cardCVC.value) === false)) {
      cardCVC.setCustomValidity("Please enter a 4-digit CVC number.");
   } else if((creditCard.value !== "amex") && (/^\d{3}$/.test(cardCVC.value) === false)) {
      cardCVC.setCustomValidity("Please enter a 3-digit CVC number.");
   } else {
      cardCVC.setCustomValidity("");
   }
}






