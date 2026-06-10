/**
 * calculator.ts
 * A Calculator class with intentional bugs — find and fix them with Copilot CLI!
 *
 * EXERCISE: Ask Copilot CLI:
 *   "Review calculator.ts for bugs and logic errors, then fix them."
 */

export class Calculator {
  private history: string[] = [];

  add(a: number, b: number): number {
    const result = a + b;
    this.history.push(`${a} + ${b} = ${result}`);
    return result;
  }

  subtract(a: number, b: number): number {
    const result = a - b;
    this.history.push(`${a} - ${b} = ${result}`);
    return result;
  }

  multiply(a: number, b: number): number {
    // BUG: This multiplies incorrectly for negative numbers
    const result = Math.abs(a) * Math.abs(b);
    this.history.push(`${a} * ${b} = ${result}`);
    return result;
  }

  divide(a: number, b: number): number {
    // BUG: No division-by-zero check
    const result = a / b;
    this.history.push(`${a} / ${b} = ${result}`);
    return result;
  }

  getHistory(): string[] {
    // BUG: Returns a reference to the internal array (should return a copy)
    return this.history;
  }

  clearHistory(): void {
    this.history = [];
  }
}

// Quick manual test — run with: npx ts-node src/calculator.ts
const calc = new Calculator();
console.log("5 + 3 =", calc.add(5, 3));
console.log("-4 * 3 =", calc.multiply(-4, 3));   // Should be -12, not 12
console.log("10 / 2 =", calc.divide(10, 2));
console.log("History:", calc.getHistory());
