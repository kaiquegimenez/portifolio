document.querySelector(".hamburguer").addEventListener("click", () =>
  document.querySelector(".container").classList.toggle("show-menu")
);

document.querySelector("#qtde").addEventListener("change", atualizarPreco)
document.querySelector("#js").addEventListener("change", atualizarPreco)
document.querySelector("#layout-sim").addEventListener("change", atualizarPreco)
document.querySelector("#layout-nao").addEventListener("change", atualizarPreco)
document.querySelector("#prazo").addEventListener("change", function () {
  const prazo = document.querySelector("#prazo").value
  document.querySelector("label[for=prazo]").innerHTML = `Prazo: ${prazo} semanas`
  atualizarPreco()
})

function constroiTable() {
  let dadosOrçamentos = getOrçamentos();
  const tableData = dadosOrçamentos.map(function (dadosOrçamento) {
    ;
    return (
      `
        <tr>
          <td>${dadosOrçamento.qtde}</td>
          <td>${dadosOrçamento.temJS ? 'Sim' : 'Não'}</td>
          <td>${dadosOrçamento.incluiLayout ? 'Sim' : 'Não'}</td>
          <td>${dadosOrçamento.prazo}</td>
          <td>${dadosOrçamento.precoOrçamento}</td>
        </tr>
      `
    )
  }).join('');
  const tableHead = document.getElementById("#tableHead");
  tableHead.innerHTML = 
    `
      <tr>
          <th>Páginas</th>
          <th>Layout</th>
          <th>JavaScript</th>
          <th>Prazo</th>
          <th>Valor</th>
      </tr>
    `
  const tableBody = document.getElementById("#tableBody");
  tableBody.innerHTML = tableData;
}


function atualizarPreco() {
  const qtde = document.querySelector("#qtde").value
  const temJS = document.querySelector("#js").checked
  const incluiLayout = document.querySelector("#layout-sim").checked
  const prazo = document.querySelector("#prazo").value

  var preco = qtde * 100;
  if (temJS) preco *= 1.1
  if (incluiLayout) preco += 500
  let taxaUrgencia = 1 - prazo * 0.1;
  preco *= 1 + taxaUrgencia

  document.querySelector("#preco").innerHTML = `R$ ${preco.toFixed(2)}`
}

const form = document.getElementById("formOrcamento")

form.addEventListener('submit', (e) => {
  e.preventDefault();
  novoOrcamento();
})

const formContato = document.getElementById("#formContato")

formContato.addEventListener('submit', (e) => {
  e.preventDefault();
  fazerContato();
})

function getOrçamentos() {
  var dadosOrçamento = JSON.parse(localStorage.getItem("dadosOrçamento"));
  if (dadosOrçamento === null) {
    localStorage.setItem("dadosOrçamento", "[]");
    dadosOrçamento = [];
  }
  return dadosOrçamento;
}

function novoOrcamento() {
  const qtde = document.querySelector("#qtde").value;
  const temJS = document.querySelector("#js").checked;
  const incluiLayout = document.querySelector("#layout-sim").checked;
  const prazo = document.querySelector("#prazo").value;
  const precoOrçamento = preco.textContent

  let auxOrçamento = {
    qtde,
    temJS,
    incluiLayout,
    prazo,
    precoOrçamento
  }

  let dadosOrçamento = getOrçamentos();

  if(dadosOrçamento.length > 20) {
    dadosOrçamento = [];
  }

  dadosOrçamento.push(auxOrçamento);

  localStorage.setItem("dadosOrçamento", JSON.stringify(dadosOrçamento));

  constroiTable();

}

function fazerContato() {
  number = +5514997172521;
  msg = document.getElementById("#mensagem").value;
  nome = document.getElementById("#nome").value;
  email = document.getElementById("#email").value;
  msg = `nome: ${nome} \ne-mail: ${email} \nmensagem: ${msg}`
  let target = `https://api.whatsapp.com/send?phone=${encodeURIComponent(number)}&text=${encodeURIComponent(msg)}`
  window.open(target, '_blank');
}