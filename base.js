var optionCount = 0;

validateData = (formData) => {
    const {name, type, required, order} = formData;
    if (name=="" || order=="") {
        return false;
    }
    return true;
}

document.getElementById("create").addEventListener("click", function(e){
    var optionCount = 0;    e.preventDefault();    //stop form from submitting
    let formData = {
        name: document.getElementById("newField-name").value,
        required: document.getElementById("newField-required").checked,
        order: document.getElementById("newField-order").value,
        type: document.getElementById("newField-type").value,
    }
    if(!validateData(formData)) {
        alert("Add proper name and order")
    }
    debugger;
});

typeChange=()=>{
    optionCount = 0;
    debugger;
    let type = document.getElementById("newField-type").value;
    let options;
    switch(type) {
        case 'text': 
            options = `<label for="regex">Regex:</label> <input type="text" class="form-control" id="regex">`;
            break;
        case 'textarea': 
            options = `<label for="regex">Regex:</label> <input type="text" class="form-control" id="regex">`;
            break;
        case 'number': 
            options = `<label for="range">Range: <input type="number" class="min-number" id="min-range">
                        <input type="number" class="max-number" id="max-range"> </label>
                        <br>Regex:<input type="text" class="form-control" id="regex">`;
            break;
        case 'checkboxes':
            options = `<button onclick="addOption()">Add Option</button>`
            break;
        case 'select':
            options = `<button onclick="addOption()">Add Option</button>`
            break;
        case 'radio':
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


