// classe que vai conter a lógica dos dados
// Como os dados serão estruturados - responsável por fazer
// a lógica dos dados/ guardar esses dados;
 
export class Favorites{
  constructor(root){
    this.root = document.querySelector('root')
    this.load()
  }

  load() {
    const entries = [
      {
      login: 'maykbrito',
      name: "Mayk Brito",
      public_repos: '103',
      followers: '13.000'
      },
      {
      login: 'diego3g',
      name: "Diego Fernandes",
      public_repos: '60',
      followers: '27.100'
      },
      {
      login: 'Clara-Pacheco',
      name: "Clara Pacheco",
      public_repos: '84',
      followers: '61'
      }
    ]

    this.entries = entries
  }
 
}


// classe que vai criar a visualização e eventos do HTML
// - responsável por construir a tabela

export class FavoritesView extends Favorites{
  constructor(root){
    super(root)

    this.tbody = document.querySelector('tbody')

    this.update()
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