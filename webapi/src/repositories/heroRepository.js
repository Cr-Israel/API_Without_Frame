// Core Modules
const { readFile, writeFile } = require('fs/promises');

// Meu acesso a dados
class HeroRepository {
    constructor({ file }) {
        this.file = file;
    };

    async _currentFileContent() {
        return JSON.parse(await readFile(this.file));
    };

    async find(itemId) {
        const all = await this._currentFileContent();
        if (!itemId) return all; // Se alguém não mandar o ID, eu retorno tudo.

        return all.find(({ id }) => itemId === id); // Se mandou o ID, eu faço um filtro, eu faço um 'find()' por ID
    };

    async create(data) {
        const currentFile = await this._currentFileContent();
        currentFile.push(data);

        await writeFile(this.file, JSON.stringify(currentFile));

        return data.id;
    };
};

module.exports = HeroRepository;

const heroRepository = new HeroRepository({
    file: '../../database/data.json'
});
// heroRepository.create({ id: 2, name: 'Asa Noturna', }).then(console.log).catch(err => console.log('err', err));
// heroRepository.find(1).then(console.log).catch(err => console.log('err', err));