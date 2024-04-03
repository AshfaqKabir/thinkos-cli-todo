import {
  intro,
  outro,
  confirm,
  select,
  spinner,
  isCancel,
  cancel,
  text,
} from "@clack/prompts";
import pc from "picocolors";

// Todo List
let todos = [
  { id: 1, task: "First Todo", isCompleted: true },
  { id: 2, task: "Second Todo", isCompleted: false },
];

async function main() {
  // Add Todo
  function addTodo(task) {
    let todo = {
      id: Math.floor(Math.random() * 100),
      task,
      isCompleted: false,
    };
    todos.push(todo);
  }

  // List Todos
  function getTodos() {
    console.log("Todo List:");
    if (todos.length >= 1) {
      todos.forEach((todo, i) => {
        console.log(
          `${i + 1}.[${todo.isCompleted ? "Done" : "Pending"}] ${todo.task}`
        );
      });
    } else {
      console.log("All Todos Are Completed!");
    }
  }

  // Update Todo
  function updateTodo(i) {
    if (i >= 0 && i < todos.length) {
      todos[i].isCompleted = !todos[i].isCompleted;
    } else {
      console.log("Invalid index!");
    }
  }

  // Delete Todo
  function deleteTodo(i) {
    if (i >= 0 && i < todos.length) {
      todos.splice(i, 1);
    } else {
      console.log("Invalid index!");
    }
  }

  // Intro Text
  intro(pc.bgGreen(pc.bold(pc.white(" My Todo List "))));

  // Desicion
  let decisionType = await select({
    message: "Pick an Option",
    options: [
      { value: "1", label: "Create" },
      { value: "2", label: "Get All Todos" },
      { value: "3", label: "Update" },
      { value: "4", label: "Delete" },
      { value: "5", label: "Exit" },
    ],
  });
  async function processCommand(decisionType) {
    const s = spinner();
    switch (decisionType) {
      case "1":
        let todo = await text({
          message: "What's your todo?",
        });
        console.clear();

        s.start("Adding Todo");
        setTimeout(() => {
          s.stop("Todo added Successfully!!!");
          console.log();
          addTodo(todo);
          main();
        }, 4000);
        break;
      case "2":
        console.clear();
        s.start("Fetching Todos");
        setTimeout(() => {
          s.stop("Fetched Todos Successfully!!");
          console.log();
          getTodos();
          console.log();
          main();
        }, 4000);
        break;
      case "3":
        console.clear();
        let index = await text({
          message: "What's the index U want to complete?",
        });
        s.start("Updating Todo");
        setTimeout(() => {
          s.stop("Updated Todo Successfully!!");
          console.log();
          updateTodo(index - 1);
          console.log();
          main();
        }, 4000);
        break;
      case "4":
        let i = await text({
          message: "What's your index?",
        });
        s.start("Deleting Todo");
        setTimeout(() => {
          s.stop("Deleted Todo Successfully!!");
          console.log();
          deleteTodo(i - 1);
          console.log();
          main();
        }, 4000);

        break;
      case "5":
        console.log("GoodBye, Come Again!");
        break;
      default:
        console.clear();
        break;
    }
  }

  processCommand(decisionType);
}

main().catch(console.error);
