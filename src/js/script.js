
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


let favoriteBooks = []

function initActions() {
  const images = document.querySelectorAll('.books-list .book .book__image');


  for (let image of images) {
    image.addEventListener('dblclick', function (event) {
      event.preventDefault();
      let bookId = image.getAttribute('data-id');

      if (favoriteBooks.includes(bookId)) {
        image.classList.remove('favorite');
        favoriteBooks.splice(bookId);
      } else {
        image.classList.add('favorite');
        favoriteBooks.push(bookId);

      };

    });
  }
  let filter = document.querySelector('.filters form')
  filters = [];

  filter.addEventListener('click', function (event) {
    if (event.target.name == 'filter' && event.target.type == 'checkbox') {
    };

    if (event.target.checked == true) {
      filters.push(event.target.value)
      hiddenBook();

    } else if (event.target.checked == false) {
      filters.splice(event.target.value, 1)
      hiddenBook();
    };
  })
};

function hiddenBook() {

  for (let book of dataSource.books) {
    let shouldBeHidden = false;

    for (const filter of filters) {
      if (!book.details[filter]) {
        shouldBeHidden = true;
        break;
      };
    };

    let dataBook = document.querySelector('.book__image[data-id=' + '"' + book.id + '"]');

    if (shouldBeHidden == true) {
      dataBook.classList.add('hidden');

    } else if (shouldBeHidden == false) {
      dataBook.classList.remove('hidden');
    };
  };
};





