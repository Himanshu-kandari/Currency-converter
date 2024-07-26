const cur1 = document.querySelector('.cur-1');
const cur2 = document.querySelector('.cur-2');
const cur1Input = document.querySelector('.cur-1-input');
const cur2Input = document.querySelector('.cur-2-input');

const baseRate = document.querySelector(".base");
const switchCur = document.querySelector(".switch-cur");


const apiURL = "https://v6.exchangerate-api.com/v6/";
const key = "1a95d122f8f26d493d0973bf"


async function getExchangeRate() {
	const valueCur1 = cur1.value;
	const valueCur2 = cur2.value; 
	const response = await fetch(`${apiURL}${key}/latest/${valueCur1}`);
	const data = await response.json();
	
	const rate = data.conversion_rates[valueCur2];

	baseRate.textContent = `1 ${valueCur1} = ${rate.toFixed(2)} ${valueCur2}`

	cur2Input.value = (cur1Input.value * rate).toFixed(2);
}

getExchangeRate();
cur1.addEventListener("change", () => {
	getExchangeRate();
	getFlag();
});
cur2.addEventListener("change", () => {
	getExchangeRate();
	getFlag();
});
cur1Input.addEventListener("input", getExchangeRate);
cur2Input.addEventListener("input", getExchangeRate);

switchCur.addEventListener("click", () => {
	const valCur1 = cur1.value;
	cur1.value = cur2.value;
	cur2.value = valCur1;
	switchCur.classList.toggle("rotate");
	getExchangeRate();
	getFlag();
})


function getFlag() {
	countries.forEach( country => {
	
		if (cur1.value == country.name) {
			const imgSrc = document.querySelector(".from img");
			imgSrc.setAttribute("src", country.flagURL)
		}
		if (cur2.value == country.name) {
			const imgSrc = document.querySelector(".to img");
			imgSrc.setAttribute("src", country.flagURL)
		}
	})
}