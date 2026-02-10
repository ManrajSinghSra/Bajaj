function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}


function generateFibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib;
}

function filterPrimes(arr) {
  return arr.filter(isPrime);
}

function calculateGCD(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return Math.abs(a);
}


function calculateHCF(arr) {
  return arr.reduce((acc, val) => calculateGCD(acc, val));
}


function calculateLCM(arr) {
  const lcmTwo = (a, b) => Math.abs(a * b) / calculateGCD(a, b);
  return arr.reduce((acc, val) => lcmTwo(acc, val));
}

module.exports={generateFibonacci,isPrime,filterPrimes,calculateGCD,calculateHCF,calculateLCM}