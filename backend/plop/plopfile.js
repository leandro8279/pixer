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

  // ── helpers locais para os transforms ────────────────────────────────────
  function singular(str) {
    let result = str;
    if (str.endsWith('ies')) result = str.slice(0, -3) + 'y';
    else if (str.endsWith('s')) result = str.slice(0, -1);
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  function pascalCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function toConstantCase(str) {
    let result = str;
    if (str.endsWith('ies')) result = str.slice(0, -3) + 'y';
    else if (str.endsWith('s')) result = str.slice(0, -1);
    return result.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();
  }

  plop.setGenerator('module', {
    description: 'Gerar Módulo completo (entity, repository, service, dto, controller, module)',
    prompts: [
      {
        type: 'input',
        name: 'module',
        message: 'Nome do módulo em plural (ex: products)',
      },
    ],
    actions: [
      // ── Entity ──────────────────────────────────────────────────────────
      {
        type: 'add',
        force: true,
        path: path.join(process.cwd(), 'src/modules/{{module}}/entities/{{singular module}}.ts'),
        templateFile: 'templates/module.entity.hbs',
      },

      // ── Repository ──────────────────────────────────────────────────────
      {
        type: 'add',
        force: true,
        path: path.join(
          process.cwd(),
          'src/modules/{{module}}/repositories/{{pascalCase module}}Repository/I{{pascalCase module}}.repository.ts',
        ),
        templateFile: 'templates/module.repository.interface.hbs',
      },
      {
        type: 'add',
        force: true,
        path: path.join(
          process.cwd(),
          'src/modules/{{module}}/repositories/{{pascalCase module}}Repository/{{pascalCase module}}.repository.ts',
        ),
        templateFile: 'templates/module.repository.hbs',
      },
      {
        type: 'add',
        force: true,
        path: path.join(
          process.cwd(),
          'src/modules/{{module}}/repositories/{{pascalCase module}}Repository/index.ts',
        ),
        template: '',
      },
      {
        type: 'modify',
        path: path.join(
          process.cwd(),
          'src/modules/{{module}}/repositories/{{pascalCase module}}Repository/index.ts',
        ),
        transform: (_, answers) => {
          const name = pascalCase(answers.module);
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
        transform: (content, answers) => {
          const name = pascalCase(answers.module);
          const line = `export * from './${name}Repository';`;
          if (content.includes(line)) return content;
          return content + `${line}\n`;
        },
      },

      // ── Service ─────────────────────────────────────────────────────────
      {
        type: 'add',
        force: true,
        path: path.join(
          process.cwd(),
          'src/modules/{{module}}/services/Get{{singular module}}Service/IGet{{singular module}}.service.ts',
        ),
        templateFile: 'templates/module.service.interface.hbs',
      },
      {
        type: 'add',
        force: true,
        path: path.join(
          process.cwd(),
          'src/modules/{{module}}/services/Get{{singular module}}Service/Get{{singular module}}.service.ts',
        ),
        templateFile: 'templates/module.service.hbs',
      },
      {
        type: 'add',
        force: true,
        path: path.join(
          process.cwd(),
          'src/modules/{{module}}/services/Get{{singular module}}Service/index.ts',
        ),
        template: '',
      },
      {
        type: 'modify',
        path: path.join(
          process.cwd(),
          'src/modules/{{module}}/services/Get{{singular module}}Service/index.ts',
        ),
        transform: (_, answers) => {
          const entity = singular(answers.module);
          return `export * from './Get${entity}.service';\nexport * from './IGet${entity}.service';\n`;
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
        transform: (content, answers) => {
          const entity = singular(answers.module);
          const line = `export * from './Get${entity}Service';`;
          if (content.includes(line)) return content;
          return content + `${line}\n`;
        },
      },

      // ── DTO ─────────────────────────────────────────────────────────────
      {
        type: 'add',
        force: true,
        path: path.join(
          process.cwd(),
          'src/modules/{{module}}/dto/{{singular module}}Response.dto.ts',
        ),
        templateFile: 'templates/dto.response.hbs',
      },
      {
        type: 'add',
        path: path.join(process.cwd(), 'src/modules/{{module}}/dto/index.ts'),
        template: '',
        skipIfExists: true,
      },
      {
        type: 'modify',
        path: path.join(process.cwd(), 'src/modules/{{module}}/dto/index.ts'),
        transform: (content, answers) => {
          const entity = singular(answers.module);
          const line = `export * from './${entity}Response.dto';`;
          if (content.includes(line)) return content;
          return content + `${line}\n`;
        },
      },

      // ── Controller ──────────────────────────────────────────────────────
      {
        type: 'add',
        force: true,
        path: path.join(
          process.cwd(),
          'src/modules/{{module}}/controllers/{{pascalCase module}}.controller.ts',
        ),
        templateFile: 'templates/module.controller.hbs',
      },

      // ── Module ──────────────────────────────────────────────────────────
      {
        type: 'add',
        force: true,
        path: path.join(process.cwd(), 'src/modules/{{module}}/{{module}}.module.ts'),
        templateFile: 'templates/module.hbs',
      },
    ],
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

  plop.setGenerator('dto', {
    description: 'Gerar DTO (Request + Response)',
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
          'src/modules/{{module}}/dto/{{pascalCase name}}Request.dto.ts',
        ),
        templateFile: 'templates/dto.request.hbs',
      },
      {
        type: 'add',
        force: true,
        path: path.join(
          process.cwd(),
          'src/modules/{{module}}/dto/{{pascalCase name}}Response.dto.ts',
        ),
        templateFile: 'templates/dto.response.hbs',
      },
      {
        type: 'add',
        path: path.join(process.cwd(), 'src/modules/{{module}}/dto/index.ts'),
        template: '',
        skipIfExists: true,
      },
      {
        type: 'modify',
        path: path.join(process.cwd(), 'src/modules/{{module}}/dto/index.ts'),
        transform: (content) => {
          const name = process.argv[6];

          const reqLine  = `export * from './${name}Request.dto';`;
          const respLine = `export * from './${name}Response.dto';`;

          let result = content;
          if (!result.includes(reqLine))  result += `${reqLine}\n`;
          if (!result.includes(respLine)) result += `${respLine}\n`;
          return result;
        },
      },
    ],
  });

  plop.setGenerator('formatter', {
    description: 'Gerar Formatter',
    prompts: [
      {
        type: 'input',
        name: 'module',
        message: 'Módulo (ex: products)',
      },
      {
        type: 'input',
        name: 'name',
        message: 'Nome (ex: Product)',
      },
    ],
    actions: [
      {
        type: 'add',
        force: true,
        path: path.join(
          process.cwd(),
          'src/modules/{{module}}/formatters/{{pascalCase name}}Formatter/I{{pascalCase name}}.formatter.ts',
        ),
        templateFile: 'templates/formatter.interface.hbs',
      },
      {
        type: 'add',
        force: true,
        path: path.join(
          process.cwd(),
          'src/modules/{{module}}/formatters/{{pascalCase name}}Formatter/{{pascalCase name}}.formatter.ts',
        ),
        templateFile: 'templates/formatter.hbs',
      },
      {
        type: 'add',
        force: true,
        path: path.join(process.cwd(), 'src/modules/{{module}}/formatters/{{pascalCase name}}Formatter/index.ts'),
        pattern: /(\/\/ PLOP EXPORTS)/g,
      },
      {
        type: 'modify',
        path: path.join(process.cwd(), 'src/modules/{{module}}/formatters/{{pascalCase name}}Formatter/index.ts'),
        transform: (content) => {
          const name = process.argv[6];

          return `export * from './${name}.formatter';\nexport * from './I${name}.formatter';\n`;
        },
      },
      {
        type: 'add',
        path: path.join(process.cwd(), 'src/modules/{{module}}/formatters/index.ts'),
        template: '',
        skipIfExists: true,
      },
      {
        type: 'modify',
        path: path.join(process.cwd(), 'src/modules/{{module}}/formatters/index.ts'),
        transform: (content) => {
          const name = process.argv[6];

          const line = `export * from './${name}Formatter';`;

          if (content.includes(line)) return content;
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
