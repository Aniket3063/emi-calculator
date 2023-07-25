const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");
const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".loan-amount .value");
const calculateBtn = document.querySelector(".calculate-btn");

let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);

let interest = interestRate/12/100;
let myChart;

const checkValues = () => {
    let loanAmountValue = loanAmountInput.value;
    let interestRateValue = interestRateInput.value;
    let loanTenureValue = loanTenureInput.value;
    
    let regexInteger = /^[0-9]+$/;
    let regexDecimal = /^(\d*\.)?\d+$/;
    if(!loanAmountValue.match(regexDecimal)){
        alert("Invalid Input");
        loanAmountInput.value = "0";
    }
    if(!loanTenureValue.match(regexInteger)){
        alert("Enter Integer in Tenure.");
        loanTenureInput.value = "0";
    }
    if(!interestRateValue.match(regexDecimal)){
        alert("Invalid Input");
        interestRateValue.value = "0.0";
    }

}
const displayChart = (totalInterestPayableValue) => {
    const ctx = document.getElementById('myChart');

    myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Total Interest', 'Principle Loan Amount'],
      datasets: [{
        data: [totalInterestPayableValue,loanAmount],
        backgroundColor:["#e63946","#0071A8"],
        borderWidth: 0,
      }]
    },
  });
}
const updateChart = (totalInterestPayableValue) =>{
    myChart.data.datasets[0].data[0] = totalInterestPayableValue;
    myChart.data.datasets[0].data[1] = loanAmount;
    myChart.update();

};
const calculateEMI =()=>{
    checkValues();
    refreshInputValue();
    let emi= loanAmount*interest*(Math.pow(1+interest,loanTenure) / (Math.pow(1+interest,loanTenure)-1));
    return emi;
}
const updateData = (emi) => {
    loanEMIValue.innerHTML = Math.round(emi);

    let totalAmount = Math.round(loanTenure*emi);
    totalAmountValue.innerHTML = totalAmount;

    let totalInterestPayable = Math.round(totalAmount - loanAmount);
    totalInterestValue.innerHTML = totalInterestPayable;

    
    if(myChart){
        updateChart(totalInterestPayable);
    }else{
        displayChart(totalInterestPayable);
    }
}
const refreshInputValue = () => {
    loanAmount = parseFloat(loanAmountInput.value);
    interestRate = parseFloat(interestRateInput.value);
    loanTenure = parseFloat(loanTenureInput.value);
    interest = interestRate/12/100;
}
const init = () => {
    let emi = calculateEMI();
    updateData(emi);
};
init();
calculateBtn.addEventListener("click",init);
