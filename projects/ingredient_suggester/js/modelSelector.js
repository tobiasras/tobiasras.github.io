import {Birch, availableModels} from './models.js'


export let model = {}

const selectorElement = document.getElementById("model-selector")

selectorElement.addEventListener("input", (event) => {

    const model_desc = selectorElement.value

    const data_url = availableModels[model_desc]

    model = new Birch(data_url, model_desc)
})



// init load
const model_desc = selectorElement.value
const data_url = availableModels[model_desc]
model = new Birch(data_url, model_desc)


