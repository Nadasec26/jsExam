let nameInput = document.querySelector("#nameInput");
let emailInput = document.querySelector("#emailInput");
let phoneInput = document.querySelector("#phoneInput");
let ageInput = document.querySelector("#ageInput");
let passwordInput = document.querySelector("#passwordInput");
let rePasswordInput = document.querySelector("#repasswordInput");
let submitBtn = document.querySelector("#submitBtn");



let users = JSON.parse(localStorage.getItem("users")) || [];

submitBtn.addEventListener("click", function () {
    if(inputValidation(nameInput,'nameAlert') && inputValidation(emailInput,'emailAlert') && inputValidation(phoneInput,'phoneAlert') && inputValidation(ageInput,'ageAlert') && inputValidation(passwordInput,'passwordAlert') && passwordsMatch() ){
        let newUser = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        age: ageInput.value,
        password: passwordInput.value,
    };

    // تأكد إن الإيميل مش متسجل قبل كده
    let isExist = users.some(user => user.email === newUser.email);

    if (isExist) {
        alert("This email is already registered!");
    } else {
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registered successfully");

        clearInput();
    }
    }else{
        console.log("error");
    }
});

function passwordsMatch() {
    let alert = document.getElementById("repasswordAlert");
    if (passwordInput.value === rePasswordInput.value && rePasswordInput.value !== "") {
        alert.classList.add("d-none");
        return true;
    } else {
        alert.classList.remove("d-none");
        return false;
    }
}

function clearInput(){
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    ageInput.value = "";
    passwordInput.value = "";
    rePasswordInput.value = "";
    submitBtn.setAttribute("disabled", true);
}



function inputValidation(ele,msgId){
    var text = ele.value;
    var msg = document.getElementById(msgId);
    var regex = {
        nameInput :  /^[a-zA-Z ]{2,15}$/,
        emailInput : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        phoneInput : /^01[0-9]{9}$/,
        ageInput : /^(1[0-9]|[2-9][0-9])$/,
        passwordInput : /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    }
    if(regex[ele.id].test(text)){
        msg.classList.add("d-none");
            return true
    }else{
        msg.classList.remove("d-none");
            return false
    }
}



[nameInput, emailInput, phoneInput, ageInput, passwordInput, rePasswordInput].forEach(input => {
    input.addEventListener("input", () => {
        let allValid = 
            inputValidation(nameInput, 'nameAlert') &&
            inputValidation(emailInput, 'emailAlert') &&
            inputValidation(phoneInput, 'phoneAlert') &&
            inputValidation(ageInput, 'ageAlert') &&
            inputValidation(passwordInput, 'passwordAlert') &&
            passwordsMatch();

        if (allValid) {
            submitBtn.removeAttribute("disabled");
        } else {
            submitBtn.setAttribute("disabled", true);
        }
    });
});




// menuBox
$(document).ready(function () {
    const menuBox = $('.upper').innerWidth();
    let isShow = false;
    $('.settings').css({ left: `-${menuBox}px` });
    $('.bar').on('click', function () {
        if (isShow) {
            $('.settings').animate({ left: `-${menuBox}px` }, 500);
            $('#toggle-icon').addClass('fa-bars').removeClass('fa-xmark');
            $(".menu li").css({
                opacity: 0,
                transform: "translateY(20px)",
                animation: "none"
            });
            isShow = false;
        } else {
            $('.settings').animate({ left: `0` }, 500, function () {
                $(".menu li").each(function (index) {
                    $(this).css({
                        animation: `slideIn 0.5s ease forwards`,
                        "animation-delay": `${index * 0.2}s`
                    });
                });
            });
            $('#toggle-icon').removeClass('fa-bars').addClass('fa-xmark');
            isShow = true;
        }
    });
});