const transacoesUl = document.querySelector("#transactions");
const incomeDislpay = document.querySelector("#money-plus");
const expanseDislpay = document.querySelector("#money-minus");
const balanceDislpay = document.querySelector("#balance");
const form = document.querySelector("#form");
const inputTransacao = document.querySelector("#text");
const inputTransacaoValor = document.querySelector("#amount");

//Array com as transacoes
let transacoes = [
    {
        id: 1,
        name: 'Bolo de brigadeiro',
        amount: -20
    },
    {
        id: 2,
        name: 'Salário',
        amount: 300
    },
    {
        id: 3,
        name: 'Torta de frango',
        amount: -10
    },
    {
        id: 4,
        name: 'Violão',
        amount: 150
    }
];

//Remover uma transacao
const removeTransacao = ID => {
    transacoes = transacoes.filter((transacao => transacao.id != ID));
    console.log(transacoes)
    init()
}

// Adicionar transacao
const adicionar_transacao = transacao => {
    const operacao = transacao.amount < 0 ? '-' : '+';
    const cssClass = transacao.amount < 0 ? 'minus' : 'plus';
    const amountOperacao = Math.abs(transacao.amount);
    const li = document.createElement('li');

    li.classList.add(cssClass);
    li.innerHTML = `
     ${transacao.name} 
     <span> ${operacao} R$ ${amountOperacao} </span>
     <button class="delete-btn" onClick = "removeTransacao(${transacao.id})" >x</button>`

    transacoesUl.append(li);
}

// Atualiza os valores de saldo e despesa
const atualizarValores = () => {
    
    const transacoesAmounts = transacoes
        .map(transacao => transacao.amount);

    const total = transacoesAmounts
        .reduce((accumulator, transacao) => accumulator + transacao, 0)
        .toFixed(2);

    const income = transacoesAmounts
        .filter(valor => valor > 0)
        .reduce((accumulator, valor) => accumulator + valor, 0)
        .toFixed(2);

    const expanse = Math.abs(transacoesAmounts
        .filter(valor => valor < 0)
        .reduce((accumulator, valor) => accumulator + valor, 0))
        .toFixed(2);

    balanceDislpay.textContent = `R$ ${total}`;
    incomeDislpay.textContent = `R$ ${income}`;
    expanseDislpay.textContent = `R$ ${expanse}`;
}

// Carrega a tela com os valores
const init = () => {
    transacoesUl.innerHTML = "";
    transacoes.forEach(adicionar_transacao);
    atualizarValores();
}
init();

// Gera um Indice aleatório
const generatedID = () => Math.round(Math.random() * 1000)


form.addEventListener('submit', event => {
    event.preventDefault()

    const transacaoNome = inputTransacao.value.trim();
    const transacaoValor = inputTransacaoValor.value.trim();

    // Verifica se os inputs estão vazios
    if(inputTransacao.value.trim() === '' || inputTransacaoValor.value.trim() === '') {
        alert("Preencha todos os campos");
        return;
    }

    //Adiciona a transacao na lista
    const transacao =  {
        id: generatedID,
        name: transacaoNome,
        amount: Number(transacaoValor)
    }

    transacoes.push(transacao);
    init();

    inputTransacao.value = "";
    inputTransacaoValor.value = "";
});