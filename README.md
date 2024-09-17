# Controle de Presença Cursinho Popular da Poli USP

Este repositório contém o ambiente de desenvolvimento frontend da plataforma de controle de presença que está sendo desenvolvida em parceria com o Cursinho Popular da Poli USP. O projeto contém 2 instâncias, uma de uso interno do cursinho e outra para os alunos, sendo este repositório usado para hospedagem do front da instância usada pelo cursinho. Este projeto é, também, o Trabalho de Conclusão de Curso (TCC) de seus contribuidores para o curso de Engenharia de Computação da Escola Politécnica da USP no ano de 2024.

## Contribuidores

- Lucas Pavan Garieri
- Pedro Henrique Rodrigues de Viveiros
- Victor de Almeida Santana

## Execução do Ambiente de Desenvolvimento Local

A aplicação está sendo desenvolvida usando Vite + React. Para rodá-la localmente, clone este repositório e, na raiz da pasta `cp-presenca-cursinho-frontend`, execute os seguintes comandos:

```
$ npm install
$ npm run dev
```

## Versionamento e GitFlow

Existem 3 branches principais no projeto e este está separado em diferentes versões e releases da seguinte maneira:[

- `main` - branch que reflete o estado da aplicação em produção;
- `release` - branch usada para últimos testes e ajustes antes de um lançamento;
- `develop` - branch que centraliza o ambiente de desenvolvimento.

Dessa forma, existe alguns eventos e fluxos que devem ser seguidos:

1. Crie as branches de features, correções e desenvolvimentos a partir da `develop`;
2. Ao final de uma sprint, todas as branches de desenvolvimento devem ser centralizadas na `develop` e mergeadas para a `release`;
3. O processo de testagem final e QA é feito a partir da versão mais recente da `release`;
4. Estando 100% seguro do lançamento, a `release` pode ser mergeada à main e uma nova versão da aplicação é gerada;
5. Por fim, antes da próxima sprint, a branch `develop` é atualizada com o estado atual da `main`;
6. Inicia-se mais uma sprint e repete-se o processo.

Caso deseje se aprofundar um pouco mais em algumas práticas que envolvem o uso de git e gitflow, aqui está um [vídeo de referência](https://www.youtube.com/watch?v=Uszj_k0DGsg&ab_channel=freeCodeCamp.org).
