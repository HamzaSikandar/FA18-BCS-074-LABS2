$(function () {
  loadproducts();
  $("#products").on("click", ".btn-danger", handledelete);
  $("#products").on("click", ".btn-warning", handleUpdate);
  $("#addBtn").click(addproduct);
});
//Updating products
function handleUpdate() {
  let btn = $(this);
  var parentDiv = btn.closest(".product");
  let ID = parentDiv.attr("data-id");
  $.get(
    "https://usman-recipes.herokuapp.com/api/products/" + ID,
    function (response) {
      $("#editProductModal").val(response._id);
      $("#editProductTitle").val(response.name);
      $("#editProductPrice").val(response.price);
      $("#editProductColor").val(response.color);
      $("#editProductDepartment").val(response.department);
      $("#editProductDescription").val(response.description);
      $("#editProductModal").modal("show");
    }
  );
}
//Adding products
function addproduct() {
  var name = $("#name").val();
  var price = $("#price").val();
  var color = $("#color").val();
  var department = $("#department").val();
  var description = $("#description").val();
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products/",
    method: "POST",
    data: { name, price, color, department, description },
    success: function (response) {
      console.log(response);
      loadproducts();
    },
  });
}
//Deleting products
function handledelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".product");
  let ID = parentDiv.attr("data-id");
  console.log(ID);
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products/" + ID,
    method: "DELETE",
    success: function () {
      loadproducts();
    },
  });
}
//getting all products
function loadproducts() {
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products/",
    method: "GET",
    success: function (response) {
      console.log(response);
      var products = $("#products");
      products.empty();
      for (var i = 0; i < response.length; i++) {
        var pro = response[i];
        products.append(
          `<div class="product" data-id="${pro._id}"><h3>${pro.name}</h3><p><button class="btn btn-danger btn-sm float-right">Delete</button> <button class="btn btn-warning btn-sm float-right">Update</button>Price:${pro.price}</br>Color:${pro.color}</br>Department:${pro.department}</br>Description:${pro.description}</p> </div>`
        );
      }
    },
  });
}
