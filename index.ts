import { ProdutoProps } from "./models/produto";

export function filtrarPorNome(nome: string, produtos: ProdutoProps[]): ProdutoProps[] {

    if(nome.trim() === "") {
        return produtos;
    }

    return produtos.filter(produto => produto.nome.toLowerCase().includes(nome.toLowerCase()));
}

export function filtrarPorCategoria(categoria: string, produtos: ProdutoProps[]): ProdutoProps[] {

    if(categoria.trim() === "") {
        return produtos;
    }

    if(categoria.trim().toLowerCase() === "todas") {
        return produtos;
    }

    return produtos.filter(produto => produto.categoria.toLowerCase().includes(categoria.toLowerCase()));
}

export function filtraProdutosPeloNomeCategoria(nome: string, categoria: string, produtos: ProdutoProps[]): ProdutoProps[] {
    
    if(categoria.trim() === "") {
        return [];
    }

    const produtosFiltradosPelaCategoria: ProdutoProps[] = filtrarPorCategoria(categoria, produtos);
    const produtosFiltrados: ProdutoProps[] = filtrarPorNome(nome, produtosFiltradosPelaCategoria);
    return produtosFiltrados;
}