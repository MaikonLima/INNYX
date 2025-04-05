import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
    .setTitle('Gerencimento de Estoque - Stock')
    .setDescription('Documentação da API do Gerencimento de Estoque - Stock')
    .setVersion('1.0')
    .build();

export { swaggerConfig };