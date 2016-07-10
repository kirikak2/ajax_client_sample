$(document).ready(function(){
  $.ajax({
    type: 'GET',
    url: 'http://54.199.159.194:3000/addresses.json',
    dataType: 'json',
    success: function(response){
      var data = $("#data");
      $.each(response["results"], function(index){
        var row = $("<tr></tr>");
        row.append($("<td>" + this.id + "</td>")).
          append($("<td>" + this.name + "</td>")).
          append($("<td>" + this.name_kana + "</td>")).
          append($("<td>" + this.gender + "</td>")).
          append($("<td>" + this.phone + "</td>")).
          append($("<td>" + this.mail + "</td>")).
          append($("<td>" + this.zipcode + "</td>")).
          append($("<td>" + this.address1 + "</td>")).
          append($("<td>" + this.address2 + "</td>")).
          append($("<td>" + this.address3 + "</td>")).
          append($("<td>" + this.address4 + "</td>")).
          append($("<td>" + this.address5 + "</td>")).
          append($("<td>" + this.age + "</td>"));
        data.append(row);
      });
    }
  });
});
