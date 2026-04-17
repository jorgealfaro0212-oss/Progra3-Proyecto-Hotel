/* --- logica de calculo PRECIO DE LAS RESERVAS --- */

document.addEventListener("DOMContentLoaded", function () {
    const checkinInput = document.getElementById("checkin");
    const checkoutInput = document.getElementById("checkout");
    const roomTypeSelect = document.getElementById("roomType");
    const totalPriceDisplay = document.getElementById("totalPrice");
    const reservationForm = document.getElementById("reservation-form");

    // (formato moneda)
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0
    });

    // fechas minimas (hoy y mañana)
    function iniciarFechas() {
        const hoy = new Date().toISOString().split("T")[0];
        checkinInput.min = hoy;
        
        // El checkout minimo es mañana
        let mañana = new Date();
        mañana.setDate(mañana.getDate() + 1);
        checkoutInput.min = mañana.toISOString().split("T")[0];
    }

    function calcularTotal() {
        const entrada = new Date(checkinInput.value);
        const salida = new Date(checkoutInput.value);
        const precioNoche = parseFloat(roomTypeSelect.value);

        // Si falta algun dato, no calculamos nada
        if (isNaN(entrada) || isNaN(salida) || isNaN(precioNoche)) {
            totalPriceDisplay.textContent = "0";
            return;
        }

        // Calcular noches
        const tiempo = salida - entrada;
        const noches = Math.ceil(tiempo / (1000 * 60 * 60 * 24));

        if (noches <= 0) {
            totalPriceDisplay.textContent = "0";
            return;
        }

        const total = noches * precioNoche;
        totalPriceDisplay.textContent = total.toLocaleString(); 
    }

    // Eventos para actualizar el precio cuando el usuario cambia algo
    checkinInput.addEventListener("change", function() {
        // Si cambia el checkin, ajustamos el minimo del checkout
        checkoutInput.min = checkinInput.value;
        calcularTotal();
    });
    
    checkoutInput.addEventListener("change", calcularTotal);
    roomTypeSelect.addEventListener("change", calcularTotal);

    // Al enviar el formulario
    reservationForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        const total = totalPriceDisplay.textContent;

        if (total === "0") {
            alert("Por favor, selecciona fechas válidas.");
            return;
        }

        const habitacion = roomTypeSelect.options[roomTypeSelect.selectedIndex].text;
        
        alert("¡Gracias por tu reserva!\nHabitación: " + habitacion + "\nTotal: $" + total);
        
        // Limpiamos todo
        reservationForm.reset();
        iniciarFechas();
        totalPriceDisplay.textContent = "0";
    });

    iniciarFechas();
});