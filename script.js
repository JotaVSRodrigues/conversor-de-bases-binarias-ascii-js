const output = document.getElementById("output")

function printLine(text) {
    const line = document.createElement("div")
    line.textContent = text
    output.appendChild(line)

    efeitoEmbaralhado(line, text)
}

function createPrompt() {
    const line = document.createElement("div")
    
    const span = document.createElement("span")
    span.textContent = "sptech@joao:~$ "
    
    const input = document.createElement("input")
    input.type = "text"
    
    line.appendChild(span)
    line.appendChild(input)
    output.appendChild(line)
    
    input.focus() // coloca o foco do teclado no elemento input
    
    input.addEventListener("keydown", function (e) {
        if (e.key == "Enter") {
            const command = input.value
            
            input.disabled = true // para deixar o input antigo travado na tela (historico)
            processCommand(command)
            
            createPrompt()
        }
    })
}

function convert(value, fromBase, toBase) {
    const decimal = parseInt(value, fromBase);
    return decimal.toString(toBase).toUpperCase()
}


function getBase(name) {
    switch (name.toLowerCase()) {
        case "binary": return 2
        case "octal": return 8
        case "decimal": return 10
        case "hexadecimal": return 16
        default: return null
    }

}

function processCommand(cmd) {
    const parts = cmd.split(" ")

    if (parts[0] === "convert") {

        if (parts.length != 5 || parts[3] != "to") {
            printLine("Comando inválido")
            return 
        }
        const fromBaseName = parts[1]
        const value = parts[2]
        const toBaseName = parts[4]

        let fromBase = getBase(fromBaseName)
        let toBase = getBase(toBaseName)

        if (toBase == null || fromBase == null) {
            printLine("Base inválida.")
            return
        }

        const result = convert(value, fromBase, toBase)
        printLine(result)

    } 
    
    // comando: clear
    else if (cmd == "clear") {
        output.innerHTML = ""
        createPrompt()
    } 
    
    // comando: help
    else if (cmd == "help") {
        printLine("Comandos disponíveis:")
        printLine("convert <base> <valor> to <base>")
        printLine("Exemplo: convert hexadecimal FE359A to binary")
        printLine("Bases: binary, octal, decimal, hexadecimal")
        printLine("clear - limpa a tela")

    } 
    
    // comando desconhecido
    else {
        printLine("Comando desconhecido.")
    }

}

// implentação do código do Kevin
function efeitoEmbaralhado(elemento, textoFinal) {
    let letras = "ABCDEFGHIJKLMNOPQRTUVWXYZ!@#$1234567890";
    let iteracao = 0;
    let intervalo = setInterval(function () {
        let resultadoTemporario = "";

        for (let i = 0; i < textoFinal.length; i++) {
            if (i < iteracao) {
                resultadoTemporario = resultadoTemporario + textoFinal[i];
            } else {
                let indiceAleatorio = Math.floor(Math.random() * letras.length);
                resultadoTemporario = resultadoTemporario + letras[indiceAleatorio];
            }
        }


        elemento.textContent = resultadoTemporario;


        if (iteracao >= textoFinal.length) {
            clearInterval(intervalo);
        }


        iteracao = iteracao + 0.5; //0.5 é melhor pq as letras muda mais
    }, 30);
}

printLine(" ")
printLine(" ")
printLine("Digite: convert <base> <valor> to <base>")
printLine("Ex: convert decimal 250 to binary")
printLine("Digite 'help' para obter ajuda.")
printLine("")


createPrompt()