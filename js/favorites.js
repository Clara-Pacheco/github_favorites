import { GithubUser } from "./GithubUser.js"

// classe com uma função 'static' não pode ser instanciada

// classe que vai conter a lógica dos dados
// Como os dados serão estruturados - responsável por fazer
// a lógica dos dados/ guardar esses dados;
 
export class Favorites{
  constructor(root){
    this.root = document.querySelector('root')
    this.load()
  }

  load() {

    const entries = JSON.parse(localStorage.getItem('@github-favorites: ')) || []

    console.log(entries)
    this.entries = entries
  }

  save() {
    localStorage.setItem('@github-favorites: ', JSON.stringify(this.entries))
  }

  async add(username) {
    try {

    const userExists = this.entries.find(entry => entry.login === username)

    // Se a condição do método find retornar verdadeiro, ele pega essa entrada
    // e retorna como um objeto.

    if(userExists){
      throw new Error('Usuário já cadastrado')
    }


    const githubUser = await GithubUser.search(username)
    
    if(githubUser.login === undefined) {
      throw new Error('Usuário não encontrado!')
    }

    this.entries = [githubUser, ...this.entries]  // spread operator
    this.update()
    this.save()

    }catch(error){
      alert(error.message)
    }
   
  }

  // higher order functions
  // O filter diz o seguinte: essa função que vc está rodando
  // para esse usuário passado como parâmetro - se a lógica
  // passada na função retornar falso, o usuário em questão será removido.

    // se o filter retornar verdadeiro, ele coloca o usuário dentro
    // do novo array criado pelo filter, se ele retornar falso,
    // ele NÃO coloca o usuário passado como parâmetro dentro do 
    // novo array criado pelo filter.

  delete(user){
    
    const filteredEntries = this.entries.filter(entry => entry.login !== user.login )
    
    this.entries = filteredEntries
    this.update()
  }

  // se o login da entrada for igual ao login do usuário passado
  // como parâmetro, esse usuário não será adicionado no novo array
  // criado pelo filter; se o login da entrada for diferente do
  // login do usuário passado como parâmetro, esse usuário
  // será adicionado ao novo array criado pelo método filter.
}


// classe que vai criar a visualização e eventos do HTML
// - responsável por construir a tabela

export class FavoritesView extends Favorites{
  constructor(root){
    super(root)

    this.tbody = document.querySelector('tbody')

    this.update()
    this.onadd()
  }

  onadd(){
    const addButton = document.querySelector('.search button')
    addButton.onclick = () => {
      const value = document.querySelector('.search input').value

      this.add(value)
    }
  }

  update(){
   this.removeAllTr()

   this.entries.forEach(user => {
   
   const row = this.createRow()
   
   /*recebemos a estrutura html criada com o createRow e, com
   a DOM, iremos modificar os dados dessa estrutura */

   // Modificar o a imagem do usuário:  
   row.querySelector('.user img').src = `https://github.com/${user.login}.png`
   row.querySelector('.user p').textContent = user.name
   row.querySelector('.user img').alt = `Imagem de ${user.name}`
   row.querySelector('.user span').textContent = `${user.login}`
   row.querySelector('.repositories').textContent = user.public_repos
   row.querySelector('.followers').textContent = user.followers
   row.querySelector('.user a').href = `https://github.com//${user.login}`

   row.querySelector('.remove').onclick = () => {
    const isOk = confirm('Tem certeza de que deseja deletar a linha?')
    if(isOk){
      this.delete(user)
    }
   }



   this.tbody.append(row)
  })

  }

  // O container <tr></tr> precisa ser criado com a DOM

  createRow(){
    const tr = document.createElement('tr')

    const content = `
    <td class="user">
      <img src="https://github.com/Clara-Pacheco.png" alt="Imagem de Clara Pacheco">
      <a href="https://github.com/Clara-Pacheco" target="_blank">
      <p>Clara Pacheco</p>
      <span>Clara-Pacheco</span>
      </a>
    </td>
    <td class="repositories">83</td>
    <td class="followers">64</td>
    <td>
        <button class="remove">&times;</button>
    </td> `


    tr.innerHTML = content

    return tr

    /* Por que essa função irá retornar o tr? Porque iremos
    usá-la para cada elemento que tivermos nos dados */
  
  }

  removeAllTr(){
    this.tbody.querySelectorAll('tr').forEach((tr)=>{
      tr.remove()
    })
  }

}








// Iremos unir as duas classes através da ideia de herança