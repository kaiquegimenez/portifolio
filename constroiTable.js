constroiTable();
function constroiTable() {
  let dadosOrçamentos = getOrçamentos()
  if(dadosOrçamentos.length > 0) {
    const tableData = dadosOrçamentos.map(function(dadosOrçamento){
        return(
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
      }).join('')
      const tableBody = document.getElementById("#tableBody");
      tableBody.innerHTML = tableData;
  } else {
    const tableHead = document.getElementById("#tableHead");
    tableHead.innerHTML = '<tr> <th> Você não possui orçamentos </th> </tr>'
  }
}

function getOrçamentos() {
  var dadosOrçamento = JSON.parse(localStorage.getItem("dadosOrçamento"));
  if(dadosOrçamento === null) {
      localStorage.setItem("dadosOrçamento", "[]");
      dadosOrçamento = [];
  }
  return dadosOrçamento;
}