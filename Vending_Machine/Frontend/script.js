document.addEventListener("DOMContentLoaded", function () {
  const ProductShowcase = document.getElementById("product-showcase");
  const inputtedMoney = document.getElementById("money-input");
  const submitMoneyBtn = document.getElementById("submit-money");
  const cancelBtn = document.getElementById("cancel");
  const numpadDisplay = document.getElementById("numpad-display");

  const submitSelection = document.getElementById("submit");
  const displayDispatchPro = document.getElementById("product-display");
  const changeDisplay = document.getElementById("change-display");
  const changeAmount = document.getElementById("change-amount");

  let enteredCode = "";

  initializeMachine();

  // Function to add event listeners to numpad buttons
  function addNumpadListeners(buttons, value) {
    Array.from(buttons).forEach((button) => {
      button.addEventListener("click", () => {
        enteredCode += value;
        numpadDisplay.innerText = enteredCode;
      });
    });
  }

  // Submit selected code
  submitSelection?.addEventListener("click", async () => {
    numpadDisplay.innerText = "";
    if (enteredCode.length === 0) {
      alert("Enter Product Code!");
      return;
    }

    try {
      let response = await selectProduct(+enteredCode);
      let dispatchedProductAndRemValue = response?.data;

      if (dispatchedProductAndRemValue.message) {
        // Error message
        alert(dispatchedProductAndRemValue.message);
        enteredCode = "";
        displayRemainValue(dispatchedProductAndRemValue);
        return;
      }

      if (dispatchedProductAndRemValue.ProductName) {
        displayDispatchProduct(dispatchedProductAndRemValue);
      }

      displayRemainValue(dispatchedProductAndRemValue);

      let val = await getDataFromBackend();
      console.log(val);
      
      CreateShelfAndProduct(val.data);
    } catch (error) {
      console.error(error);
    }

    enteredCode = "";
  });

  // Submit money button
  submitMoneyBtn?.addEventListener("click", async () => {
    let val = inputtedMoney.value;

    if (val.length === 0 || val === "0") {
      alert("Give Some Money!");
      return;
    }

    try {
      let response = await sendMoney(val);
      alert(response.data);
      inputtedMoney.value = 0;
    } catch (error) {
      console.error(error);
    }
  });

  cancelBtn?.addEventListener("click", async () => {
    try {
      let response = await cancelProcess();
      displayRemainValue(response.data);
    } catch (error) {
      console.error(error);
    }
  });

  // Adding event listeners to each numpad button
  addNumpadListeners(document.getElementsByClassName("numpad-button0"), "0");
  addNumpadListeners(document.getElementsByClassName("numpad-button1"), "1");
  addNumpadListeners(document.getElementsByClassName("numpad-button2"), "2");
  addNumpadListeners(document.getElementsByClassName("numpad-button3"), "3");
  addNumpadListeners(document.getElementsByClassName("numpad-button4"), "4");
  addNumpadListeners(document.getElementsByClassName("numpad-button5"), "5");
  addNumpadListeners(document.getElementsByClassName("numpad-button6"), "6");
  addNumpadListeners(document.getElementsByClassName("numpad-button7"), "7");
  addNumpadListeners(document.getElementsByClassName("numpad-button8"), "8");
  addNumpadListeners(document.getElementsByClassName("numpad-button9"), "9");

  function CreateShelfAndProduct(shelfs) {
    ProductShowcase.innerHTML = ''; // Clear existing content
    shelfs.forEach(shelf => {
      let divForShelf = document.createElement("div");
      divForShelf.classList.add("shelf");

      let shelfType = document.createElement("p");
      shelfType.id = 'shelf-type';
      shelfType.innerText = shelf.shelfType;
      divForShelf.appendChild(shelfType);

      let productsDiv = document.createElement("div");
      productsDiv.id = "products";

      shelf.listofproducts.forEach(product => {
        let productDiv = document.createElement("div");
        productDiv.classList.add("product");

        let productName = document.createElement("p");
        let productCode = document.createElement("p");
        let productPrice = document.createElement("p");

        productName.id = 'parastyle';
        productName.innerText = `Name: ${product.ProductName}`;

        productCode.id = 'parastyle';
        productCode.innerText = `Code: ${product.productCode}`;

        productPrice.id = 'parastyle';
        productPrice.innerText = `Price: $${product.ProductPrice}`;

        productDiv.appendChild(productName);
        productDiv.appendChild(productCode);
        productDiv.appendChild(productPrice);

        productsDiv.appendChild(productDiv);
      });

      divForShelf.appendChild(productsDiv);
      ProductShowcase.appendChild(divForShelf);
    });
  }

  function displayDispatchProduct(dispatchedProductAndRemValue) {
    displayDispatchPro.innerHTML = ''; // Clear existing content

    let ProductName = document.createElement("p");
    let ProductPrice = document.createElement("p");
    let ProductCode = document.createElement("p");

    ProductName.innerText = `Product: ${dispatchedProductAndRemValue.ProductName}`;
    ProductPrice.innerText = `Price: $${dispatchedProductAndRemValue.price}`;
    ProductCode.innerText = `Code: ${dispatchedProductAndRemValue.code}`;

    displayDispatchPro.appendChild(ProductName);
    displayDispatchPro.appendChild(ProductPrice);
    displayDispatchPro.appendChild(ProductCode);
  }

  function displayRemainValue(dispatchedProductAndRemValue) {
    changeAmount.innerText = `Change: $${dispatchedProductAndRemValue.change}`;
    changeDisplay.appendChild(changeAmount);
  }

  async function getDataFromBackend() {
    try {
      let response = await axios.get("http://localhost:8080/getProductInformation");
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async function sendMoney(moneyTosend) {
    try {
      let response = await axios.post("http://localhost:8080/submitMoney", {
        money: moneyTosend,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async function selectProduct(code) {
    try {
      let response = await axios.post("http://localhost:8080/selectProduct", {
        code: code,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async function cancelProcess() {
    try {
      let response = await axios.get("http://localhost:8080/cancelProcess");
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async function initializeMachine() {
    try {
      let val = await getDataFromBackend();
      CreateShelfAndProduct(val.data);
    } catch (error) {
      console.error(error);
    }
  }
});
