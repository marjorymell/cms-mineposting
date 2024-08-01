# Mineposting

<div align="center">
  <img src="views/imgs/mineposting.png" alt="Icon Mineposting">
</div>

Bem-vindo ao Mineposting, um sistema de gerenciamento de conteúdo (CMS) especialmente projetado para jogadores de Minecraft. Este projeto é alimentado por Node.js, Nodemon e Mustache, oferecendo uma solução flexível e poderosa para criar e gerenciar seu próprio blog sobre o jogo.

## Índice

- [Recursos Principais](#recursos-principais)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Contato](#contato)


## 📋 Recursos Principais

- **Autenticação de Usuário:** Mantenha seu blog seguro com autenticação de usuário robusta.
- **Criação de Página:** Adicione novas páginas e conteúdo facilmente para compartilhar suas histórias e análises do jogo.
- **Exclusão de Página:** Remova páginas indesejadas conforme necessário, mantendo seu blog organizado.
- **Edição de Conteúdo:** Atualize e aprimore o conteúdo das suas páginas.
- **Login de Admin:** Acesse recursos administrativos exclusivos para gerenciar seu blog com facilidade.
- **Validação de Parâmetros:** Garanta a integridade dos dados com validação de parâmetros incorporada.

## 📂 Estrutura do Projeto

A organização do código está estruturada da seguinte maneira:

- **scrr/**
  - **controllers/**
    - `admincontroller.js`: Controla funções administrativas como criação, edição e exclusão de páginas.
    - `defaultcontroller.js`: Controla funções de usuários comuns.
  - **routes/**
    - `adminroutes.js`: Define as rotas acessíveis apenas para administradores.
    - `defaultroutes.js`: Define as rotas acessíveis para todos os usuários.
  - **utils/**
    - `database.js`: Exporta o banco de dados.
    - `databaseMemorys.js`: Gerencia o banco de memória.
    - `validation.js`: Contém as validações.

- **views/**: Contém os arquivos Mustache para renderização das páginas HTML.
  - **admin/**: Contém os templates Mustache do admin.
    - `admin.mustache`: Template da página do admin.
    - `createNewPage.mustache`: Template da página de criação de novas páginas com o formulário para criar as páginas.
    - `deletePage.mustache`: Template da página de confirmação de exclusão de página.
    - `editPage.mustache`: Template da página de edição de página com o formulário para editar o conteúdo.
  - **default/**: Contém os templates Mustache padrão.
    - `index.mustache`: Página principal do CMS.
    - `login.mustache`: Página de login com os campos de formulário de login.

- **imgs/**: Contém os arquivos de imagem.

- **html/**: Contém os arquivos HTML gerados dinamicamente e o template Mustache base para o HTML.

## 🛠️ Tecnologias Utilizadas

- **Node.js:** Plataforma de desenvolvimento server-side.
- **Nodemon:** Ferramenta para monitorar e reiniciar automaticamente o servidor durante o desenvolvimento.
- **Mustache:** Motor de templates para renderização de páginas HTML.
- **databasememory:** Solução de banco de dados em memória para persistência de dados.
- **Joi:** Biblioteca para validação de dados.

## 🚀 Instalação

Para começar a usar o Mineposting, siga estas etapas simples:

1. Certifique-se de ter o Node.js instalado em seu sistema.
2. Faça o clone deste repositório em sua máquina local:

   ```bash
   git clone https://github.com/MarjoryMel/cms-mineposting
   
3. Abra o terminal e execute comando abaixo para instalar todas as dependências necessárias:
   npm install
4. Após a instalação bem-sucedida, execute o comando abaixo para iniciar o servidor:
   npm start
5. Acesse o seu blog através do navegador usando o endereço local : http://localhost:3000/

## 🧩 Uso

Após a instalação, você pode começar a usar o Mineposting para gerenciar seu blog sobre Minecraft. A tela inicial do blog apresenta alguns mobs do jogo, criando um ambiente temático envolvente.

### Página de login

Nessa página você pode realizar o seu login para poder utilizar o site. Você pode logar como usuário ou admin.

<img src="views/imgs/Captura da página de login.png" alt="Captura página login">

### Opções do site

Dentre as opções disponíveis, você pode criar uma nova página ou realizar o lougout.

<img src="views/imgs/Tela de opções.png" alt="Captura tela opções">

### Criação de página

Na página abaixo, você pode criar a página que deseja exibir no site, colocando um título e o conteúdo da página.

<img src="/views/imgs/Captura para criação de página.png" alt="Captura criação página">

### Exibição das páginas

Após criar uma página, você pode visualizar ela junto com as outras já criadas previamente.

<img src="views/imgs/Páginas criadas.png" alt="Captura páginas criadas">

## 🤝 Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Fork o repositório.
2. Crie um branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Push para o branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## 📞 Contato

Para dúvidas ou sugestões, entre em contato com:

- **GitHub:** [Gabvfla](https://github.com/Gabvfla), [MarjoryMel](https://github.com/MarjoryMel), [leila-minello](https://github.com/leila-minello), [Celsolf](https://github.com/Celsolf).

  
