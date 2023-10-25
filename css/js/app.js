var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)

// Lấy tất cả các nút số bằng cách sử dụng lớp CSS "input_value"
const numberButtons = $$(".input_value");
const screenElement  = $('.text_show')
const equalButton = $(".equal");
const deleteAllButton = $(".deleteAll");
const deleteButton = $(".delete");


// Khởi tạo biến lưu giá trị trên "screen"
let screenValue = "0";

// Hàm xử lý sự kiện click
function handleNumberClick(e) {
    const number = e.target.value;
    screenValue += number;
    // Hiển thị giá trị trên "screen"
    screenElement.textContent = screenValue;
}

function calculate() {
    try {
        const result = eval(screenValue); // Sử dụng hàm eval để tính toán biểu thức
        screenValue = result.toString(); // Chuyển kết quả thành chuỗi và gán lại cho screenValue
        screenElement.textContent = screenValue; // Hiển thị kết quả lên màn hình
    } catch (error) {
        // Xử lý lỗi nếu có
        screenValue = "Error";
        screenElement.textContent = screenValue;
    }
}

function cleanAll(){
    screenElement.innerHTML = "0"
    // screenElement.textContent = ""
    screenValue = ""
}

function clean_fist(){
    if(screenValue.length>0){
        screenValue = screenValue.slice(0, -1)
    screenElement.textContent = screenValue;
    }
}

function percent() {
    if (screenValue.length > 0) {
        // Tìm vị trí của toán tử (+, -, *, /) gần nhất trong biểu thức tính toán
        const operators = ["+", "-", "*", "/"];
        let lastOperatorIndex = -1;
        for (const operator of operators) {
            const index = screenValue.lastIndexOf(operator);
            if (index > lastOperatorIndex) {
                lastOperatorIndex = index;
            }
        }

        // Nếu tìm thấy toán tử và sau toán tử là một số, tính phần trăm
        if (lastOperatorIndex >= 0) {
            const portion = screenValue.slice(lastOperatorIndex + 1);
            const value = parseFloat(portion);
            if (!isNaN(value)) {
                const result = value / 100;
                screenValue = screenValue.slice(0, lastOperatorIndex + 1) + result;
                screenElement.textContent = result;
            }
        }
    }
}


// Gán sự kiện click cho nút 
//1.Các nút số
numberButtons.forEach((button) => {
    button.addEventListener("click", handleNumberClick);
});
//2. nút '='
equalButton.addEventListener("click", calculate);
//3. nút'AC'
deleteAllButton.addEventListener("click", cleanAll);
//4. nut delete
deleteButton.addEventListener("click", clean_fist)
