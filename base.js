var optionCount = 0;
var formData = []

validateData = (formData) => {
    let options={};
    const {name, type, required, order} = formData;
    if (name=="" || order=="") {
        return false;
    }
    switch(type) {
        case 'number': 
            let minRange = document.getElementById("min-range").value;
            let maxRange = document.getElementById("max-range").value;
            if (minRange=="" || maxRange=="" || minRange>maxRange || minRange == maxRange) {
                return false;
            }
            options.minRange = minRange;
            options.maxRange = maxRange;
            break;
        case 'checkboxes':
        case 'select':
        case 'radio':
            let tempCount = optionCount;
            while(tempCount){
                let name = document.getElementById(`name${optionCount}`).value;
                let value = document.getElementById(`value${optionCount}`).value;
                if (name=="" || value =="") {
                    return false;
                }
                tempCount-- ;
                options[name] = value;
            }
            break;
        case 'text':
        case 'textarea':
            if(document.getElementById("regex").value !== ''){
                options.regex = document.getElementById("regex").value;
            }
    }
    return options;
}

document.getElementById("create").addEventListener("click", function(e){
    var optionCount = 0;      //stop form from submitting
    let fieldData = {
        name: document.getElementById("newField-name").value,
        required: document.getElementById("newField-required").checked,
        order: document.getElementById("newField-order").value,
        type: document.getElementById("newField-type").value,
    }
    let validatedData = validateData(fieldData);
    if(!validatedData) {
        alert("Not all fields are added")
        return;
        e.preventDefault(); 
    }
    fieldData.options = validatedData;
    formData.push(fieldData);
    document.getElementById("right-pane").innerHTML = JSON.stringify(formData);
});

typeChange=()=>{
    optionCount = 0;
    debugger;
    let type = document.getElementById("newField-type").value;
    let options;
    switch(type) {
        case 'text': 
        case 'textarea': 
            options = `<label for="regex">Regex:</label> <input type="text" class="form-control" id="regex">`;
            break;
        case 'number': 
            options = `<label for="range">Range: <input type="number" class="min-number" id="min-range">
                        <input type="number" class="max-number" id="max-range"> </label>
                        <br>Regex:<input type="text" class="form-control" id="regex">`;
            break;
        case 'checkboxes':
        case 'radio':
        case 'select':
            options = `<button onclick="addOption()">Add Option</button>`
            break;
        default:
            options = ``;
    }
    document.getElementById("options").innerHTML = options;
}

addOption=()=>{
    debugger;
    optionCount = optionCount + 1;
    var el = document.createElement( 'html' );
    el.innerHTML = `<label for="option">option${optionCount}: Name: <input type="text" class="name" id="name${optionCount}">
    Value: <input type="text" class="value" id="value${optionCount}"><br> </label>`;
    document.getElementById("options").appendChild(el.getElementsByTagName( 'label' )[0]);
}


