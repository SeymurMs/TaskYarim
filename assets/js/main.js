let addBasket = document.querySelectorAll(".add-basket");

checkBst();
fillHtml();

addBasket.forEach((btn) => {
  btn.addEventListener("click", function () {
    checkBst();
    let basket = JSON.parse(localStorage.getItem("basket"));
    let bstItem = productInfo(this);

    if (basket.find((b) => b.id == bstItem.id) == undefined) {
      basket.push(bstItem);
    } else {
      basket.find((b) => b.id == bstItem.id).count++;
    }

    localStorage.setItem("basket", JSON.stringify(basket));
    fillHtml();
    checkBst();
    fillHtml();
  });
});
function productInfo(elem) {
  return {
    id: elem.parentElement.parentElement.dataset.id,
    img: elem.parentElement.previousElementSibling.src,
    count: 1,
    proName: elem.previousElementSibling.previousElementSibling.innerText,
    price: elem.previousElementSibling.innerText,
  };
}

function fillHtml() {
  checkBst();
  shopCardB.innerHTML = "";
  let basket = JSON.parse(localStorage.getItem("basket"));
  let totalCount = 0;
  basket.forEach((b) => {
    let { id, img, count, proName, price } = b;
    totalCount += count;
    shopCardB.innerHTML += `<tr data-id=${id}>
        <td>
            <img src="${img}" style="width: 100px" alt="">
        </td>
        <td>${proName}</td>
        <td>${price}</td>
        <td>${count}<span onclick="countPls(this)" class="btn btn-success btn-sm"></span></td>
        <td>Total:${price * count}</td>
     <td><span onclick="remove(this)" class="btn btn-danger btn-sm">X</span></td>
    </tr>`;
  });
  itemCount.innerText = totalCount;
}
function checkBst() {
  if (!localStorage.getItem("basket")) {
    localStorage.setItem("basket", JSON.stringify([]));
  }
}
function remove(element) {
  element.parentElement.parentElement.remove();
  rmId = element.parentElement.parentElement.dataset.id;
  let basket = JSON.parse(localStorage.getItem("basket"));  
  basket.forEach(bst=>{
      localStorage.removeItem("basket");
  })  
}
function countPls(el) {
     el.parentElement.innerText++;
     fillHtml();
}