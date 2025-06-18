# Auth Role API

API RESTful desenvolvida com [NestJS](https://nestjs.com/) que implementa autenticação via JWT e controle de acesso baseado em roles (`admin` e `user`).

## Tecnologias utilizadas

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

---

## Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/arthvin/auth-role-api.git

cd auth-role-api

Instale as dependências

npm install

Configure as variáveis de ambiente

Crie um arquivo .env na raiz do projeto com os seguintes dados:

# Banco de dados PostgreSQL
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=123456
DATABASE_NAME=auth_db

# JWT
JWT_SECRET=sua_chave_secreta

Crie o banco de dados
Acesse o PostgreSQL e crie o banco de dados:
CREATE DATABASE auth_db;

Execute o projeto
npm run start:dev

🧪 Testando a API
1. Cadastro de usuário
http
POST /users/register
Content-Type: application/json

{
  "name": "João",
  "email": "joao@email.com",
  "password": "123456",
  "role": "user"
}
2. Login
http
POST /auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "123456"
}
🔐 Resposta:

json
{
  "access_token": "seu_token_jwt"
}

3. Acesso a rotas protegidas
Adicione o token ao header:

Authorization: Bearer seu_token_jwt
🔒 Rota apenas para admins:

http
GET /users
Usuários com role: user receberão:

json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}

👤 Rota acessível por admin e user:
http
GET /users/:id
PATCH /users/:id
DELETE /users/:id

📁 Estrutura do projeto (resumida)
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── jwt-auth.guard.ts
│   ├── roles.guard.ts
│   └── roles.decorator.ts
├── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── entities/user.entity.ts
│   └── dto/create-user.dto.ts
├── app.module.ts
└── main.ts

🛡️ Proteção com Roles
A API possui proteção baseada em perfis (roles), utilizando o decorator:

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin') // ou 'admin', 'user'

Arthur Vinícius de Oliveira Semensati -231051492
Daniel Barrionuevo Gomes - 220144962
Natanael Figueredo Balbo - 220141852
Rodrigo Shodi Sumioshi - 220141912
Vinicius Luiz Santa Rosa - 240421212
Pablo Vinicius Formagio Lima - 19933212
