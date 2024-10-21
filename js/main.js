// AJAX Implementation


// JQuery
$('#dodajForm').submit(function(event){
    event.preventDefault();

    //1.Pokupi podatke sa forme
    // skracena verzija [this = #dodajForm]
    const form = $(this) // $('#dodajForm')
    // console.log(form)
    const serialized = form.serializeArray();
    // console.log(serialized);
    // Menjamo format serialized u objekat jer mu dole pristupamo kao objektu
    const formData = serialized.reduce(
        (json, {name,value}) => ((json[name] = value), json), {}
    );
    console.log(formData);

    //2.Posalji zahtev ka serveru
    $.ajax({
        url: 'obrada.php',
        method: 'post',
        data: serialized,
    }).done(function(response){
        if(response === 'Uspesno ste kreirali novu prijavu'){
            console.log('Prijava je dodata!');
            appendRow(formData);
        } else {
            console.log('Prijava nije dodata.')
        }
    }).fail(function(err){
        console.error(err);
    })

})

// Dodavanje reda u tabelu

function appendRow(data){
    $('#myTable tbody').append(
        `
        <tr>
            <td>${data.predmet}</td>
            <td>${data.katedra}</td>
            <td>${data.sala}</td>
            <td>${data.datum}</td>
            <td>
                <label class="custom-radio-btn">
                    <input type="radio" name="id_predmeta" value="">
                    <span class="checkmark"></span>
                </label>
            </td>
        </tr>
        `
    )
}

