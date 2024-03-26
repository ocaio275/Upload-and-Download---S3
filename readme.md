# Upload e Download usando Amazon S3
Este repositório contém uma API desenvolvida com o objetivo de criar usuários no banco de dados MySQL e armazenar documentos no Bucket do Amazon S3, permitindo o download dos arquivos utilizando [URL Presigned](https://docs.aws.amazon.com/pt_br/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html). Este projeto é ideal para estudos e demonstrações de integração com serviços de armazenamento em nuvem.

## Funcionalidades Principais:
- Cadastro de Usuários: A API permite a criação de usuários, armazenando suas informações no banco de dados MySQL, incluindo email e senha para autenticação.

- Upload de Documentos: Os usuários podem fazer o upload de documentos para o Bucket do Amazon S3, utilizando a API.

- Download Seguro: Utilizando [URL Presigned](https://docs.aws.amazon.com/pt_br/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html), os usuários podem baixar os documentos armazenados no Amazon S3 com segurança.
## Como Utilizar:

### Configuração do Ambiente:
1. Criação do arquivo .env:
    - Crie um arquivo chamado `.env` na raiz do projeto.
    - Adicione as seguintes variáveis de ambiente no arquivo `.env`:

                # API
                PORT=3000  // Escolha a porta desejada para executar o servidor
                API_VERSION="v1"  // Especifique a versão da API
                SECRET_KEY=SuaChaveSecreta  // Utilizada para autenticação e autorização

                #AWS
                AWS_ACCESS_KEY_ID=SuaAccessKeyID
                AWS_SECRET_ACCESS_KEY=SuaSecretAccessKey
                AWS_REGION=SuaRegião

                #Mysql
                DB_USERNAME=SeuUsuárioMySQL 
                DB_PASSWORD=SuaSenhaMySQL 
                DB_DATABASE=SeuBancoDeDadosMySQL
                DB_HOSTNAME=SeuHostMySQL

        Certifique-se de substituir `SuaAccessKeyID`, `SuaSecretAccessKey`, `SuaRegião`, `SeuHostMySQL`, `SeuUsuárioMySQL`, `SuaSenhaMySQL`, `SeuBancoDeDadosMySQL` e `SuaChaveSecreta` pelos valores correspondentes de suas credenciais, configurações de banco de dados e chave secreta.

2. Construção dos Contêineres:
    - Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

    - Execute o seguinte comando para construir os contêineres:
        ```shell
            npm run dc:build
        ```
    - Após a construção dos contêineres, execute o seguinte comando para iniciar a aplicação:
        ```shell
            npm run dc:up
        ``` 

3. Criação das tabelas:
    - Execute `npm run mg:all` para criar as tabelas no Banco de dados

4. Popular a tabela User:
    - Execute `npm run seed:all` para popular a tabela user

5. Instalação de Dependências:
    - Execute `npm install` para instalar as dependências do projeto.

6. Execução do Servidor:
    - Execute `npm run dev` para iniciar o servidor.

7. Utilização da API:

    - Utilize as rotas fornecidas para criar usuários, fazer upload de documentos e obter URLs de download preassinados.
        ### Rotas User
        | Metodo | Caminho | Descrição | Autenticação |
        | --- | --- | --- | --- |
        | `POST` | /users/register  | Criação de usuário |    🔓  |
        | `POST` | /users/login  | Login no sistema|  🔓 |
        | `PATCH`| /user/update/password/:userId | Atualizar senha |  🔒 |
        | `DELETE`| /user/delete/:userId | Remover usuário |      🔒 |

        #### Criação de usuário
        No body da requisição, adicione o seguinte objeto JSON para criar o usuário:
        ```json
            {
            	"email": "john@example.com",
	            "password": "1234",
	            "confirmPassword": "1234"
            }
        ```

        #### Login no sistema
        No body da requisição, adicione o seguinte objeto JSON para retornar o token de autenticação:
        ```json
            {
            	"email": "john@example.com",
	            "password": "1234",
            }
        ```
        > [!NOTE]
        > Para autenticar na API adicione esse token no header authorization

        #### Atualizar senha 
        No body da requisição, adicione o seguinte objeto JSON para atualizar a senha do usuário:
        ```json
            {
            	"oldPassword": "1234",
	            "newPassword": "abc123",
	            "confirmPassword": "abc123"
            }
        ```

        #### Remover usuário
        No body da requisição, adicione o seguinte objeto JSON para remover o usuário:
        ```json
            {
	            "password": "abc123",
	            "confirmPassword": "abc123"
            }
        ```

        ---
        ### Rotas Documents
        | Metodo | Caminho | Descrição | Autenticação |
        | --- | --- | --- | --- |
        | `POST` | /docs/:userId/  | Upload de arquivo |     🔒 |
        | `GET` | /docs/:userId/all/ | Buscar todos os arquivos |  🔒|
        | `GET`| /docs/:userId/docs/:id | Gerar URL Presigned de um arquivo |  🔒 |
        | `DELETE`| /docs/:userId/docs/:id | Remover arquivo |      🔒 |

        #### Upload de arquivo
        Inclua na requisição o arquivo que deseja realizar o upload e no parâmetro adicione o userId.

        #### Buscar todos os arquivos
        No parametro da requsição, adicione o userId para buscar todos os arquivos.

        #### Gerar URL Presigned de um arquivo
        No parametro da requsição, adicione o userId e o id do documento para gerar URL.
        ```json
            {
	            "payload": {
	        	    "name": "nome do documento",
	        	    "url": "URL Presigned"
                }
	        }
        ```

        #### Remover arquivo
        No parametro da requsição, adicione o userId e o id do documento para remover o documento



## Tecnologias Utilizadas:
- Node.js: Plataforma de execução de código JavaScript do lado do servidor.
- Express.js: Framework web para Node.js utilizado para construir a API.
- MySQL: Sistema de gerenciamento de banco de dados relacional.
- Amazon S3: Serviço de armazenamento em nuvem da Amazon Web Services utilizado para armazenar documentos.
- Docker: Plataforma de código aberto para automação de implantação, execução e dimensionamento de aplicativos em contêineres.
- Docker Compose: Ferramenta para definir e executar aplicativos Docker multicontêineres. Permite a configuração de vários contêineres em um único arquivo de configuração.

## Contribuição:
Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas ou enviar solicitações de recebimento para melhorar este projeto.

