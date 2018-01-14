$( document ).ready(function() {
    setMenu();   
    if (sessionStorage.getItem("type") == 'user') {
       $('#reportTab2').attr('style','display:none');
       $('#reportTab4').attr('style','display:none');
    } 
});