const path = require('path');

module.exports = function (plop) {
  plop.setHelper('toConstantCase', (text) => {
    let result = text;

    if (text.endsWith('ies')) {
      result = text.slice(0, -3) + 'y';
    } else if (text.endsWith('s')) {
      result = text.slice(0, -1);
    }

    return result
      .replace(/Token$/, '') // remove "Token" no final
      .replace(/([a-z0-9])([A-Z])/g, '$1_$2') // separa camelCase/PascalCase
      .toUpperCase();
  });

  plop.setHelper('singular', (text) => {
    let result = text;

    if (text.endsWith('ies')) {
      result = text.slice(0, -3) + 'y';
    } else if (text.endsWith('s')) {
      result = text.slice(0, -1);
    }

    return result.charAt(0).toUpperCase() + result.slice(1);
  });

  plop.setGenerator('service', {
    description: 'Gerar Serviço',
    prompts: [
      {
        type: 'input',
        name: 'module',
        message: 'Módulo (ex: products)',
      },
      {
        type: 'input',
        name: 'name',
        message: 'Nome (ex: CreateProduct)',
      },
    ],
    actions: [
      {
        type: 'add',
        force: true,
        path: path.join(
          process.cwd(),
          'src/modules/{{module}}/services/{{pascalCase name}}Service/I{{pascalCase name}}.service.ts',
        ),
        templateFile: 'templates/service.interface.hbs',
      },
      {
        type: 'add',
        force: true,
        path: path.join(
          process.cwd(),
          'src/modules/{{module}}/services/{{pascalCase name}}Service/{{pascalCase name}}.service.ts',
        ),
        templateFile: 'templates/service.hbs',
      },
      {
        type: 'add',
        force: true,
        path: path.join(process.cwd(), 'src/modules/{{module}}/services/{{pascalCase name}}Service/index.ts'),
        pattern: /(\/\/ PLOP EXPORTS)/g,
      },
      {
        type: 'modify',
        path: path.join(process.cwd(), 'src/modules/{{module}}/services/{{pascalCase name}}Service/index.ts'),
        transform: (content) => {
          const name = process.argv[6];

          return `export * from './${name}.service';\nexport * from './I${name}.service';\n`;
        },
      },
      {
        type: 'add',
        path: path.join(process.cwd(), 'src/modules/{{module}}/services/index.ts'),
        template: '',
        skipIfExists: true,
      },
      {
        type: 'modify',
        path: path.join(process.cwd(), 'src/modules/{{module}}/services/index.ts'),
        transform: (content) => {
          const name = process.argv[6];

          const line = `export * from './${name}Service';`;

          if (content.includes(line)) return content;
          console.log({ content });
          return content + `${line}\n`;
        },
      },
    ],
  });

  plop.setGenerator('repository', {
    description: 'Gerar Repository',
    prompts: [
      {
        type: 'input',
        name: 'module',
        message: 'Módulo (ex: products)',
      },
      {
        type: 'input',
        name: 'name',
        message: 'Nome (ex: CreateProduct)',
      },
    ],
    actions: [
      {
        type: 'add',
        force: true,
        path: path.join(
          process.cwd(),
          'src/modules/{{module}}/repositories/{{pascalCase name}}Repository/I{{pascalCase name}}.repository.ts',
        ),
        templateFile: 'templates/repository.interface.hbs',
      },
      {
        type: 'add',
        force: true,
        path: path.join(
          process.cwd(),
          'src/modules/{{module}}/repositories/{{pascalCase name}}Repository/{{pascalCase name}}.repository.ts',
        ),
        templateFile: 'templates/repository.hbs',
      },
      {
        type: 'add',
        force: true,
        path: path.join(process.cwd(), 'src/modules/{{module}}/repositories/{{pascalCase name}}Repository/index.ts'),
        pattern: /(\/\/ PLOP EXPORTS)/g,
      },
      {
        type: 'modify',
        path: path.join(process.cwd(), 'src/modules/{{module}}/repositories/{{pascalCase name}}Repository/index.ts'),
        transform: (content) => {
          const name = process.argv[6];

          return `export * from './${name}.repository';\nexport * from './I${name}.repository';\n`;
        },
      },
      {
        type: 'add',
        path: path.join(process.cwd(), 'src/modules/{{module}}/repositories/index.ts'),
        template: '',
        skipIfExists: true,
      },
      {
        type: 'modify',
        path: path.join(process.cwd(), 'src/modules/{{module}}/repositories/index.ts'),
        transform: (content) => {
          const name = process.argv[6];

          const line = `export * from './${name}Repository';`;

          if (content.includes(line)) return content;
          console.log({ content });
          return content + `${line}\n`;
        },
      },
    ],
  });
};
