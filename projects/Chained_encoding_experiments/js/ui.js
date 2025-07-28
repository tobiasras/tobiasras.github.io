
export function setupInputListeners(settings, reload) {
    function setupSlider(inputID, valueDisplayID, settingIndexString) {

        let gridSizeInput = document.getElementById(inputID)
        let valueDisplay = document.getElementById(valueDisplayID)

        settings[settingIndexString] = gridSizeInput.value

        gridSizeInput.addEventListener('input', (event) => {
            valueDisplay.textContent = gridSizeInput.value
            settings[settingIndexString] = gridSizeInput.value
        })
    }





    setupSlider("speed", "speed-display" , "animationSpeed");

}



export function updateUI(settings) {






}