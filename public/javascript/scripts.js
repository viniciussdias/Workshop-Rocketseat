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