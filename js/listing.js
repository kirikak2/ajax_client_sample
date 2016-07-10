$(document).ready(function(){
  var search = function(params){
    $.ajax({
      type: 'GET',
      url: 'http://54.199.159.194:3000/addresses.json',
      data: params,
      dataType: 'json',
      success: function(response){
        renderPaginate(response["total"], response["per"], response["page"])
        var data = $("#data");
        data.empty();
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
  }

  var getParams = function(params){
    if(params == undefined){
      params = {};
    }
    $.each($(".search"), function(index){
      if(this.value != ""){
        params[this.name] = this.value;
      }
    });
    return params;
  }

  var renderPaginate = function(total, per, page){
    var offset = 3;
    var pagination = $("nav ul.pagination");
    var totalPage = total / per + (total % per == 0 ? 0 : 1);

    var startPage, endPage;
    if(page + offset < totalPage && page - offset > 0) {
      startPage = page - offset;
      endPage = page + offset;
    } else if(page - offset < 1){
      startPage = 1;
      endPage = (startPage + offset * 2) < totalPage ? startPage + offset * 2 : totalPage;
    } else {
      startPage = totalPage - offset * 2;
      endPage = totalPage;
    }

    pagination.empty();
    for(var i = startPage; i <= endPage; i++){
      if(i == page){
        pagination.append($('<li class="active move-page"><a href="#">' + i + '</a></li>'));
      } else {
        pagination.append($('<li class="move-page"><a href="#">' + i + '</a></li>'));
      }

    }
    if(page == 1) {
      pagination.prepend($('<li class="move-prev disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>'));
    } else {
      pagination.prepend($('<li class="move-prev"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>'));
    }

    if(page == totalPage) {
      pagination.append($('<li class="move-next disabled"><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>'));
    } else {
      pagination.append($('<li class="move-next"><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>'));
    }

    // pagination event
    pagination.find("li.move-page a").on("click", function(e){
      search(getParams({ page: $(this).text() }));
    });

    pagination.find("li.move-next a").on("click", function(e){
      if(page < totalPage){
        search(getParams({ page: page + 1 }));
      }
    });

    pagination.find("li.move-prev a").on("click", function(e){
      if(page > 1){
        search(getParams({ page: page - 1 }));
      }
    })
  }

  search(getParams());

  // search event
  $(".search").on("keyup", function(e){
    search(getParams());
  });

  $(".search#per-page").on("change", function(e){
    search(getParams());
  });
});
