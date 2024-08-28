<h1>Shopper Challenge Backend</h1>
    <p>Este é o backend do projeto Shopper Challenge, responsável por gerenciar a leitura individualizada de consumo de água e gás, utilizando IA para processar as imagens dos medidores.</p>
    
   <h2>Estrutura de Pastas</h2>
    <pre>
    shopper-challenge-backend/
    ├── node_modules/
    ├── src/
    │   ├── controllers/
    │   ├── db/
    │   ├── docs/
    │   ├── middlewares/
    │   ├── models/
    │   ├── routes/
    │   ├── services/
    │   ├── utils/
    │   ├── uploads/
    │   ├── index.ts
    │   └── swagger.ts
    ├── .env
    ├── .gitignore
    ├── docker-compose.yml
    ├── Dockerfile
    ├── package-lock.json
    ├── package.json
    └── tsconfig.json
    </pre>

   <h2>Setup</h2>
    <p>Para rodar o projeto localmente, siga os passos abaixo:</p>
    <ol>
        <li>Clone o repositório.</li>
        <li>Instale as dependências com <code>npm install</code>.</li>
        <li>Crie um arquivo <code>.env</code> com as variáveis de ambiente necessárias (ex: <code>MONGO_URI</code>, <code>GEMINI_API_KEY</code>).</li>
        <li>Rode o MongoDB localmente ou configure a conexão com MongoDB Atlas.</li>
        <li>Suba os containers usando <code>docker-compose up</code>.</li>
    </ol>

   <h2>Documentação da API</h2>
    <p>A documentação completa da API está disponível no Swagger. Para acessá-la, rode o servidor e navegue até <code>/api-docs</code>.</p>

   <h3>Endpoints Principais</h3>
    <ul>
        <li><code>POST /upload</code>: Recebe uma imagem em base64, processa com a API do Google Gemini, e retorna a medida de consumo.</li>
        <li><code>PATCH /confirm</code>: Confirma ou corrige o valor lido pelo LLM. <strong>Nota:</strong> A documentação original do desafio apresenta uma inconsistência, onde o status code 404 possui a descrição "Leitura do mês já registrada", o que parece ser um erro.</li>
        <li><code>GET /&lt;customer_code&gt;/list</code>: Lista as medidas realizadas por um determinado cliente, com paginação e filtro opcional por tipo de medida.</li>
    </ul>

   <h2>Estrutura de Dados</h2>
    <p>A model <code>Measurement</code> contém os seguintes campos:</p>
    <ul>
        <li><code>customer_code</code>: Código do cliente</li>
        <li><code>measure_datetime</code>: Data e hora da medida</li>
        <li><code>measure_type</code>: Tipo de medida (WATER ou GAS)</li>
        <li><code>measure_uuid</code>: UUID da medida</li>
        <li><code>measure_value</code>: Valor da medida</li>
        <li><code>image_url</code>: URL da imagem</li>
        <li><code>confirmed</code>: Indica se o valor foi confirmado</li>
    </ul>

<h2>Imagem modelo de envio para IA</h2>
<p>Conta de luz:</p>

![Conta de luz exemplo](https://github.com/user-attachments/assets/198f5906-b98a-4038-91de-022cea0bbe4f)

<p>Conta de gás:</p>

![Conta de gás exemplo](https://github.com/user-attachments/assets/4ac9c613-0e4a-468f-b038-73adf0696f4d)
