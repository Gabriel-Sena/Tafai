document.addEventListener('DOMContentLoaded', function () {
    const tabela = document.getElementById('tabelaProdutos');
    const valorTotalCompra = document.getElementById('valorTotalCompra');
    const retiradaCheckbox = document.getElementById('retirada');

    function atualizarValores() {
        let total = 0;

        tabela.querySelectorAll('tbody tr').forEach(row => {
            const quantidadeInput = row.querySelector('.quantidade');
            const trocaInput = row.querySelector('.troca');
            const valorTotalTd = row.querySelector('.valorTotal');

            const precoUnitario = parseFloat(row.cells[5].innerText.replace('R$', '').replace(',', '.'));
            const caixas = parseInt(quantidadeInput.value) || 0;
            const embalagensPorCaixa = parseInt(row.cells[4].innerText.split('X')[0]) || 0;
            const troca = parseInt(trocaInput.value) || 0;

            const valorTotal = (caixas * embalagensPorCaixa - troca) * precoUnitario;
            valorTotalTd.innerText = `R$ ${valorTotal.toFixed(2)}`;

            total += valorTotal;
        });

        if (retiradaCheckbox.checked) {
            total *= 0.81; // Desconto de 19%
        }

        valorTotalCompra.innerText = `Valor Total da Compra: R$ ${total.toFixed(2)}`;
    }

    tabela.addEventListener('input', atualizarValores);
    retiradaCheckbox.addEventListener('change', atualizarValores);

    document.getElementById('pedidoForm').addEventListener('submit', function (event) {
        event.preventDefault();
        
        const formData = new FormData(this);
        const produtos = [];

        tabela.querySelectorAll('tbody tr').forEach(row => {
            const codigo = row.cells[0].innerText;
            const produto = row.cells[2].innerText;
            const caixas = row.querySelector('.quantidade').value;
            const troca = row.querySelector('.troca').value;

            produtos.push({ codigo, produto, caixas, troca });
        });

        formData.append('produtos', JSON.stringify(produtos));

        // Envio do pedido
        alert('Pedido enviado com sucesso!');
    });
});
