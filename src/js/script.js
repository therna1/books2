
const templates = {
  templateBook: Handlebars.compile(document.querySelector('#template-book').innerHTML)
};

class BooksList {
  constructor() {

    this.favoriteBooks = [];
    this.filters = [];

    this.initData();
    this.render();
    this.getElements();
    this.initActions();
  };

  initData() {
    this.data = dataSource.books;
  };

  getElements() {
    this.images = document.querySelectorAll('.books-list .book .book__image');
    this.filter = document.querySelector('.filters form');
  };

  render() {
    for (let book in this.data) {
      const ratingWidth = this.data[book].rating * 10;
      this.data[book].ratingWidth = ratingWidth;

      const ratingBgc = this.determineRatingBgc(this.data[book].rating)
      this.data[book].ratingBgc = ratingBgc;

      const HTML = templates.templateBook(this.data[book]);
      const generatedDOM = utils.createDOMFromHTML(HTML);
      const menuContainer = document.querySelector('.books-list');
      menuContainer.appendChild(generatedDOM);
    };
  };

  initActions() {
    const thisBooksList = this;

    for (let image of this.images) {
      image.addEventListener('dblclick', function (event) {
        event.preventDefault();
        let bookId = image.getAttribute('data-id');

        if (thisBooksList.favoriteBooks.includes(bookId)) {
          image.classList.remove('favorite');
          thisBooksList.favoriteBooks.splice(bookId);
        } else {
          image.classList.add('favorite');
          thisBooksList.favoriteBooks.push(bookId);
        }
      });
    };

    this.filter.addEventListener('click', function (event) {
      if (event.target.name == 'filter' && event.target.type == 'checkbox') {
      };

      if (event.target.checked == true) {
        thisBooksList.filters.push(event.target.value);
        thisBooksList.filterBooks();

      } else if (event.target.checked == false) {
        thisBooksList.filters.splice(event.target.value, 1);
        thisBooksList.filterBooks();
      };
    });
  };

  filterBooks() {
    const thisBooksList = this;

    for (let book of this.data) {
      let shouldBeHidden = false;

      for (const filter of thisBooksList.filters) {
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

  determineRatingBgc(rating) {
    if (rating < 6) {
      return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)'
    };
    if (rating > 6 && rating <= 8) {
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)'
    };
    if (rating > 8 && rating <= 9) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)'
    };
    if (rating > 9) {
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)'
    };
  };
};

new BooksList();





