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
      numStack.push(parseFloat(token));
    } else {
      while (opStack.length && precedence[opStack[opStack.length-1]] >= precedence[token]) {
        const b = numStack.pop();
        const a = numStack.pop();
        const op = opStack.pop();
        numStack.push(applyOp(a, b, op));
      }
      opStack.push(token);
    }
  }
  while (opStack.length) {
    const b = numStack.pop();
    const a = numStack.pop();
    const op = opStack.pop();
    numStack.push(applyOp(a, b, op));
  }
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
const inputField = document.getElementById('expression');
inputField.addEventListener('keypress', function(e) {
  if (!'0123456789+-*/'.includes(e.key)) e.preventDefault();
});
