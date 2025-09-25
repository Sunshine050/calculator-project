function calculate(expression) {
  // แยกตัวเลขและเครื่องหมาย
  const tokens = expression.match(/\d+|\+|\-|\*|\//g);
  if (!tokens) return 0;

  const numStack = [];
  const opStack = [];

  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };

  const applyOp = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
    }
  };

  // Loop ผ่านทุก token
  for (let token of tokens) {
    if (!isNaN(token)) {
      // ตัวเลข → push ลง numStack
      numStack.push(parseFloat(token));
    } else {
      // operator → check precedence กับ stack
      while (opStack.length && precedence[opStack[opStack.length-1]] >= precedence[token]) {
        const b = numStack.pop();
        const a = numStack.pop();
        const op = opStack.pop();
        numStack.push(applyOp(a, b, op));
      }
      opStack.push(token);
    }
  }

  // คำนวณ operator ที่เหลือ
  while (opStack.length) {
    const b = numStack.pop();
    const a = numStack.pop();
    const op = opStack.pop();
    numStack.push(applyOp(a, b, op));
  }

  // ผลลัพธ์สุดท้าย dynamic จาก stack
  return numStack[0];
}

function calculateInput() {
  const expr = document.getElementById('expression').value;
  if (!expr) {
    document.getElementById('result').textContent = 'กรุณากรอกเลข';
    return;
  }
  const result = calculate(expr);
  document.getElementById('result').textContent = result;
}

// ป้องกันการพิมพ์ตัวอักษรที่ไม่ใช่ 0-9 + - * /
const inputField = document.getElementById('expression');
inputField.addEventListener('keypress', function(e) {
  if (!'0123456789+-*/'.includes(e.key)) e.preventDefault();
});
