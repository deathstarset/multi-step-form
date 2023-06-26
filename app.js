// getting the left part
let leftPart = document.querySelector(".left-part");
// getting the steps
let firstStep = document.querySelector(".right-part1");
let secondStep = document.querySelector(".right-part2");
let thirdStep = document.querySelector(".right-part3");
let fourthStep = document.querySelector(".right-part4");
let fifthStep = document.querySelector(".right-part5");
// getting the form inputs
let nameInput = document.querySelector("[data-name]");
let emailInput = document.querySelector("[data-email]");
let phoneInput = document.querySelector("[data-phone]");
let inputsArr = [nameInput, emailInput, phoneInput];
// working with the next button
let nextBtn = document.querySelector(".next-btn");
let backBtn = document.querySelector(".back-btn");
// ///////////////////////////////////////////////////
let plans = Array.from(document.querySelector(".plans").children);
nextBtn.onclick = function () {
  if (firstStep.classList.contains("current")) {
    for (let i = 0; i < inputsArr.length; i++) {
      if (inputsArr[i].value === "") {
        let redMsg = document.createElement("p");
        redMsg.className = "red-msg";
        redMsg.textContent = "This field is required";
        inputsArr[i].parentElement.appendChild(redMsg);
        inputsArr[i].classList.add("red-input");
      }
    }
    if (
      emailInput.value !== "" &&
      phoneInput.value !== "" &&
      nameInput !== ""
    ) {
      firstStep.classList.add("hide");
      firstStep.classList.remove("current");
      secondStep.classList.remove("hide");
      secondStep.classList.add("current");
    }
  } else if (secondStep.classList.contains("current")) {
    plans.forEach((plan) => {
      if (plan.classList.contains("selected")) {
        secondStep.classList.add("hide");
        secondStep.classList.remove("current");
        thirdStep.classList.remove("hide");
        thirdStep.classList.add("current");
      }
    });
  } else if (thirdStep.classList.contains("current")) {
    thirdStep.classList.add("hide");
    thirdStep.classList.remove("current");
    fourthStep.classList.remove("hide");
    fourthStep.classList.add("current");

    // making the fourth part
    let checkingContainer = document.querySelector(".checking");
    // making the plan checking
    let checkingContainerChilds = Array.from(checkingContainer.children);
    for (let i = 0; i < checkingContainerChilds.length; i++) {
      checkingContainerChilds[i].remove();
    }
    let checkingPlans = document.createElement("div");
    checkingPlans.className = "checking-plan-info";
    checkingContainer.appendChild(checkingPlans);
    // making the plan price
    let planPrice = document.createElement("p");
    planPrice.className = "plan-price";
    checkingPlans.appendChild(planPrice);
    // making the plan text
    let planText = document.createElement("div");
    planText.className = "plan-text";
    // making the plan kind
    let plansTextKind = document.createElement("p");
    let planSwitchChild = Array.from(secondStep.children[2].children);

    for (let i = 0; i < plans.length; i++) {
      if (plans[i].classList.contains("selected")) {
        plansTextKind.textContent =
          plans[i].children[1].children[0].textContent;
        planPrice.textContent = plans[i].children[1].children[1].textContent;
      }
    }
    for (let i = 0; i < planSwitchChild.length; i++) {
      if (planSwitchChild[i].classList.contains("bold")) {
        plansTextKind.textContent += ` (${planSwitchChild[i].textContent})`;
      }
    }
    planText.appendChild(plansTextKind);
    checkingPlans.appendChild(planText);
    // making the change button
    let planTextChange = document.createElement("p");
    planTextChange.textContent = "Change";
    planText.appendChild(planTextChange);
    planTextChange.onclick = function () {
      fourthStep.classList.add("hide");
      fourthStep.classList.remove("current");
      secondStep.classList.remove("hide");
      secondStep.classList.add("current");
      Array.from(leftPart.children).forEach((step) => {
        if (step.children[1].children[0].textContent == 2) {
          step.children[1].classList.add("num-active");
        } else if (step.children[1].children[0].textContent == 4) {
          step.children[1].classList.remove("num-active");
        }
      });
    };

    // making the line
    let theLine = document.createElement("div");
    theLine.className = "line";
    checkingContainer.appendChild(theLine);

    // making the add-ons page
    let addOns = Array.from(thirdStep.children[1].children);
    for (let i = 0; i < addOns.length; i++) {
      if (addOns[i].classList.contains("add-active")) {
        let addOnNameText = addOns[i].children[1].children[0].textContent;
        let addOnPriceText = addOns[i].children[2].textContent;
        let addContainer = document.createElement("div");
        addContainer.className = "add-container";
        checkingContainer.appendChild(addContainer);
        let addName = document.createElement("p");
        addName.className = "add-name";
        let addPrice = document.createElement("p");
        addPrice.className = "add-price";
        addName.textContent = addOnNameText;
        addPrice.textContent = addOnPriceText;
        addContainer.appendChild(addName);
        addContainer.appendChild(addPrice);
      }
    }
    // making the checking total
    let total = document.createElement("div");
    total.className = "total";
    checkingContainer.appendChild(total);
    // making the total text
    let totalText = document.createElement("p");
    totalText.textContent = "Total (per year)";
    total.appendChild(totalText);
    // making the total price
    let totalPrice = document.createElement("p");
    total.appendChild(totalPrice);
    let SelectedPlan = Array.from(secondStep.children[1].children).filter(
      (plan) => {
        return plan.classList.contains("selected");
      }
    );
    let selectedAddOn = addOns.filter((addOn) => {
      return addOn.classList.contains("add-active");
    });
    let addPs = selectedAddOn
      .map((add) => {
        return add.children[2].textContent;
      })
      .map((add) => {
        return add.slice(1);
      });
    let plansAndAddons = SelectedPlan.concat(selectedAddOn);
    let prices = [];
    for (let i = 0; i < plansAndAddons.length; i++) {
      if (plansAndAddons[i].classList.contains("selected")) {
        let planP = plansAndAddons[i].children[1].children[1].textContent;
        prices.push(planP);
      }
    }
    addPs.forEach((addP) => {
      prices.push(addP);
    });
    let planDuration = prices[0]
      .split("")
      .reverse()
      .splice(0, 2)
      .reverse()
      .join("");
    let totalPriceNum = prices
      .map((price) => {
        return price.slice(1);
      })
      .map((price) => {
        return +price.split("").reverse().slice(3).reverse().join("");
      })
      .reduce((total, num) => {
        return total + num;
      });
    totalPrice.textContent = `${totalPriceNum}/${planDuration}`;
  } else if (fourthStep.classList.contains("current")) {
    fourthStep.classList.add("hide");
    fourthStep.classList.remove("current");
    fifthStep.classList.remove("hide");
    fifthStep.classList.add("current");
    nextBtn.classList.add("hide");
    backBtn.classList.add("hide");
  }

  // making the back button appears and disappears based on the steps
  if (!firstStep.classList.contains("current")) {
    backBtn.classList.remove("hide-back-btn");
  }
};
// adding functionalities to the numbers on the left part
nextBtn.addEventListener("click", function () {
  let steps = [firstStep, secondStep, thirdStep, fourthStep, fifthStep];
  let leftSteps = Array.from(leftPart.children);
  for (let i = 0; i < steps.length; i++) {
    if (steps[i].classList.contains("current")) {
      leftSteps.forEach((step) => {
        step.children[1].classList.remove("num-active");
      });
      leftSteps.forEach((step) => {
        let stepNumContainer = step.children[1];
        if (i + 1 == stepNumContainer.children[0].textContent) {
          stepNumContainer.classList.add("num-active");
        }
      });
      if (i === 4) {
        leftSteps.forEach((step) => {
          if (step.children[1].children[0].textContent == i) {
            step.children[1].classList.add("num-active");
          }
        });
      }
    }
  }
});
// working on the back button
backBtn.onclick = function () {
  if (secondStep.classList.contains("current")) {
    firstStep.classList.add("current");
    firstStep.classList.remove("hide");
    secondStep.classList.add("hide");
    secondStep.classList.remove("current");
  } else if (thirdStep.classList.contains("current")) {
    secondStep.classList.add("current");
    secondStep.classList.remove("hide");
    thirdStep.classList.add("hide");
    thirdStep.classList.remove("current");
  } else if (fourthStep.classList.contains("current")) {
    thirdStep.classList.add("current");
    thirdStep.classList.remove("hide");
    fourthStep.classList.add("hide");
    fourthStep.classList.remove("current");
  }
  if (firstStep.classList.contains("current")) {
    backBtn.classList.add("hide-back-btn");
  }
};
// working with the input functionalities also
inputsArr.forEach((input) => {
  input.oninput = function () {
    if (input.value !== "") {
      input.classList.remove("red-input");
      if (input.nextElementSibling !== null) {
        input.nextElementSibling.remove();
      }
    }
  };
});

// working on the switch plans from monthly to yearly and vice versa
let circleContainer = document.querySelector(".circle-container");
let monthlyPlans = circleContainer.previousElementSibling;
let yearlyPlans = circleContainer.nextElementSibling;
let circle = circleContainer.children[0];
plans = Array.from(document.querySelector(".plans").children);
circleContainer.onclick = function () {
  circle.classList.toggle("circle-right");
  if (monthlyPlans.classList.contains("bold")) {
    // this means that we are going to the yearly plan
    monthlyPlans.classList.remove("bold");
    yearlyPlans.classList.add("bold");
    plans.forEach((plan) => {
      let offer = document.createElement("p");
      offer.textContent = "2 months free";
      offer.className = "offer";
      plan.children[1].appendChild(offer);
      if (plan.children[1].children[0].textContent === "Arcade") {
        plan.children[1].children[1].textContent = "$90/yr";
      } else if (plan.children[1].children[0].textContent === "Advanced") {
        plan.children[1].children[1].textContent = "$120/yr";
      } else {
        plan.children[1].children[1].textContent = "$150/yr";
      }
    });
    // working on changing the third step add-ons to yearly plans also
    let thirdStepAdds = Array.from(thirdStep.children[1].children);
    thirdStepAdds.forEach((add) => {
      let priceBeforeChange = add.children[2].textContent.split("");
      let numChange = priceBeforeChange.splice(0, 3);
      numChange.push(0);
      let priceAfterChange = `${numChange.join("")}/yr`;
      add.children[2].textContent = priceAfterChange;
    });
  } else {
    // here that means we are going back to the monthly options
    yearlyPlans.classList.remove("bold");
    monthlyPlans.classList.add("bold");
    plans.forEach((plan) => {
      plan.children[1].children[2].remove();
      if (plan.children[1].children[0].textContent === "Arcade") {
        plan.children[1].children[1].textContent = "$9/mo";
      } else if (plan.children[1].children[0].textContent === "Advanced") {
        plan.children[1].children[1].textContent = "$12/mo";
      } else {
        plan.children[1].children[1].textContent = "$15/mo";
      }
    });
    // working on changing the add-on plans back to monthly plans
    let thirdStepAdds = Array.from(thirdStep.children[1].children);
    thirdStepAdds.forEach((add) => {
      let priceBeforeChange = add.children[2].textContent.split("");
      let numChange = priceBeforeChange.splice(0, 4);
      numChange.pop("0");
      let priceAfterChange = `${numChange.join("")}/mo`;
      add.children[2].textContent = priceAfterChange;
    });
  }
};

// working on the plans selecting
plans.forEach((plan) => {
  plan.onclick = function () {
    for (let i = 0; i < plans.length; i++) {
      plans[i].classList.remove("selected");
    }
    plan.classList.add("selected");
  };
});

// working on selecting add-ons
let checkBtns = document.querySelectorAll(".check-mark");
checkBtns.forEach((checkBtn) => {
  checkBtn.onclick = function () {
    checkBtn.classList.toggle("check-active");
    checkBtn.parentElement.classList.toggle("add-active");
  };
});
