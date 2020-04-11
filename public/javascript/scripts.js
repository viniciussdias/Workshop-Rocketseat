function onOff(){ /* funcionalidade - ouvidor do evento de click */
    document
        .querySelector("#modal")
        .classList /* propriedade */
        .toggle("hide") /* colocar e tirar o hide */

    document
        .querySelector("body")
        .classList
        .toggle("hideScroll")

    document 
        .querySelector("#modal")
        .classList
        .toggle("addScroll")
}

function checkFields(event) {
    
    const valuesToCheck = [
        'title',
        'category',
        'image',
        'descripition',
        'link'
    ]

    const isEmpty = valuesToCheck.find(function(value) {
        
        const checkIfIsString = typeof event.target[value].value === 'string'
        const checkIfIsEmpty = !event.target[value].value.trim()

        if(checkIfIsString && checkIfIsEmpty) { // verifica se tem string e se tem campo vazio
            return true
        }
    })

    if(isEmpty) {
        event.preventDefault()
        alert('Por favor, preencha todos os campos!')
    }
}