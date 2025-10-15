# 🧮 Postfix and Infix Expression Interpreter

A **JavaScript application** that evaluates postfix (Reverse Polish Notation) and infix expressions using data structures like **stacks**, **arrays**, and **hash tables**.  
This project demonstrates how algorithms and data structures work together in efficient expression evaluation and symbol table management.

---

## 🚀 Overview

The interpreter processes user input expressions, evaluates results in **postfix notation**, and manages symbols dynamically in a symbol table.  
It provides a **menu-driven interface** that allows users to view, search, update, and delete entries efficiently.

---

## ⚙️ Key Features

| Feature | Description |
|----------|-------------|
| **Postfix Evaluation** | Evaluates mathematical expressions using stack-based logic. |
| **Symbol Table Management** | Stores and retrieves variable-value pairs (A–Z). |
| **CRUD Operations** | View, search, update, and delete symbols interactively. |
| **Input Validation** | Ensures valid symbol range (A–Z) and values (-100 to 100). |
| **Error Handling** | Detects invalid inputs, prevents overflow, and returns informative messages. |
| **Hash-Based Search** | Uses hashing for O(1) search and update operations. |
| **Real-Time Feedback** | Immediate results and responsive interaction through JavaScript’s runtime. |

---

## 🧠 Algorithms & Data Structures

- **Stack (LIFO):** Used for postfix evaluation and temporary operand storage.  
- **Array:** Handles ordered token storage for efficient parsing.  
- **Object / Hash Table:** Manages the symbol table with key–value mappings.  
- **Hashing Algorithm:** Enables constant-time access for search, insert, and delete.

---

## 🧩 Architecture

The program uses modular functions for:
- `evaluatePostfixExp()` – Evaluates postfix expressions.
- `updateSymbolTable()` – Updates variable values.
- `deleteSymbol()` – Removes symbols safely.
- `searchSymbolHash()` – Searches using hash-based lookup.
- `isValidNumber()` – Validates number ranges.

---

## 💻 Technology Stack

| Component | Tool |
|------------|------|
| **Language** | JavaScript (Node.js) |
| **Interface** | Terminal-based menu |
| **Libraries** | `readline` for user input |
| **Complexity** | Time: O(1) avg for hash ops · Space: O(n) for table storage |

---


---

## 🧪 Testing & Validation

- Range checking: Values between **-100 and 100**
- Symbol limit: Up to **1000 records**
- Hash collision checks for robustness
- Pseudocode and flow diagrams tested for accuracy and efficiency

---

## 🔮 Future Improvements

- Extend to full **infix-to-postfix converter**
- GUI-based visual stack animation
- Persistent storage for symbol tables
- Unit testing suite (Mocha / Jest)

## Download Node
https://nodejs.org/

## Run the code
- node postfixinterpreter.js