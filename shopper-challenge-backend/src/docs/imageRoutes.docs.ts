/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload de imagem para obter leitura de consumo de água ou gás
 *     description: Esta rota recebe uma imagem codificada em base64 e retorna o valor lido, o UUID da medição e um link temporário para a imagem.
 *     tags:
 *       - Measurements
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *               - customer_code
 *               - measure_datetime
 *               - measure_type
 *             properties:
 *               image:
 *                 type: string
 *                 description: Imagem codificada em base64.
 *               customer_code:
 *                 type: string
 *                 description: Código do cliente.
 *               measure_datetime:
 *                 type: string
 *                 format: date-time
 *                 description: Data e hora da medição.
 *               measure_type:
 *                 type: string
 *                 enum: [WATER, GAS]
 *                 description: Tipo de medição (água ou gás).
 *     responses:
 *       200:
 *         description: Medição realizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 measure_value:
 *                   type: number
 *                   description: Valor lido da medição.
 *                 measure_uuid:
 *                   type: string
 *                   description: UUID da medição.
 *                 image_url:
 *                   type: string
 *                   description: Link temporário para a imagem.
 *       409:
 *         description: Já existe uma leitura para este tipo no mês atual.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_code:
 *                   type: string
 *                   description: Código de erro.
 *                 error_description:
 *                   type: string
 *                   description: Descrição do erro.
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_code:
 *                   type: string
 *                   description: Código de erro.
 *                 error_description:
 *                   type: string
 *                   description: Descrição do erro.
 * /confirm:
 *   patch:
 *     summary: Confirma ou corrige o valor lido para uma medição específica
 *     description: Este endpoint confirma ou corrige o valor lido para uma medição previamente realizada. Se o valor confirmado for igual ao valor existente, a medição é marcada como confirmada; caso contrário, o valor é atualizado e a confirmação é mantida como falsa.
 *     tags:
 *       - Measurements
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - measure_uuid
 *               - confirmed_value
 *             properties:
 *               measure_uuid:
 *                 type: string
 *                 description: UUID da medição.
 *               confirmed_value:
 *                 type: number
 *                 description: Valor confirmado da medição.
 *     responses:
 *       200:
 *         description: Operação realizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Confirmação de sucesso.
 *       400:
 *         description: Dados fornecidos no corpo da requisição são inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_code:
 *                   type: string
 *                   description: Código de erro.
 *                 error_description:
 *                   type: string
 *                   description: Descrição do erro.
 *       404:
 *         description: Leitura não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_code:
 *                   type: string
 *                   description: Código de erro.
 *                 error_description:
 *                   type: string
 *                   description: Descrição do erro.
 *       409:
 *         description: Leitura já confirmada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_code:
 *                   type: string
 *                   description: Código de erro.
 *                 error_description:
 *                   type: string
 *                   description: Descrição do erro.
 * /{customer_code}/list:
 *   get:
 *     summary: Lista as medidas realizadas por um determinado cliente
 *     description: Este endpoint lista as leituras de consumo realizadas por um cliente, com suporte a paginação. Ele também pode filtrar os resultados por tipo de medição (WATER ou GAS).
 *     tags:
 *       - Measurements
 *     parameters:
 *       - in: path
 *         name: customer_code
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do cliente para filtrar as medidas.
 *       - in: query
 *         name: measure_type
 *         schema:
 *           type: string
 *           enum: [WATER, GAS]
 *         description: Filtra as medidas por tipo (WATER ou GAS). A validação é case insensitive.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página para paginação.
 *     responses:
 *       200:
 *         description: Operação realizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customer_code:
 *                   type: string
 *                   description: Código do cliente.
 *                 total:
 *                   type: integer
 *                   description: Número total de medidas.
 *                 current_page:
 *                   type: integer
 *                   description: Página atual.
 *                 measures:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       measure_uuid:
 *                         type: string
 *                         description: UUID da medição.
 *                       measure_datetime:
 *                         type: string
 *                         format: date-time
 *                         description: Data e hora da medição.
 *                       measure_type:
 *                         type: string
 *                         description: Tipo de medição (WATER ou GAS).
 *                       has_confirmed:
 *                         type: boolean
 *                         description: Indica se a medição foi confirmada.
 *                       image_url:
 *                         type: string
 *                         description: URL da imagem associada à medição.
 *       400:
 *         description: Tipo de medição inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_code:
 *                   type: string
 *                   description: Código de erro.
 *                 error_description:
 *                   type: string
 *                   description: Descrição do erro.
 *       404:
 *         description: Nenhum registro encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_code:
 *                   type: string
 *                   description: Código de erro.
 *                 error_description:
 *                   type: string
 *                   description: Descrição do erro.
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_code:
 *                   type: string
 *                   description: Código de erro.
 *                 error_description:
 *                   type: string
 *                   description: Descrição do erro.
 */
