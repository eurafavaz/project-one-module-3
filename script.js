const baseUrl = "https://el-geladon-backend-by-ip.herokuapp.com/paletas";

// const response = fetch(`${baseUrl}/find-paletas`)
// console.log("response:", response);

// READ

async function findAllPaletas() {
  const response = await fetch(`${baseUrl}/find-paletas`);

  console.log("response:", response);

  const paletas = await response.json();
  console.log("paletas:", paletas);

  // DOM

  const paletaDivElement = document.getElementById("paletaList");

  // console.log("paletaDivElement:", paletaDivElement)

  // for (let i = 0; i<paletas.length; i++) {
  //   //   console.log(paletas[i]["descricao"])

  //   // 1. Seletores HTML:

  //   // getElementById("paletaList")
  //   // querySelector("#paletaList")
  //   // querySelectorAll(PaletaListItem)

  //   // 2. Alteração que eu quero fazer:

  //   paletaDivElement.insertAdjacentHTML("beforeend",
  //   `<div class="PaletaListaItem">
  //       <div>
  //         <div class="PaletaListaItem__sabor">${paletas[i].sabor}</div>
  //         <div class="PaletaListaItem__preco">R$${paletas[i].preco},00</div>
  //         <div class="PaletaListaItem__descricao">${paletas[i].descricao}</div>
  //       </div>
  //         <img class="PaletaListaItem__foto" src=${paletas[i].foto} alt="Paleta de Doce de Leite" />
  //     </div>
  //   `)
  // }

  // A visualização das minhas imagens não funcionou com o MAP, embora o caminho esteja correto:

  paletas.map(function (paleta) {
    return document.getElementById("paletaList").insertAdjacentHTML(
      "beforeend",
      `<div class="PaletaListaItem" id="PaletaListaItem_${paleta._id}">
            <div>
            <div id=""paletaId" class="PaletaListaItem__id">${paleta._id}</div>
              <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
              <div class="PaletaListaItem__preco">R$${paleta.preco},00</div>
              <div class="PaletaListaItem__descricao">${paleta.descricao}</div>
            </div>
              <img class="PaletaListaItem__foto" src=${paleta.foto} alt="Paleta de ${paleta.sabor}" />
            <div>
              <button onclick="">Apagar</button>
              <button onclick="abrirModalCadastro()">Editar</button>
            </div>
            </div>`
    );
  });
}

findAllPaletas();


async function fetchOnePaleta(id) {
  const response = await fetch(`${baseUrl}/find-paleta/${id}`);
  const paleta = await response.json();
  console.log("paleta:", paleta);

  return paleta;

}

// READ ONE

// const id = "628ab99eaa2a2610eae87dee";

async function findOnePaleta() {
  const inputElement = document.querySelector("#idPaleta");
  console.log("inputElement:", inputElement);

  const id = inputElement.value;

  const response = await fetch(`${baseUrl}/find-paleta/${id}`);

  const paleta = await response.json();
  console.log("paleta:", paleta);

  const divPaletaEscolhidaElement = document.querySelector("#paletaEscolhidaElement");

  console.log("divPaletaEscolhidaElement:", divPaletaEscolhidaElement)

  divPaletaEscolhidaElement.innerHTML =
  `<div class="PaletaListaItem">
    <div>
      <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
      <div class="PaletaListaItem__preco">R$${paleta.preco},00</div>
      <div class="PaletaListaItem__descricao">${paleta.descricao}</div>
        </div>
      <img class="PaletaListaItem__foto" src=${paleta.foto} alt="Paleta de ${paleta.sabor}" />
    </div>`
}

// findOnePaleta();

const modalElement = document.querySelector("#overlay");

function abrirModalCadastro() {

  const paletaId = document.querySelector("paletaId").innerText;

  modalElement.style.display = "flex"
}

function fecharModalCadastro(){
  modalElement.style.display = "none"
}



// CREATE

async function createPaleta() {
  
  const sabor = document.getElementById("sabor").value;
  const preco = document.getElementById("preco").value;
  const descricao = document.getElementById("descricao").value;
  const foto = document.getElementById("foto").value;

  const paleta = {sabor, preco, descricao, foto};
  console.log("paleta:", paleta)

  const response = await fetch(`${baseUrl}/create`,
    {
      method: "post",
      headers: {"Content-Type": "application/json"},
      mode: "cors",
      body: JSON.stringify(paleta)
    }
  );

  const novaPaleta = await response.json();
  console.log("novaPaleta:", novaPaleta);

  fecharModalCadastro();
  // findAllPaletas();
};

// UPDATE

// const id = "628ab99eaa2a2610eae87dee";

async function updatePaleta(id) {

  const paletaAntes = fetchOnePaleta(id);

  // const paleta = {sabor, preco, descricao, foto};
  console.log("paletaAntes:", paletaAntes);

  const paleta = {...paletaAntes, sabor: "Morango"};

  console.log("paleta dentro do update:", paleta);

  const response = await fetch(`${baseUrl}/update/${id}`,
    {
      method: "put",
      headers: {"Content-Type": "application/json"},
      mode: "cors",
      body: JSON.stringify(paleta)
    }
  );

  const paletaAntesDaAtualizacao = await response.json();
  console.log("paletaAntesDaAtualizacao:", paletaAntesDaAtualizacao);

  findAllPaletas();
}

// updatePaleta();

// DELETE

async function deleteOnePaleta() {
  
  const id = "628c194653882e88f5cb8078";

  const response = await fetch(`${baseUrl}/delete/${id}`,
    {
      method: "delete",
      headers: {"Content-Type": "application/json"},
      mode: "cors",
    }
  );

  const deleteResponse = await response.json();
  console.log("deleteResponse:", deleteResponse);

  // findAllPaletas();

}

// deleteOnePaleta()


