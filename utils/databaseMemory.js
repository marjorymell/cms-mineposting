class DatabaseMemory {
    constructor() {
        this.pages = [];
    }

    getAllPages() {
        return this.pages;
    }

    getPageByTitle(title) { 
        return this.pages.find(page => page.title === title);
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
