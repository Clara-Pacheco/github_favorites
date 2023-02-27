// classe que vai conter a lógica dos dados
// Como os dados serão estruturados - responsável por fazer
// a lógica dos dados/ guardar esses dados;
 
export class Favorites{
  constructor(root){
    this.root = document.querySelector('root')
  }

 
}


// classe que vai criar a visualização e eventos do HTML
// - responsável por construir a tabela

export class FavoritesView extends Favorites{
  constructor(root){
    super(root)

    this.update()
  }

  update(){
   this.removeAllTr()
  }

  removeAllTr(){
    const tbody = document.querySelector('tbody')
    tbody.querySelectorAll('tr').forEach((tr)=>{
      tr.remove()
    })
  }

}








// Iremos unir as duas classes através da ideia de herança