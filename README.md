# BookTracker 

![Status do Projeto](https://img.shields.io/badge/status-concluído-green)
![Licença](https://img.shields.io/badge/license-MIT-blue)

Uma aplicação web para gerenciar sua biblioteca de livros pessoais, com busca via API do Google Books e persistência de dados no localStorage.

---
### Acesso ao Projeto (Live Demo)

O projeto está no ar e pode ser acessado através do GitHub Pages. Clique no botão abaixo para ver a aplicação em funcionamento:

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://analuisaabarbosa.github.io/booktracker/)

---

### Índice

* [Descrição do Projeto](#-descrição-do-projeto)
* [Funcionalidades](#-funcionalidades)
* [Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [Como Executar o Projeto](#-como-executar-o-projeto)
* [Estrutura do Projeto](#-estrutura-do-projeto)
* [Como Contribuir](#-como-contribuir)
* [Autor](#-autor)
  
---

### Descrição do Projeto

O BookTracker é uma aplicação web simples e intuitiva que permite aos usuários catalogar, acompanhar e organizar seus livros. O projeto foi desenvolvido com o objetivo de oferecer uma solução leve e eficaz para quem deseja manter o controle de sua leitura, sem a necessidade de contas de usuário ou bancos de dados complexos, utilizando o `localStorage` do navegador para persistência de dados.

---

### Funcionalidades

- **Adicionar Livros via API:** Pesquise por título, autor ou ISBN e adicione novos livros à sua biblioteca utilizando a API do Google Books.
- **Gestão de Estado:** Marque livros como "Lidos" ou "A Ler" para acompanhar seu progresso.
- **Estatísticas Dinâmicas:** Visualize dados em tempo real sobre sua biblioteca, incluindo total de livros, livros lidos, a ler e seu progresso geral.
- **Edição e Exclusão:** Edite os detalhes de qualquer livro ou remova-o da sua coleção.
- **Visualização Flexível:** Alterne entre a visualização em grade (grid) ou lista (list) com sua preferência salva no navegador.
- **Filtros de Exibição:** Filtre sua biblioteca para exibir todos os livros, apenas os lidos ou os que ainda estão na sua lista de leitura.

---

### Tecnologias Utilizadas

- **Front-end:**
  - `HTML5` 
  - `CSS3` 
  - `JavaScript (ES6)` 
- **APIs e Armazenamento:**
  - `Google Books API` 
  - `Browser localStorage` 
- **Deploy:**
  - `Nginx`
  - `Docker`

---

### Como Executar o Projeto

Para ter uma cópia local do projeto rodando em sua máquina, siga as opções abaixo.

#### Pré-requisitos

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/products/docker-desktop/) 

#### Executando com Docker 

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/analuisaabarbosa/booktracker.git
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd booktracker
    ```

3.  **Construa a imagem Docker:**
    *Este comando cria uma imagem chamada `booktracker-app` contendo a aplicação e o servidor Nginx.*
    ```bash
    docker build -t booktracker-app .
    ```

4.  **Execute o contêiner:**
    *Este comando inicia um contêiner em segundo plano (`-d`) e mapeia a porta 8080 do seu computador para a porta 80 do contêiner (`-p 8080:80`).*
    ```bash
    docker run -d -p 8080:80 --name booktracker booktracker-app
    ```

5.  **Acesse a aplicação:**
    Abra seu navegador e acesse [http://localhost:8080](http://localhost:8080).

---
### Estrutura do Projeto
```
booktracker/
├── .gitignore
├── assets/
│   ├── icons/  
│   ├── css/
│   │   ├── styles.css
│   │   └── mediaQueries.css
│   └── js/
│       ├── main.js
│       ├── ui.js
│       ├── events.js
│       ├── storage.js
│       └── api.js
├── index.html
└── README.md
```

---

### Como Contribuir

Contribuições são bem-vindas! Para contribuir com o BookTracker, por favor, siga os passos abaixo:

1.  Faça um **Fork** do projeto.
2.  Crie uma nova **Branch** (`git checkout -b feature/sua-feature`).
3.  Faça suas alterações e realize o **Commit** (`git commit -m 'feat: Adiciona nova funcionalidade'`).
4.  Envie suas mudanças para a sua branch (`git push origin feature/sua-feature`).
5.  Abra um **Pull Request**.

---

### Autor

Feito por **Ana Luisa**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/analuisaabarbosa/)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:analuisaaugustob@gmail.com)
