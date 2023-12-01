//  1, 3, 5, 7, 9 숫자를 한번씩 써서 만들 수 있는 두개의 숫자(예를들면 13, 579)중 곱한 값이 가장 큰 조합을 찾아주세요.
// (언어는 자바스크립트 또는 타입스크립트를 사용 바랍니다)

function findMaxProductCombination() {
  const DIGITS = [1, 3, 5, 7, 9];
  const numberCombinations = [];
  let maxCombination  = [];
  let maxValue = 0;

  DIGITS.forEach((firstNum, idx) => {
    for (let i = idx + 1; i < DIGITS.length; i++) {
      const secondNum = DIGITS[i];
      const selectedDigits = [firstNum, secondNum];
      const remainingDigits = DIGITS.filter(
        (num) => num !== firstNum && num !== secondNum
      );

      numberCombinations.push([
        getMaxNum(selectedDigits),
        getMaxNum(remainingDigits),
      ]);
    }
  });

  numberCombinations.forEach((combination) => {
    const [firstNum, secondNum] = combination;
    const product = firstNum * secondNum;

    if (product > maxValue) {
      maxValue = product;
      maxCombination  = [firstNum, secondNum];
    }
  });

  return maxCombination ;
}

function getMaxNum(arr) {
  return Number(arr.sort((a, b) => b - a).join(""));
}

console.log(findMaxProductCombination());
