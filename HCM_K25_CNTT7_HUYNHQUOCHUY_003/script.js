let currentOrderCode = "";
let isOrderValid = false;
let totalRevenue = 0;
let totalOrders = 0;
let isRunning = true;
while (isRunning) {
  console.log("=====================================================");
  console.log("        HỆ THỐNG THANH TOÁN NHÀ SÁCH TRI THỨC");
  console.log("=====================================================");
  console.log("1. Nhập và kiểm chuẩn mã đơn hàng");
  console.log("2. Tính tiền đơn sách");
  console.log("3. Thẩm định mã hóa đơn may mắn");
  console.log("0. Thoát chương trình");
  console.log("=====================================================");

  let choice = prompt("Vui lòng nhập lựa chọn của bạn (0 - 3):");
  if (choice === null) {
    console.log("Lựa chọn không hợp lệ, vui lòng nhập lại.");
    continue;
  }

  choice = choice.trim();
  switch (choice) {
    case "1": {
      currentOrderCode = "";
      isOrderValid = false;
      let inputCode = prompt("Nhập mã đơn hàng:");

      if (inputCode === null) {
        console.log("Chưa nhập mã đơn hàng");
        break;
      }
      inputCode = inputCode.trim();
      if (inputCode === "") {
        console.log("Chưa nhập mã đơn hàng");
        break;
      }
      let formattedCode = inputCode.toUpperCase();

      if (formattedCode.length < 6) {
        console.log("Lỗi: Độ dài nhỏ hơn 6 ký tự");
        break;
      }
      if (!formattedCode.startsWith("BOK-")) {
        console.log('Lỗi: Sai tiền tố "BOK-"');
        break;
      }
      if (formattedCode.includes(" ")) {
        console.log("Lỗi: Chứa khoảng trắng ở giữa");
        break;
      }
      currentOrderCode = formattedCode;
      isOrderValid = true;
      console.log("Nhập mã đơn hàng thành công: " + currentOrderCode);
      break;
    }
    case "2": {
      if (!isOrderValid) {
        console.log(
          "Vui lòng chọn chức năng 1 để nhập và kiểm chuẩn mã đơn hàng trước.",
        );
        break;
      }
      let bookCountStr;
      let bookCount = 0;
      while (true) {
        bookCountStr = prompt("Nhập số lượng cuốn sách:");
        if (bookCountStr === null) break;
        bookCountStr = bookCountStr.trim();
        bookCount = Number(bookCountStr);
        if (
          bookCountStr !== "" &&
          !isNaN(bookCount) &&
          Number.isInteger(bookCount) &&
          bookCount > 0
        ) {
          break;
        }
        console.log(
          "Lỗi: Số lượng sách không hợp lệ. Vui lòng nhập lại số nguyên > 0.",
        );
      }
      if (bookCountStr === null) break;
      let priceStr;
      let pricePerBook = 0;
      while (true) {
        priceStr = prompt("Nhập giá mỗi cuốn sách (VNĐ):");
        if (priceStr === null) break;
        priceStr = priceStr.trim();
        pricePerBook = Number(priceStr);
        if (
          priceStr !== "" &&
          !isNaN(pricePerBook) &&
          Number.isInteger(pricePerBook) &&
          pricePerBook > 0
        ) {
          break;
        }
        console.log(
          "Lỗi: Giá sách không hợp lệ. Vui lòng nhập lại số nguyên > 0.",
        );
      }
      if (priceStr === null) break;

      let baseCost = bookCount * pricePerBook;
      let discount = 0;
      if (bookCount >= 4) {
        discount = Math.round(baseCost * 0.1);
      }
      let packagingFee = Math.round((baseCost - discount) * 0.08);
      let totalPayment = baseCost - discount + packagingFee;

      totalRevenue += totalPayment;
      totalOrders += 1;

      console.log("HÓA ĐƠN MUA SÁCH");
      console.log("Mã đơn hàng: " + currentOrderCode);
      console.log("Số lượng: " + bookCount);
      console.log("Đơn giá: " + pricePerBook.toLocaleString("vi-VN") + " VNĐ");
      console.log(
        "Chi phí cơ sở: " + baseCost.toLocaleString("vi-VN") + " VNĐ",
      );
      console.log("Giảm giá: " + discount.toLocaleString("vi-VN") + " VNĐ");
      console.log(
        "Phí bọc sách và đóng gói: " +
          packagingFee.toLocaleString("vi-VN") +
          " VNĐ",
      );
      console.log(
        "Tổng thanh toán: " + totalPayment.toLocaleString("vi-VN") + " VNĐ",
      );
      currentOrderCode = "";
      isOrderValid = false;
      break;
    }
    case "3": {
      let luckyStr = prompt("Nhập mã hóa đơn may mắn:");
      if (luckyStr === null) {
        break;
      }
      luckyStr = luckyStr.trim();
      let isValidLucky = true;
      if (luckyStr.length < 2) {
        isValidLucky = false;
      }
      let isAllZero = true;
      for (let i = 0; i < luckyStr.length; i++) {
        if (luckyStr[i] < "0" || luckyStr[i] > "9") {
          isValidLucky = false;
          break;
        }
        if (luckyStr[i] !== "0") {
          isAllZero = false;
        }
      }
      if (isAllZero) {
        isValidLucky = false;
      }

      if (!isValidLucky) {
        console.log("Lỗi: Mã hóa đơn may mắn không hợp lệ.");
        break;
      }

      let reversedStr = "";
      let digitSum = 0;
      for (let i = luckyStr.length - 1; i >= 0; i--) {
        reversedStr += luckyStr[i];
        digitSum += Number(luckyStr[i]);
      }

      let isSymmetric = luckyStr === reversedStr;
      let isDivisibleBy9 = digitSum % 9 === 0;

      let prize = "Không trúng thưởng";
      if (isSymmetric && isDivisibleBy9) {
        prize = "Giải Đặc biệt";
      } else if (isSymmetric && !isDivisibleBy9) {
        prize = "Giải Nhất";
      } else if (!isSymmetric && isDivisibleBy9) {
        prize = "Giải Nhì";
      }

      console.log("Mã số gốc: " + luckyStr);
      console.log("Mã đảo ngược: " + reversedStr);
      console.log("Tổng chữ số: " + digitSum);
      console.log("Chia hết cho 9: " + (isDivisibleBy9 ? "Có" : "Không"));
      console.log("Kết quả: " + prize);
      break;
    }
    case "0": {
      console.log("=".repeat(50));
      console.log("BÁO CÁO TỔNG KẾT CA BÁN HÀNG");
      console.log("=".repeat(50));
      console.log("Tổng số đơn hàng đã thanh toán  : " + totalOrders);
      console.log(
        "Tổng doanh thu                  : " +
          totalRevenue.toLocaleString("vi-VN") +
          " VNĐ",
      );
      if (totalOrders === 0) {
        console.log("Chưa phát sinh đơn hàng nào trong ca");
      } else {
        let avg = Math.round(totalRevenue / totalOrders);
        console.log(
          "Doanh thu trung bình            : " +
            avg.toLocaleString("vi-VN") +
            " VNĐ",
        );
      }
      console.log("=".repeat(50));
      console.log("Chương trình đã thoát.");
      isRunning = false;
      break;
    }
    default: {
      prompt("Lựa chọn không hợp lệ, vui lòng nhập lại(0-3)");
      break;
    }
  }
}
