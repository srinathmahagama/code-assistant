import json
import random

# Sample prompt templates
questions = [
    (
        "Write a Python function to check if a number is even.",
        "def is_even(n):\n    return n % 2 == 0",
    ),
    (
        "Write a Python function to calculate the factorial of a number.",
        "def factorial(n):\n    return 1 if n == 0 else n * factorial(n-1)",
    ),
    (
        "What does this python code do?\n\nfor i in range(3): print(i)",
        "It prints the numbers 0, 1, and 2.",
    ),
    (
        "Write a function to reverse a string in Python.",
        "def reverse_string(s):\n    return s[::-1]",
    ),
    (
        "Fix this python code: `for i in range(5) print(i)`",
        "for i in range(5):\n    print(i)",
    ),
    (
        "Explain this python code: `[x**2 for x in range(5)]`",
        "It returns a list of squares from 0 to 4: [0, 1, 4, 9, 16].",
    ),
    (
        "Write a Python function to sum all elements in a list.",
        "def sum_list(lst):\n    return sum(lst)",
    ),
    (
        "How do you open a file and read its content in Python?",
        "with open('file.txt', 'r') as f:\n    content = f.read()",
    ),
    (
        "Write a Python class named `Dog` with a bark method.",
        "class Dog:\n    def bark(self):\n     print('Woof!')",
    ),
    # new
    (
        "Write a JavaScript function to check if a number is even.",
        "function isEven(n) {\n  return n % 2 === 0;\n}",
    ),
    (
        "Write a function to reverse a string in JavaScript.",
        "function reverseString(str) {\n  return str.split('').reverse().join('');\n}",
    ),
    (
        "Write a JavaScript function to find the maximum of two numbers.",
        "function max(a, b) {\n  return a > b ? a : b;\n}",
    ),
    (
        "Write a javascript function to check if a string is a palindrome.",
        "function isPalindrome(str) {\n  const reversed = str.split('').reverse().join('');\n  return str === reversed;\n}",
    ),
    (
        "Write a javascript function to calculate the factorial of a number.",
        "function factorial(n) {\n  if (n === 0) return 1;\n  return n * factorial(n - 1);\n}",
    ),
    (
        "Write a JavaScript function to sum all numbers in an array.",
        "function sumArray(arr) {\n  return arr.reduce((sum, num) => sum + num, 0);\n}",
    ),
    (
        "Write a function that returns the Fibonacci sequence up to n terms in javascript.",
        "function fibonacci(n) {\n  const seq = [0, 1];\n  for (let i = 2; i < n; i++) {\n    seq.push(seq[i - 1] + seq[i - 2]);\n  }\n  return seq.slice(0, n);\n}",
    ),
    (
        "Write a javascript function to remove duplicates from an array.",
        "function removeDuplicates(arr) {\n  return [...new Set(arr)];\n}",
    ),
    ("Write a Python program that prints 'Hello, World!'", "print('Hello, World!'"),
    (
        "Explain this code: `max([5, 2, 8])`",
        "It returns the largest number in the list, which is 8.",
    ),
    (
        "How to write a code to return minimum)`",
        "Put all numbers to list; min([2,0,5,7])",
    ),
    (
        "Explain this code: `'python'.upper()`",
        "It converts the string 'python' to uppercase: 'PYTHON'.",
    ),
    (
        "Write a function `creat_odd_list` that returns even numbers from 3 to n.",
        "def create_odd_list(n):\n    return list(range(3, n+1, 3))",
    ),
    (
        "Write a Python program that adds 1 to any number.",
        "def increment(n):\n    return n + 1",
    ),
    (
        "Write a Python function `is_even` that returns the square of a number.!'",
        "def is_even(x):\n    return x ** 2",
    ),
    (
        "Write a function `is_adult` that returns True if age >= 18.",
        "def is_adult(age):\n    return age >= 18",
    ),
    (
        "Explain this code: `len('hello')`",
        "It returns the length of the string 'hello', which is 5.",
    ),
    (
        "Create a Python class called `Student` with a method named `introduce` that prints 'I am a student' when called.",
        "class Student:\n    def introduce(self):\n     print('I am a student')",
    ),
    (
        "Write a JavaScript function that returns the sum of two numbers.",
        "function sum(a, b) {\n  return a + b;\n}",
    ),
    (
        "Explain what this javascript code does: `[1, 2, 3].map(x => x * 2)`",
        "It creates a new array by doubling each element: [2, 4, 6].",
    ),
    (
        "Write a JavaScript function that returns the first element of an array.",
        "function getFirst(arr) {\n  return arr[0];\n}",
    ),
    (
        "Explain this javascript code: `'JavaScript'.includes('Script')`",
        "It checks if the string contains 'Script', and returns true.",
    ),
    (
        "Create a javascript function `isEmpty` that checks if a string is empty.",
        "function isEmpty(str) {\n  return str.length === 0;\n}",
    ),
    (
        "Write a javascript program that logs numbers from 1 to 5 using a loop.",
        "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}",
    ),
    (
        "Create a javascript object `car` with properties `make`, `model`, and `year`.",
        "const car = {\n  make: 'Toyota',\n  model: 'Corolla',\n  year: 2020\n};",
    ),
    (
        "Explain this javascript code: `typeof 42`",
        "It returns the type of the value 42, which is 'number'.",
    ),
]


# Generate 100 items by random sampling
dataset = []
for i in range(180):
    q, a = random.choice(questions)
    dataset.append({"instruction": q, "input": "", "output": a})

# Save to JSON file
with open("dataset.json", "w") as f:
    json.dump(dataset, f, indent=2)

print("✅ dataset.json created with 100 coding entries.")
