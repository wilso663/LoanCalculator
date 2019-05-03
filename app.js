document.getElementById('loan-form').addEventListener('submit', function(event)
{
  //Hide results
  document.getElementById('results').style.display = 'none';
  //show fake loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 800);

  event.preventDefault();
});

function calculateResults()
{

  const loanAmount = document.getElementById('amount');
  const interestAmount = document.getElementById('interest');
  const yearsToRepay = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(loanAmount.value);
  const calculatedInterest = parseFloat(interestAmount.value) / 100 / 12;
  const calculatedPayments = parseFloat(yearsToRepay.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);

  const monthly = (principal * x * calculatedInterest)/(x-1);
  console.log(loanAmount);
  console.log(principal);
  console.log(calculatedInterest);
  if(isFinite(monthly))
  {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly  * calculatedPayments) - principal).toFixed(2);
    //Show results
    document.getElementById('results').style.display = 'block';
    //hide loading gif
    document.getElementById('loading').style.display = 'none';

  } else 
  {
    showError('Numbers entered not in proper format');

  }

}

function showError(error)
{
  //Show results
  document.getElementById('results').style.display = 'block';
  //hide loading gif
  document.getElementById('loading').style.display = 'none';
  const errorDiv = document.createElement('div');

  //Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Add class
  errorDiv.className = 'alert alert-danger';
  //Add text
  errorDiv.appendChild(document.createTextNode(error));
  //insert into DOM
  card.insertBefore(errorDiv, heading);

  //clear error after 3 seconds
  setTimeout(clearError, 3000);
}

function clearError()
{
  document.querySelector('.alert').remove();
}