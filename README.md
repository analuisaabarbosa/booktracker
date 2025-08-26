BookTracker
===========

Uma aplicação web para gerenciar sua biblioteca de livros pessoais.

Descrição do Projeto
--------------------

O BookTracker é uma aplicação web simples e intuitiva que permite aos usuários catalogar, acompanhar e organizar seus livros. O projeto foi desenvolvido com o objetivo de oferecer uma solução leve e eficaz para quem deseja manter o controle de sua leitura, sem a necessidade de contas de usuário ou bancos de dados complexos, utilizando o localStorage do navegador para persistência de dados.

### Funcionalidades Principais:

*   **Adicionar Livros:** Adicione novos livros à sua biblioteca pesquisando por título, autor ou ISBN, utilizando a API do Google Books.
    
*   **Gestão de Estado:** Marque livros como "Lidos" ou "A Ler" para acompanhar seu progresso.
    
*   **Estatísticas Dinâmicas:** Visualize estatísticas em tempo real sobre sua biblioteca, incluindo total de livros, livros lidos, a ler e seu progresso geral.
    
*   **Edição e Exclusão:** Edite os detalhes de qualquer livro em sua coleção ou remova-o da biblioteca.
    
*   **Visualização Flexível:** Alterne entre a visualização em grade (grid) ou lista (list) e salve sua preferência no navegador.
    
*   **Filtros de Exibição:** Filtre sua biblioteca para exibir todos os livros, apenas os lidos, ou apenas os que ainda não foram lidos.
    

Instalação e Configuração
-------------------------

Para ter uma cópia local do projeto rodando em sua máquina, siga estas etapas:

1. Clone o repositório: 
```bash
  git clone https://github.com/analuisaabarbosa/booktracker.git
```

2. Navegue até o diretório do projeto:
```bash
  cd booktracker
```
    
3. Inicie um servidor local:
Como o projeto usa módulos JavaScript, ele precisa ser servido por um servidor web. Você pode usar extensões como Live Server no VS Code ou iniciar um servidor simples com o Nginx:
```bash
  # Se você tem Nginx instalado
  start nginx
```
Após iniciar o servidor, abra seu navegador e acesse http://localhost:8000.

### Ou, se você preferir testar a versão em produção, pode usar o link de deploy:
Acesse a aplicação diretamente pelo GitHub Pages: [BookTracker](https://analuisaabarbosa.github.io/booktracker/).


Uso
---

O uso do BookTracker é intuitivo. A interface permite que você adicione, edite, exclua e filtre livros de forma simples.

Tecnologias Utilizadas
----------------------

Este projeto foi construído utilizando as seguintes tecnologias:

*   **HTML5:** Para a estrutura e semântica da aplicação.
    
*   **CSS3:** Para a estilização e responsividade da interface.
    
*   **JavaScript (ES6):** Para a lógica da aplicação, manipulação do DOM e gestão de dados.
    
*   **API:** Google Books API (para a busca de livros).
    
*   **Armazenamento Local:** localStorage do navegador (para persistência de dados).
    

Estrutura do Projeto
--------------------

A estrutura de arquivos e pastas do projeto é a seguinte:

```
booktracker/
├── .gitignore           # Ignora arquivos e pastas indesejadas no Git
├── src/
│   ├── assets/
│   │   └── icons/       # Ícones e imagens do projeto
│   ├── css/
│   │   ├── styles.css   # Folha de estilo principal
│   │   └── mediaQueries.css  # Estilos para responsividade
│   └── js/
│       ├── main.js      # Ponto de entrada da aplicação
│       ├── ui.js        # Funções para manipulação da interface (DOM)
│       ├── events.js    # Funções para gerenciar eventos do usuário
│       ├── storage.js   # Funções para gerenciar o localStorage
│       └── api.js       # Funções para interagir com a API do Google Books
├── index.html           # Página principal da aplicação
└── README.md
```

Contribuição
------------

Contribuições são bem-vindas! Para contribuir com o BookTracker, por favor, siga os passos abaixo:

1.  Faça um fork do projeto.
    
2.  Crie uma nova branch (git checkout -b feature/sua-feature).
    
3.  Faça suas alterações e commit as mudanças (git commit -m 'feat: Adiciona nova funcionalidade').
    
4.  Envie suas mudanças para a sua branch (git push origin feature/sua-feature).
    
5.  Abra um Pull Request.
    

Licença
-------

Este projeto está licenciado sob a licença [MIT](https://www.google.com/search?q=https://github.com/analuisaabarbosa/book_tracker/blob/main/LICENSE).

Contato
-------

Se você tiver alguma dúvida, sugestão ou feedback, sinta-se à vontade para entrar em contato:

*   **Linkedln:** [analuisaabarbosa](https://www.linkedin.com/in/analuisaabarbosa/)
    
*   **Email:** analuisaaugustob@gmail.com
