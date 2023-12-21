const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = document.querySelectorAll("[data-step]");
const pageSteps = document.querySelectorAll("[data-form-step]");
let currentStep = Array.from(formSteps).findIndex((step) => {
  return step.classList.contains("active");
});
let currentPage = Array.from(pageSteps).findIndex((page) => {
  return page.classList.contains("active");
});
const showCurrentStep = () => {
  formSteps.forEach((step, index) => {
    if (currentStep === index) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
};

const showCurrentPage = () => {
  pageSteps.forEach((page, index) => {
    if (currentPage === index) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }
  });
};
if (currentStep < 0) {
  currentStep = 0;
  currentPage = 0;
  showCurrentStep();
  showCurrentPage();
}

multiStepForm.addEventListener("click", (e) => {
  if (e.target.matches("[data-next]")) {
    const inputs = formSteps[currentStep].querySelectorAll("input");
    const errorMsgs = formSteps[currentStep].querySelectorAll(".err-msg");
    const allValid = Array.from(inputs).every((input) => input.checkValidity());
    if (allValid) {
      const formData = new FormData(multiStepForm);
      const formObject = Object.fromEntries(formData);
      const jsonData = JSON.stringify(formObject);
      localStorage.setItem("formValues", jsonData);
      currentStep += 1;
      currentPage += 1;
      showCurrentStep();
      showCurrentPage();
    } else {
      Array.from(inputs).forEach((input) => {
        if (!input.checkValidity()) {
          input.classList.add("error");
        } else {
          input.classList.remove("error");
        }
      });
      Array.from(errorMsgs).forEach((errMsg) => {
        const associatedInputId = errMsg.dataset.errorFor;
        const associatedInput = document.getElementById(associatedInputId);

        if (associatedInput && !associatedInput.checkValidity()) {
          errMsg.classList.add("active");
        } else {
          errMsg.classList.remove("active");
        }
      });
    }
  } else {
    return;
  }
});
