"use client"

import { useState } from "react"

// Tailwind CSS가 기본 설정

interface Todo {
  id: number,
  text: string,
  completed: boolean
}
export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState("")
  // Deprecated 타입: React.FormEvent, React.FormEventHandler
  // 대체 타입: React.SubmitEvent, React.SubmitEventHandler
  //추가
  const addTodo = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false
    };

    setTodos([...todos, newTodo])
    setInput('')
  }

  //완료 상태 토글
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    )
  }

  //삭제
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold  text-gray-800 mb-4 text-center">
          할 일 목록
        </h1>

        {/* 입력폼 */}
        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="할 일을 입력하세요..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2
            text-gray-700 focus:outline-none focus:border-blue-500"/>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 
              rounded-lg font-medium hover:bg-blue-600 transition" >
            추가
          </button>
        </form>
        {/* 할 일 목록 리스튼 */}
        <ul className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-center  text-gray-400 py-4">등록된 할 일이 없습니다.</p>
          )
            : (
              todos.map((todo) => (
                <li key={todo.id}
                  className="flex items-center justify-between
                         bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div
                    onClick={() => toggleTodo(todo.id)}
                    className="flex items-center gap-3 cursor-pointer flex-1">
                    <input type="checkbox"
                      checked={todo.completed}
                      onChange={() => { }}
                      className="w-5 h-5 accent-blue-500 cursor-pointer" />
                    <span className={`${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                      {todo.text}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium ml-2">삭제</button>
                </li>
              )
              ))
          }
        </ul>
      </div>
    </main>
  )
}


