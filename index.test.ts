import { filtrarPorNome, filtrarPorCategoria, filtraProdutosPeloNomeCategoria } from "./index";
import { produtos } from "./mocks/produtos";
import { ProdutoProps } from "./models/produto";

describe("Filtros", () => {

    describe("Filtro por nome", () => {

        it("Deve retornar uma lista de um produto passando nome", () => {
            const produtos: ProdutoProps[] = [
                {
                    id: "1",
                    nome: "coca-cola",
                    categoria: "bebidas"
                },
                {
                    id: "7",
                    nome: "água mineral",
                    categoria: "bebidas"
                },
            ];

            const resultado: ProdutoProps[] = filtrarPorNome("água", produtos);
            const resultadoEmJson: string = JSON.stringify(resultado[0]);
            const resultadoEsperado: string = JSON.stringify({
                id: "7",
                nome: "água mineral",
                categoria: "bebidas"
            });

            expect(resultado).toHaveLength(1);
            expect(resultadoEmJson).toBe(resultadoEsperado);
        });

        it("Deve retornar uma lista vazia quando o nome não tiver incluso em nenhum nome de produto", () => {
            const produtos: ProdutoProps[] = [
                {
                    id: "1",
                    nome: "coca-cola",
                    categoria: "bebidas"
                },
                {
                    id: "7",
                    nome: "água mineral",
                    categoria: "bebidas"
                },
            ];

            const resultado: ProdutoProps[] = filtrarPorNome("bebida", produtos);
            expect(resultado).toHaveLength(0);
        });

        it("Deve retornar lista passando nome do produto", () => {
            const produtos: ProdutoProps[] = [
                {
                    id: "4",
                    nome: "suco de Laranja",
                    categoria: "bebidas"
                },
                {
                    id: "5",
                    nome: "suco de limão",
                    categoria: "bebidas"
                }
            ];

            const resultado: ProdutoProps[] = filtrarPorNome("suco", produtos);
            const resultadoEsperado: string = JSON.stringify(
                [
                    {
                        id: "4",
                        nome: "suco de Laranja",
                        categoria: "bebidas"
                    },
                    {
                        id: "5",
                        nome: "suco de limão",
                        categoria: "bebidas"
                    }
                ]
            );

            expect(resultado).toHaveLength(2);
            expect(JSON.stringify(produtos)).toBe(resultadoEsperado);
        });

        it("Deve retornar produtos passando nome em caixa baixa", () => {
            const produtos: ProdutoProps[] = [
                {
                    id: "4",
                    nome: "SUCO DE LARANJA",
                    categoria: "BEBIDAS"
                }
            ];

            const resultado: ProdutoProps[] = filtrarPorNome("suco", produtos);
            const resultadoEsperado: string = JSON.stringify(
                [
                    {
                        id: "4",
                        nome: "SUCO DE LARANJA",
                        categoria: "BEBIDAS"
                    }
                ]
            );

            expect(resultado).toHaveLength(1);
            expect(JSON.stringify(produtos)).toBe(resultadoEsperado);
        });

        it("Deve retornar produtos passando nome em caixa alta", () => {
            const produtos: ProdutoProps[] = [
                {
                    id: "4",
                    nome: "suco de laranja",
                    categoria: "bebidas"
                }
            ];

            const resultado: ProdutoProps[] = filtrarPorNome("SUCO", produtos);
            const resultadoEsperado: string = JSON.stringify(
                [
                    {
                        id: "4",
                        nome: "suco de laranja",
                        categoria: "bebidas"
                    }
                ]
            );

            expect(resultado).toHaveLength(1);
            expect(JSON.stringify(produtos)).toBe(resultadoEsperado);
            
        });

        it("Deve retornar lista completa quando passar nome somente com espaços", () => {
            const produtos: ProdutoProps[] = [
                {
                    id: "4",
                    nome: "suco de Laranja",
                    categoria: "bebidas"
                },
                {
                    id: "5",
                    nome: "suco de limão",
                    categoria: "bebidas"
                }
            ];

            const resultado: ProdutoProps[] = filtrarPorNome("   ", produtos);
            const resultadoEsperado = JSON.stringify([
                {
                    id: "4",
                    nome: "suco de Laranja",
                    categoria: "bebidas"
                },
                {
                    id: "5",
                    nome: "suco de limão",
                    categoria: "bebidas"
                }
            ]);

            expect(resultado).toHaveLength(2);
            expect(JSON.stringify(produtos)).toBe(resultadoEsperado);
        });

        it("Deve retornar lista completa quando passar nome vazio", () => {
            const produtos: ProdutoProps[] = [
                {
                    id: "4",
                    nome: "suco de Laranja",
                    categoria: "bebidas"
                },
                {
                    id: "5",
                    nome: "suco de limão",
                    categoria: "bebidas"
                }
            ];

            const resultado: ProdutoProps[] = filtrarPorNome("", produtos);
            const resultadoEsperado = JSON.stringify([
                {
                    id: "4",
                    nome: "suco de Laranja",
                    categoria: "bebidas"
                },
                {
                    id: "5",
                    nome: "suco de limão",
                    categoria: "bebidas"
                }
            ]);

            expect(resultado).toHaveLength(2);
            expect(JSON.stringify(produtos)).toBe(resultadoEsperado);
        });
    });

    describe("Filtro por categoria", () => {

        it("Deve retornar uma lista completa quando categoria for todas", () => {
            const resultado = filtrarPorCategoria("todas", produtos);
            expect(resultado).toHaveLength(20);
        });

        it("Deve retornar uma lista completa quando categoria for todas em caixa alta", () => {
            const resultado = filtrarPorCategoria("TODAS", produtos);
            expect(resultado).toHaveLength(20);
        });

        it("Deve retornar uma lista completa quando categoria for em branco", () => {
            const resultado = filtrarPorCategoria("", produtos);
            expect(resultado).toHaveLength(20);
        });

        it("Deve retornar uma lista completa quando categoria tiver somente espaços", () => {
            const resultado = filtrarPorCategoria(" ", produtos);
            expect(resultado).toHaveLength(20);
        });

        it("Deve retornar somente os produtos da categoria especificada", () => {
            const resultado = filtrarPorCategoria("bebidas", produtos);
            expect(resultado).toHaveLength(6);
        });

        it("Deve retornar somente os produtos da categoria especificada em caixa baixa", () => {
            const resultado = filtrarPorCategoria("BEBIDAS", produtos);
            expect(resultado).toHaveLength(6);
        });

        it("Deve retornar somente os produtos da categoria especificada em caixa alta", () => {
            const resultado = filtrarPorCategoria("bebidas", produtos);
            expect(resultado).toHaveLength(6);
        });

        it("Deve retornar lista vazia quando não encontrar nenhum produto na categoria especificada", () => {
            const resultado = filtrarPorCategoria("teste", produtos);
            expect(resultado).toHaveLength(0);
        });
    });

    describe("Filtro por nome e categoria", () => {

        it("Deve retornar lista completa quando nome for vazio e categoria for todas", () => {
            const nome = "", categoria = "todas";
            const resultado: ProdutoProps[] = filtraProdutosPeloNomeCategoria(nome, categoria, produtos);
            expect(resultado).toHaveLength(20);
        });

        it("Deve retornar lista completa de bebidas quando nome for vazio e categoria for bebidas", () => {
            const nome = "", categoria = "bebidas";
            const resultado: ProdutoProps[] = filtraProdutosPeloNomeCategoria(nome, categoria, produtos);
            expect(resultado).toHaveLength(6);
        });

        it("Deve retornar uma lista de sucos com a categoria bebidas selecionada e quando nome for suco", () => {
            const nome = "suco", categoria = "bebidas";
            const resultado: ProdutoProps[] = filtraProdutosPeloNomeCategoria(nome, categoria, produtos);
            expect(resultado).toHaveLength(2);
        });

        it("Deve retornar uma lista vazia com a categoria bebidas selecionada e quando nome for tomate", () => {
            const nome = "tomate", categoria = "bebidas";
            const resultado: ProdutoProps[] = filtraProdutosPeloNomeCategoria(nome, categoria, produtos);
            expect(resultado).toHaveLength(0);
        });

        it("Deve retornar uma lista vazia quando nome e categoria for vazio", () => {
            const nome = "", categoria = "";
            const resultado: ProdutoProps[] = filtraProdutosPeloNomeCategoria(nome, categoria, produtos);
            expect(resultado).toHaveLength(0);
        });

        it(`Com a categoria bebidas selecionada e com nome tomate, quando alterar a categoria para verduras, 
        deve mostrar apenas tomate`, () => {
            const nome: string = "tomate"; 
            let categoria: string = "bebidas";
            const produtosResultado: ProdutoProps[] = filtraProdutosPeloNomeCategoria(nome, categoria, produtos);
            expect(produtosResultado).toHaveLength(0);

            categoria = "verduras";
            const resultado: ProdutoProps[] = filtraProdutosPeloNomeCategoria(nome, categoria, produtosResultado);
            expect(resultado).toHaveLength(1);
        });
    });
});