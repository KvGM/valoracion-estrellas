//CREAR un nodo, elegiendo, tipo, texto, clases y atributos
function createNode(nodeType, nodeText, nodeClasess, nodeAttributtes) {
    let node = document.createElement(nodeType);
    if (nodeText != "" && nodeText != null) {
        node.appendChild(document.createTextNode(nodeText));
    }
    if (nodeClasess.length > 0) {
        nodeClasess.forEach(clss => node.classList.add(clss));
    }
    if (nodeAttributtes.length > 0) {
        nodeAttributtes.forEach(attributte => node.setAttribute(attributte.name, attributte.value));
    }
    return node;
}

//CREA las estrellas necesarias y AÑADE el evento Click
function crearEstrellas(zona) {
    const totalEstrellas = 5;
    for (let cont = 0; cont < totalEstrellas; cont++) {
        let btn = createNode("button", "", [], [{
            name: "type",
            value: "button"
        }]);
        let estrella = createNode("img", "", ["estrella"], [{
            name: "src",
            value: "./img/estrellaTransparente.png"
        }, {
            name: "data-valor",
            value: cont
        }]);
        estrella.addEventListener('click', calcularEstrellas);
        btn.appendChild(estrella);
        zona.appendChild(btn);
    }

}

//CARGA los elementos del FORMULARIO
function cargarForm() {
    const zonaFormulario = document.forms[0];
    let agrupadorEstrellas = createNode("div", "", ["estrellas"], []);
    crearEstrellas(agrupadorEstrellas);
    zonaFormulario.appendChild(agrupadorEstrellas);
    zonaFormulario.appendChild(createNode("input", "", [], [{
        name: "type",
        value: "hidden"
    }, {
        name: "value",
        value: "0"
    }]));
    let enviar = createNode("input", "", ["enviar"], [{
        name: "type",
        value: "submit"
    }, {
        name: "value",
        value: "Enviar"
    }, {
        name: "disabled",
        value: true
    }]);
    zonaFormulario.addEventListener('submit', (e) => {
        e.preventDefault();
        let valor = document.forms[0].elements[5].getAttribute("value");
        imprimirValoracion(valor);
    });
    zonaFormulario.appendChild(enviar);
}

//CALCULA cuantas estrellas tienen que cambiar y pasa el valor al hidden
function calcularEstrellas(event) {
    //Podría buscar si existe alguna estrella distinta de transparente antes de borrar, ya que la primera borrar igualmente.
    let zonaEstrellas = document.getElementsByClassName("estrellas")[0];
    borrarNodosHijos(zonaEstrellas);
    crearEstrellas(zonaEstrellas);
    const elementosForm = [...document.forms[0].elements];
    let estrellas = elementosForm.filter(estrella => estrella.nodeName == "BUTTON");
    let valorUser = parseInt(event.target.dataset.valor) + 1;
    for (let cont = 0; cont < valorUser; cont++) {
        estrellas[cont].firstElementChild.setAttribute("src", "./img/estrellaAmarilla.png");
    }
    document.forms[0].elements[5].setAttribute("value", valorUser); //Cambiar valor del Hidden
    let estadoEnv = document.forms[0].elements[6];
    if (estadoEnv.getAttribute("disabled") == "true") {
        estadoEnv.removeAttribute("disabled");
    }
}

//IMPRIME el section o lo EDITA
function imprimirValoracion(valor) {
    if (valor != 0) {
        let zonaSection = document.getElementsByTagName("main")[0].children[1];
        let valorUser = `Has valorado el producto con ${valor} estrella/s`;
        if (typeof zonaSection === "undefined") {
            let valoracion = createNode("section", valorUser, ["valoracion"], []);
            let zonaMain = document.getElementsByTagName("main")[0];
            zonaMain.appendChild(valoracion);
        } else {
            zonaSection.textContent = valorUser;
        }
    }
}

//BORRAR los nodos HIJOS
function borrarNodosHijos(padre) {
    while (padre.firstChild) {
        padre.removeChild(padre.firstChild);
    }
}

cargarForm();