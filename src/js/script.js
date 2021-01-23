

const templates = {
  templateBook: Handlebars.compile(document.querySelector('#template-book').innerHTML)
};


const menuContainer = document.querySelector('.books-list');


function render() {
  for (let book in dataSource.books) {

    const HTML = templates.templateBook(dataSource.books[book]);
    const generatedDOM = utils.createDOMFromHTML(HTML);
    menuContainer.appendChild(generatedDOM);
  }
}

render();
initActions();


let favoriteBooks = [];

function initActions() {
  const images = document.querySelectorAll('.books-list .book .book__image');

  for (let image of images) {
    image.addEventListener('dblclick', function (event) {
      event.preventDefault();
      let bookId = image.getAttribute('data-id');

      if(favoriteBooks.includes(bookId)){
        image.classList.remove('favorite');
        favoriteBooks.splice(bookId);
      } else {
        image.classList.add('favorite');
        favoriteBooks.push(bookId);
      };    
    });
  }
}
