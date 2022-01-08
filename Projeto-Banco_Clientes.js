// A intenção deste mini projeto é criar uma lista de objetos (clientes de um banco) com características específicas e métodos úteis para transações bancarias entre estes objetos (clientes)

const arrayDeClientes = []

class Cliente {
  constructor(nome, cpf, email, conta, saldo) {
    this.nome = nome
    this.cpf = cpf
    this.email = email
    this.conta = conta
    this.saldo = saldo
  }

  verificarSaldo() {
    console.log(`O saldo do(a) cliente é ${this.saldo}`)
  }

  depositarValor(valor) {
    this.saldo += valor
  }

  transferirEntreContas(cli1, cli2, valor) {
    cli1.saldo -= valor
    cli2.saldo += valor
    console.log(
      `Novo saldo de ${cli1.nome} é ${cli1.saldo}. Novo saldo de ${cli2.nome} é ${cli2.saldo}`
    )
  }
}

const jorge = new Cliente(
  'Jorge',
  '10345419430',
  'jorge@email.com',
  '66253',
  15000
)

const leticia = new Cliente(
  'leticia',
  '11111111111',
  'leticia@email.com',
  '58489',
  10000
)

// Verificando saldo anterior dos clientes
jorge.verificarSaldo()
leticia.verificarSaldo()

// Executando transferencia
jorge.transferirEntreContas(jorge, leticia, 500)

// Verificando saldo posterior dos clientes
jorge.verificarSaldo()
leticia.verificarSaldo()

// Agora vamos automatizar o processo de criação de clientes, precisaremos adicionar um pacote para o node para que consiga ler dados inseriods pelo usuario em tmepo real. Usamos no terminal npm install readline-sync

// a variavel abaixo é um objeto que utiliza as ações do pacote de leitura de dados

const readlineSync = require('readline-sync')

function adicionarCliente() {
  console.log('Informe os dados do novo cliente: ')
  let a1 = readlineSync.question('Nome: ')
  let a2 = readlineSync.question('cpf: ')
  let a3 = readlineSync.question('email: ')
  let a4 = readlineSync.question('conta: ')
  let a5 = readlineSync.question('saldo: ')

  let novoCliente = new Cliente(a1, a2, a3, a4, a5)
  arrayDeClientes.push(novoCliente)
}

//Vamos automatizar a quantidade de cliente a adicionar, para não precisar chamar a função o tempo todo

function numeroDeClientes() {
  let qtd = readlineSync.question('Quantos clientes irá adicionar? ')
  for (let index = 0; index < qtd; index++) {
    adicionarCliente()
  }
}

numeroDeClientes()

// Agora que conseguimos adicionar vários clientes num array. Vamos pesquisar dados dentro dessa lista de clientes. Queremos saber o cliente com maior saldo e o com menor saldo. Primeiro adicionei todos os saldos numa lista ordenada com o index de seus respectivos clientes

var listaDeSaldos = []
var listaDeNomes = []

for (let i = 0; i < arrayDeClientes.length; i++) {
  listaDeSaldos.push(arrayDeClientes[i].saldo)
  listaDeNomes.push(arrayDeClientes[i].nome)
}

// Agora precisamos buscar o maior saldo da lista de saldos "maior" através do Math.max, precisamos também converter esta nova variavel que esta com o valor do maior saldo em string, pois a lista de saldos coloca todos os valores em string. Agora podemos pesquisar o index dessa string na lista de saldos, como os indices de saldos e nomes estão ordenados, basta usar o mesmo indice onde o saldo foi encontrado para encontrar o nome do dono do slado na listaDeNomes.

let result = Math.max.apply(null, listaDeSaldos)
let paraString = result.toString()
let indexNome = listaDeSaldos.indexOf(paraString, 0)

console.log(
  `O(a) cliente com maior saldo na lista de clientes é ${listaDeNomes[indexNome]}, com o saldo de ${result}`
)
