//Controller for Budget
var budgetController = (function () {
  var Expenses = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
  };

  return {
    addItem: function (type, des, val) {
      //creating new ID

      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      //creating new item on basis of income or expense

      if (type === "exp") {
        newItem = new Expenses(ID, des, val);
      } else {
        newItem = new Income(ID, des, val);
      }
      //pushing to db
      data.allItems[type].push(newItem);
      //return the pushed element
      return newItem;
    },

    testing: function () {
      console.log(data);
    },
  };
})();

//Controller for UI

var UIController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },

    addListItem: function (obj, type) {
      var html, newHtml, element;

      //creating html string with placeholder text la

      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__%description%">Salary</div><div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete">  <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div</div>';
      } else if (type === "exp") {
        element = DOMstrings.expenseContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"> <div class="item__%description%">Apartment rent</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div></div>';
      }
      //Replace the pl;aceholdler text with some actual data
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      //insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    clearFields: function () {
      var fields, fieldsArr;

      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function (current, index, array) {
        current.value = "";
      });

      fieldsArr[0].focus();
    },

    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

//Controller for Global app
var controller = (function (budgetCtrl, UICtrl) {
  var setupEventListener = function () {
    var DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function () {
    //getting the field input data
    var input = UICtrl.getInput();

    //adding budget item to the controoller
    budgetCtrl.addItem(input.type, input.description, input.value);

    //addding item list to the UI

    UICtrl.addListItem(newItem, input.type);

    //clearing the fields after adding the items

    UICtrl.clearFields();
  };

  return {
    init: function () {
      setupEventListener();
    },
  };
})(budgetController, UIController);

controller.init();

//Put for re-using later----->
//   var x = 23;
//   var add = function (a) {
//     return x + a;
//   };
//   return {
//     publicTest: function (b) {
//      return add(b);
//     },
//   };

//   var z = budgetCtrl.publicTest(500);
//   return {
//     anotherPublic: function () {
//       console.log(z);
//     },
//   };
