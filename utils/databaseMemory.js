class DatabaseMemory {
    constructor() {
        this.pages = [];
        this.nextId = 1; // Unic ID for each page
    }

    getAllPages() {
        console.log("Páginas buscadas:", this.pages);
        return this.pages;
    }

    getPageByTitle(title) {
        console.log("Buscando página com o título:", title);
        const page = this.pages.find(page => page.title === title);
        if (page) {
            console.log("Página encontrada:", page);
        } else {
            console.log("Página não encontrada para o título:", title);
        }
        return page;
    }

    getPageById(id) {
        console.log("Buscando página com o ID:", id);
        return this.pages.find(page => page.id === id);
    }

    createPage(title, content) {
        console.log("Iniciando a criação de uma nova página...");
        const newPage = {
            id: this.nextId++, 
            title,
            content
        };
        this.pages.push(newPage);
        console.log("Página criada com sucesso:", newPage);
        return newPage;
    }

    updatePage(id, title, content) {
        console.log("Atualizando página com o ID:", id);
        const page = this.getPageById(id);
        if (!page) {
            console.log("Página não encontrada para o ID:", id);
            return null;
        }
        if (title !== undefined) {
            page.title = title; 
        }
        if (content !== undefined) {
            page.content = content; 
        }
        console.log("Página atualizada com sucesso:", page);
        return page;
    }

    deletePage(id) {
        console.log("Deletando página com o ID:", id);
        const index = this.pages.findIndex(page => page.id === id);
        if (index === -1) {
            console.log("Página não encontrada para o ID:", id);
            return false;
        }
        this.pages.splice(index, 1);
        console.log("Página deletada com sucesso.");
        return true;
    }
}

module.exports = DatabaseMemory;
