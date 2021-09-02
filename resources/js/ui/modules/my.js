$(document).ready(function() {
  $('.ui.form').form({
    fields: {
      name: 'empty',
      email: 'email',
      phone: 'empty',
      assunto: 'empty',
      mensagem: 'empty'
    }
  });

  $('.form')
  .form({
    fields: {
      name     : ['minLength[5]', 'empty'],
      gender   : 'empty',
      username : 'empty',
      password : ['minLength[6]', 'empty'],
      skills   : ['minCount[2]', 'empty'],
      terms    : 'checked'
    }
  })
;

  function loadForm (id) {
    let data = localStorage.getItem('itens');
    data = JSON.parse(data)[id];
    
    $("input[name=id]").val(data.id)
    $("input[name=name]").val(data.name)
    $("input[name=email]").val(data.email)
    $("input[name=phone]").val(data.phone)
    $("input[name=assunto]").val(data.assunto)
    $("textarea[name=mensagem]").val(data.mensagem)
  }

  function load(data) {
    for (const d of data) {
    console.log(d);
      $("#old-forms").append(`<div class="ui card">\
          <div class="content">\
            <p>\
              Nome: ${d.name}\
            </p>\
            <p>\
              Assunto: ${d.assunto}\
            </p>\
            <button type="button" onclick="javascript:(loadForm(${d.id}))">\
              Editar\
            </button>\
          </div>\
        </div>`);
    }
  }

  var forms = localStorage.getItem('itens');

  if (forms == null) {
    forms = [];
    localStorage.setItem('itens', JSON.stringify(forms)); 
  } else {
    forms = JSON.parse(forms);
    load(forms);
  }

  function getFormData($form){
      var unindexed_array = $form.serializeArray();
      var indexed_array = {};

      $.map(unindexed_array, function(n, i){
          indexed_array[n['name']] = n['value'];
      });

      return indexed_array;
  }

  $( "#form" ).submit(function( event ) {
    const $form = $("#form");
    const data = getFormData($form);
    
    if (data.id == 'new') {
      data.id = forms.length;
      forms.push(data);
    } else {
      forms[data.id] = data
    }
    console.log(forms, JSON.stringify(forms), 11111111);
    localStorage.setItem('itens', JSON.stringify(forms)); 

    event.preventDefault();
    location.reload();
  });
});