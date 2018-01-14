function goToLoginMenu(id) {
    if (id == 1) {
        sessionStorage.setItem("code_fitness",$('#code_fitness').val());
        window.location.href = "bookingRealTime.html";       
    } else {
        sessionStorage.setItem("code_fitness",$('#code_fitness').val());
        window.location.href = "checkInFitness.html";
    }
}

function goToPage() {
    sessionStorage.clear();
    window.location.href = "page.html";
}