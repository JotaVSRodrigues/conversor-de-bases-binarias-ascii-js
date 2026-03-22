const output = document.getElementById("output");


// IMPRIME O TEXTO
function printLine(text) {
    const line = document.createElement("div")
    line.textContent = text
    output.appendChild(line)
}

// CRIA NOVAS LINHAS DE COMANDO
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

    // Quando apertar ENTER
    input.addEventListener("keydown", function (e) {
        if (e.key == "Enter") {
            const command = input.value

            input.disabled = true // para deixar o input antigo travado na tela (historico)
            processCommand(command)

            createPrompt()
        }
    })
}

// CONVERSAO DE BASES
function convert(value, fromBase, toBase) {
    const decimal = parseInt(value, fromBase);
    return decimal.toString(toBase).toUpperCase()
}


// DETECTA BASE AUTOMATICAMENTE
function detectBase(value) {
    if (/^[01]+$/.test(value)) return 2
    if (/^[0-7]+$/.test(value)) return 8
    if (/^[0-9]+$/.test(value)) return 10
    return 16
}

// TRADUZ O NOME DA BASE
function getBase(name) {
    switch (name.toLowerCase()) {
        case "binary": return 2
        case "octal": return 8
        case "decimal": return 10
        case "hexadecimal": return 16
        default: return null
    }

}

// PROCESSA O COMANDO
function processCommand(cmd) {
    const parts = cmd.split(" ")

    if (parts[0] === "convert") {
        const value = parts[1]
        const toBaseName = parts[3]

        let fromBase = detectBase(value)
        let toBase = getBase(toBaseName)

        if (toBase == null) {
            printLine("Base inválida.")
            return
        }

        const result = convert(value, fromBase, toBase)
        printLine(result)

    } 
    
    // comando: clear
    else if (cmd == "clear") {
        output.innerHTML = ""
        printLine("")

    } 
    
    // comando: help
    else if (cmd == "help") {
        printLine("Comandos disponíveis:")
        printLine("convert <valor> to <base>")
        printLine("Bases: binary, octal, decimal, hexadecimal")
        printLine("clear - limpa a tela")

    } 
    
    // comando desconhecido
    else {
        printLine("Comando desconhecido.")
    }

}



// INICIALIZACAO DO PROGRAMA
printLine(" ")
printLine(" ")
printLine("Digite: convert <valor> to <base>")
printLine("Ex: convert 10 to binary")
printLine("Digite 'help' para obter ajuda.")
printLine("")


createPrompt()