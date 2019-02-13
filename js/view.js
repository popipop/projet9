const view = {

  afficherPage() {
    this.afficherMenu();
    actus.readAjax(url , apiKey, 'technology', lg, this.afficherArticles);
    window.addEventListener('hashchange', this.changerArticles)
  },

  afficherArticles(data) {
    const ulArticles = document.getElementById('articles');
      ulArticles.innerHTML = '';
    const articles = JSON.parse(data).articles;
    console.log(articles);
    for (let article in articles) {
      view.ligne(articles[article]);
    };
  },

  ligne(article) {
    const elem = document.createElement('li');
    const contenu = `
      <div class="collapsible-header wave-effect waves-light">
        <h4>${article.title}</h4>
      </div>
      <div class="collapsible-body">
      <a href="${article.url}" target="_blank"><p>${article.description}</p>
      ${article.url ? `<img src=${article.urlToImage} class="img-article" />` : ''}
      </a>
      </div>`;
    elem.insertAdjacentHTML("beforeend", contenu);
    const ul = document.getElementById('articles');
    ul.appendChild(elem);
    const instances = M.Collapsible.init(ul);
  },

  afficherMenu() {
    for (const keyword in keywords) {
      if (keywords.hasOwnProperty(keyword)) {
        const element = keywords[keyword];
        this.afficherLigneMenu(element, keyword);
      }
    }
  },

  afficherLigneMenu(nomMenu, classMenu) {
    const elem = document.createElement('li');
    const a = document.createElement('a');
    a.setAttribute('href', `#/${classMenu}`);
    a.textContent = nomMenu;
    elem.appendChild(a);
    const ulActus = document.getElementById('listActu');
    ulActus.appendChild(elem);
  },

  changerArticles() {
    const route = document.location.hash.split('/')[1];
    actus.readAjax(url , apiKey, route, lg, view.afficherArticles);
  }
}