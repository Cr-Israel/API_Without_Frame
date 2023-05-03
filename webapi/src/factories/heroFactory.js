const HeroRepository = require('../repositories/heroRepository');
const HeroService = require('../services/heroService');

// Core Modules
const { join } = require('path');
const filename = join(__dirname, '../../database', 'data.json');

const generateInstance = () => {
    const heroRepository = new HeroRepository({
        file: filename
    });

    const heroService = new HeroService({
        heroRepository
    });

    return heroService; // O 'repository' sempre é acessado a partir da Service, ninguém pode acessar ele diretamente
};

module.exports = { generateInstance };

// generateInstance().find().then(console.log).catch(err => console.log('err', err));