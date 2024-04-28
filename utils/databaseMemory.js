class DatabaseMemory {
    constructor() {
        this.pages = [];
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
        return this.pages.find(page => page.id === id);
    }

    createPage(title, content) {
        console.log("Iniciando a criação de uma nova página...");
        const newPage = {
            id: this.pages.length + 1, 
            title, 
            content
        };
        this.pages.push(newPage);
        console.log("Página criada com sucesso:", newPage);
        return newPage;
    }

    updatePage(id, title, content) {
        const page = this.getPageById(id);
        if (!page) {
            return null;
        }
        page.title = title || page.title;
        page.content = content || page.content;
        return page;
    }

    deletePage(id) {
        const index = this.pages.findIndex(page => page.id === id);
        if (index === -1) {
            return false;
        }
        this.pages.splice(index, 1);
        return true;
    }
    
}

module.exports = DatabaseMemory;
