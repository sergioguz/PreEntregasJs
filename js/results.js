document.addEventListener('DOMContentLoaded', function () {
    const resultados = JSON.parse(sessionStorage.getItem('resultadosComparacion'));
    const accordion = document.getElementById('accordionExample');

    resultados.forEach((supermercado, index) => {
        let productDetails = supermercado.products.map(prod => `<li>${prod.name} - ${prod.unit} - $${prod.price.toFixed(2)}</li>`).join('');

        accordion.innerHTML += `
        <div class="accordion-item">
            <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                    ${supermercado.name}  (${supermercado.countProducts})  - Total: $${supermercado.total.toFixed(2)}
                </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" >
                <div class="accordion-body">
                    <ol>${productDetails}</ol>
                </div>
            </div>
        </div>
        `;
    });
});
