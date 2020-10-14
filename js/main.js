
var productNameInp = document.getElementById("productName");
var productPriceInp = document.getElementById("productPrice");
var productCatInp = document.getElementById("productCategory");
var productDecInp = document.getElementById("productDescription");
// the add and update button
var btn = document.getElementById("add");
// the index we use to update
var currentIndex = 0;

var regex = /^[0-9]{1,}$/;

var productList ;

// checking if there is any data saved before to display it or not

if ( localStorage.getItem("productList") == null) {

    productList = [];

}else{

    productList = JSON.parse(localStorage.getItem("productList"));

    displayProduct();

}

productPriceInp.addEventListener("keyup" , function(){

    if(regex.test(productPriceInp.value)){

        productPriceInp.classList.remove("is-invalid")
        productPriceInp.classList.add("is-valid");

    }else{

        productPriceInp.classList.add("is-invalid");

    }

})

btn.addEventListener("click" , function (){

    if ( btn.innerHTML == "add"){

        addProduct();

    }else{

        updateProduct();

    }

})



function addProduct() {

    var product = {

        name: productNameInp.value,
        price: productPriceInp.value,
        category: productCatInp.value,
        description: productDecInp.value

    }

    productList.push(product);

    displayProduct();

    localStorage.setItem("productList" , JSON.stringify(productList));


}

function displayProduct() {

    var productTable = "" ;


    // each lap represents a new row and a new product
    for(var i = 0; i < productList.length; i++){

        productTable += ` <tr> <td> ` + productList[i].name +
                        `</td> <td> ` + productList[i].price + 
                        `</td> <td> ` + productList[i].category + 
                        `</td> <td> ` + productList[i].description +
                        `</td> <td> <button onclick="update(`+ i +`)"  class="btn btn-warning">update</button> </td>
                        <td> <button onclick="deleteProduct(`+ i +`)" class="btn btn-danger">delete</button> </td>
                        </tr> `;

    }

    document.getElementById("tableBody").innerHTML = productTable;

}


function productSearch(userInput) {

    var productSearchpara = "";
    var txt = "";

    // if the user search is empty clear the results
    if(userInput == ""){

        productSearchpara = "";

    }else{
    
        for (var i = 0; i < productList.length; i++){


            if(productList[i].name.includes(userInput.trim())){
    
                txt = productList[i].name.replace(userInput , `<span style="color:red">` +userInput +`</span>` );
    
                productSearchpara += `<p> ` + txt + ` </p>`;

                
    
            }
    
        }

    }

    

    document.getElementById("searchResults").innerHTML = productSearchpara;

}



function deleteProduct(index) {

    productList.splice(index , 1);

    localStorage.setItem("productList" , JSON.stringify(productList));

    displayProduct();

}

function update(index){

    productNameInp.value = productList[index].name; 
    productPriceInp.value = productList[index].price;
    productCatInp.value = productList[index].category;
    productDecInp.value = productList[index].description;

    btn.innerHTML = "update";

    currentIndex = index;

}


function updateProduct(){

    var product = {

        name: productNameInp.value,
        price: productPriceInp.value,
        category: productCatInp.value,
        description: productDecInp.value

    }

    productList[currentIndex] = product;

    displayProduct();

    localStorage.setItem("productList" , JSON.stringify(productList));

}


