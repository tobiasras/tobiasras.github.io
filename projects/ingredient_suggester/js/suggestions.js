import {addIngreident, selectedIngredients} from "./index.js"
import {model} from "./modelSelector.js";
import {createIngredient} from "./index.js"

const suggestions = document.getElementById("suggestion")

export function renderIngredients(suggestedIngredients) {
    suggestions.innerHTML = ""
    suggestedIngredients.forEach(ingredient => {
        let div = createIngredient("", ingredient)
        suggestions.appendChild(div)
    })


}

const infoElement = document.getElementById("info")


const valueContainer = document.getElementById("value-container")

export async function showSuggestions(transformed_data) {
    const sum = transformed_data.reduce((partialSum, a) => partialSum + a, 0)

    let counter = 0
    const values = transformed_data.map(val => {
        const formattedVal = (() => {
            const num = Number(val).toFixed(3);
            const [intPart, decPart] = num.split('.');
            return intPart.padStart(2, '0') + '.' + decPart;
        })();

        let str = `<p><span class="mr-1">${String(counter).padStart(2, '0')}:</span>${Number(val).toFixed(3)}</p>`;
        counter += 1;
        return str;
    });
    valueContainer.innerHTML = values.join('')

    if (sum !== 0) {
        const label = model.predict(transformed_data)
        const currentModelDesc = model.model_desc

        const labelInfo = `
          <p>Showing ingredients from LABEL: ${label}</p>
        `;

        infoElement.innerHTML = labelInfo;

        const ingredients =  await fetchIngredients(currentModelDesc, label)
        renderIngredients(ingredients)
    } else {
        renderIngredients([])
    }
}



async function fetchIngredients(model_desc, label){
    const res = await fetch(`assets/data/${model_desc}/clusters/${label}_unique_ingredients.csv`)
    const csvText = await res.text();
    let rows = csvText.split('\r\n')
    rows.shift() // removes first desc row in csv.
    rows = rows.filter(row => !selectedIngredients.has(row.split(',')[0]) )
    return rows.map(row => row.split(',')[0])
}





