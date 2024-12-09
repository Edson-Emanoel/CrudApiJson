import './App.css';
import axios from "axios";
import { useEffect, useState } from "react"

function App() {

  const [produtos, setProdutos] = useState([]);
  const url = "http://localhost:3000/produtos";

  const [id, setId] = useState("");
  const [produto, setProduto] = useState("");
  const [valor, setValor] = useState(0);
  const [qtd, setQtd] = useState(0);
  const [urlImg, setUrlImg] = useState("");

  const [editarBtn, setEditarBtn] = useState("sumir")
  const [cadastrarBtn, setCadastrarBtn] = useState("")

  useEffect(() => {
    axios.get(url)
    .then(res => setProdutos(res.data))
  }, [produtos, setProdutos])

  const Inserir = () => {
    axios.post(url, {
      produto,
      valor,
      qtd,
      urlImage: urlImg
    })
  }

  const Cadastrar = (e) => {
    e.preventDefault()

    if(!produto){
      alert("Preecha o campo de Nome do Produto")
      return true;
    } else if(!valor){
      alert("Preecha o campo de Nome do Valor")
      return true;
    } else if(!qtd){
      alert("Preecha o campo de Nome do Quantidade")
      return true;
    } else if(!urlImg){
      alert("Preecha o campo de Nome do Produto")
      return true;
    } else {
      Inserir()
      alert("Produto cadastrado com sucesso!")
    }

    setProduto("")
    setValor("")
    setQtd("")
    setUrlImg("")
  }

  const Remover = (id, nome) => {
    const confirm = window.confirm("Deseja realmente apagar o produto " + nome + " ? ")
    
    if(confirm){
      axios.delete(url + "/" + id)

      alert("Produto deletado com sucesso !")
    }
    
  }

  const Carregar = (id, nome, valor, qtd, urlImg) => {
    setId(id)
    setProduto(nome)
    setValor(valor)
    setQtd(qtd)
    setUrlImg(urlImg)

    setEditarBtn("")
    setCadastrarBtn("sumir")
  }

  const Editar = (e) => {
    e.preventDefault();

    axios.put(url + "/" + id, {
      produto: produto,
      valor: valor,
      qtd: qtd,
      urlImg: urlImg
    })
    
    alert("Produto Editado com sucesso !")

    setId("")
    setProduto("")
    setValor("")
    setQtd("")
    setUrlImg("")

    setEditarBtn("sumir")
    setCadastrarBtn("")
  }

  return (
    <div className="container">
      <h2 className="text-center mt-4 mb-5">Cadastro de Produtos</h2>

      <form className="d-flex flex-column gap-2">
        <div className="row">
          <div className="col">
            <input
              type="text"
              id="nome"
              value={produto}
              onChange={(e) => setProduto(e.target.value)}
              className="form-control"
              placeholder="Nome do Produto"
            />
          </div>
          <div className="col">            
            <input
              type="text"
              id="preco"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="form-control"
              placeholder="Preço do Produto"
            />
          </div>
          <div className="col">
            <input
              type="text"
              id="qtd"
              value={qtd}
              onChange={(e) => setQtd(e.target.value)}
              className="form-control"
              placeholder="Qtd. do Produto"
            />
          </div>
        </div>
        
        <div className="row">
          <div className="col">            
            <input
              type="text"
              id="url"
              value={urlImg}
              onChange={(e) => setUrlImg(e.target.value)}
              className="form-control"
              placeholder="Url da Imagem do Produto"
            />
          </div>
        </div>

        <div className="d-flex gap-2">
          <button className={`btn btn-success ${cadastrarBtn}`} onClick={Cadastrar}>Inserir</button>
          <button className={`btn btn-primary ${editarBtn}`} onClick={Editar}>Salvar</button>
        </div>

      </form>

      <h2 className="text-center mt-5 mb-3">Lista de Produtos</h2>

      <table className="table table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Produto</th>
            <th>Valor</th>
            <th>Qtd</th>
            <th>Imagem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.produto}</td>
              <td>{p.valor}</td>
              <td>{p.qtd}</td>
              <td>
                <img width={50} src={`${p.urlImg}`} alt={`${p.produto}`} />
              </td>
              <td>
                <div className="d-flex gap-1">
                  <button className="btn btn-warning" onClick={
                    () => Carregar(p.id, p.produto, p.valor, p.qtd, p.urlImg)}><i className="fa-solid fa-pen-to-square"></i></button>
                  <button className="btn btn-danger" onClick={() => Remover(p.id, p.produto)}><i className="fa-solid fa-trash"></i></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App