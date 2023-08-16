class CaixaDaLanchonete {

    static menu = {
            cafe: { descricao: 'Café', valor: 3.00 },
            chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
            suco: { descricao: 'Suco Natural', valor: 6.20 },
            sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
            queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            salgado: { descricao: 'Salgado', valor: 7.25 },
            combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
        }

    calcularValorDaCompra(metodoDePagamento, itens) {
        let valorTotal = 0;

        if(metodoDePagamento !== 'dinheiro' && metodoDePagamento !== 'debito' && metodoDePagamento !== 'credito') {
            return "Forma de pagamento inválida!";
        }

        if(itens.length < 1) {
            return "Não há itens no carrinho de compra!"
        }

        for(let item of itens){
            const [codigo, quantidade] = item.split(','); 

            if (codigo === 'chantily' && !(itens.some(i => i.includes('cafe')))) {
                return "Item extra não pode ser pedido sem o principal";
            }

            if (codigo === 'queijo' && !(itens.some(i => i.includes('sanduiche')))) {
                return "Item extra não pode ser pedido sem o principal";
            }

            if(!(CaixaDaLanchonete.menu[codigo])){
                return "Item inválido!"
            }

            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }
    
            valorTotal += CaixaDaLanchonete.menu[codigo].valor * quantidade;
        }

        if(metodoDePagamento === 'dinheiro'){
            valorTotal -= (valorTotal*0.05)
        }
        if(metodoDePagamento === 'credito') {
            valorTotal += (valorTotal*0.03)
        }
        
        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };

