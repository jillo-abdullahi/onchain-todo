import {
  Box,
  BoxProps,
  Button,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "next-themes";
import { LuGripVertical, LuX, LuInbox } from "react-icons/lu";
import { RadioChecked } from "./icons/RadioChecked";
import { RadioUnchecked } from "./icons/RadioUnchecked";
import { Todo } from "../types";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { DragendEvent } from "@formkit/drag-and-drop";
import { CreateTodoInput } from "./CreateTodoInput";
import { TodoEmptyState } from "./TodoEmptyState";
import { RootState } from "../app/store";
import { setTodos, removeTodo, toggleTodo } from "../app/todos/todosSlice";
import { useEffect, useState } from "react";

export const TodoList = ({ ...props }: BoxProps) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const dispatch = useDispatch();
  const todoList = useSelector((state: RootState) => state.todos);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const [parent, todos, _setTodos] = useDragAndDrop<HTMLUListElement, Todo>(
    todoList.todos || [],
    {
      group: "todoList",
      dragHandle: ".drag-handle",
      onDragend: (event: any) => {
        const { values } = event;

        // Update the Redux store with the new order
        dispatch(setTodos(values));
      },
    }
  );

  console.log({ filter });

  useEffect(() => {
    let filteredTodos = todoList.todos;
    console.log("Applying filter:", filter, todoList.todos);

    if (filter === "active") {
      filteredTodos = todoList.todos.filter((todo) => !todo.completed);
    } else if (filter === "completed") {
      filteredTodos = todoList.todos.filter((todo) => todo.completed);
    }

    console.log({ filteredTodos });
    _setTodos(filteredTodos);
  }, [filter]);

  return (
    <>
      <CreateTodoInput mt={12} onCreateTodo={_setTodos} todoList={todos} />
      <Box
        divideY="1px"
        divideStyle={"solid"}
        divideColor={isDarkTheme ? "#393A4B" : "#979797"}
        borderRadius={"md"}
        bg={isDarkTheme ? "gray.800" : "white"}
        boxShadow={"0px 35px 50px -15px rgba(0, 0, 0, 0.5)"}
        {...props}
      >
        {todos.length ? (
          <Box
            ref={parent}
            divideY="1px"
            divideStyle={"solid"}
            divideColor={isDarkTheme ? "#393A4B" : "#979797"}
          >
            {todos.map(({ text, id, completed }) => (
              <HStack
                key={id}
                p={4}
                alignItems={"center"}
                justifyContent="space-between"
              >
                <HStack>
                  <LuGripVertical className="drag-handle" cursor={"pointer"} />
                  <HStack>
                    <IconButton
                      aria-label={
                        completed ? "Mark as incomplete" : "Mark as complete"
                      }
                      variant="ghost"
                      borderRadius={"full"}
                      size="xs"
                      colorScheme={isDarkTheme ? "teal" : "blue"}
                      onClick={() => {
                        const todosUpdated = todoList.todos.map((todo) =>
                          todo.id === id
                            ? { ...todo, completed: !todo.completed }
                            : todo
                        );
                        dispatch(setTodos(todosUpdated));
                        _setTodos(todosUpdated);
                      }}
                    >
                      {completed ? <RadioChecked /> : <RadioUnchecked />}
                    </IconButton>
                    <Text
                      textDecoration={completed ? "line-through" : "none"}
                      fontSize={"18px"}
                    >
                      {text}
                    </Text>
                  </HStack>
                </HStack>
                <IconButton
                  aria-label="Delete todo"
                  rounded={"full"}
                  variant="ghost"
                  size="xs"
                  colorScheme={isDarkTheme ? "red" : "orange"}
                  onClick={() => {
                    _setTodos((prev) => prev.filter((todo) => todo.id !== id));

                    dispatch(removeTodo({ id }));
                  }}
                >
                  <LuX />
                </IconButton>
              </HStack>
            ))}
          </Box>
        ) : (
          <TodoEmptyState />
        )}
        {/* Filters count section desktop view  */}
        <HStack p={3} justifyContent="space-between" alignItems={"center"}>
          <Text fontSize="sm" color={isDarkTheme ? "gray.400" : "gray.600"}>
            {todos.length > 0
              ? todos.filter((todo) => !todo.completed).length
              : 0}{" "}
            items left
          </Text>
          <HStack gap={2} display={{ base: "none", md: "flex" }}>
            <Button
              variant="plain"
              _hover={{
                color: "#3A7CFD",
              }}
              onClick={() => setFilter("all")}
            >
              <Text fontSize="sm">All</Text>
            </Button>
            <Button
              variant="plain"
              _hover={{
                color: "#3A7CFD",
              }}
              onClick={() => {
                setFilter("active");
              }}
            >
              <Text fontSize="sm">Active</Text>
            </Button>
            <Button
              variant="plain"
              _hover={{
                color: "#3A7CFD",
              }}
              onClick={() => setFilter("completed")}
            >
              <Text fontSize="sm">Completed</Text>
            </Button>
          </HStack>
          <Button
            variant="plain"
            p={0}
            _hover={{
              color: "#3A7CFD",
            }}
            onClick={() => {
              _setTodos((prev) => prev.filter((todo) => !todo.completed));
            }}
          >
            <Text fontSize="sm" textAlign={"right"}>
              Clear Completed
            </Text>
          </Button>
        </HStack>
      </Box>

      {/* Filters count section mobile view  */}
      <Box
        mt={4}
        display={{ base: "flex", md: "none" }}
        borderRadius={"md"}
        bg={isDarkTheme ? "gray.800" : "white"}
        boxShadow={"0px 35px 50px -15px rgba(0, 0, 0, 0.5)"}
      >
        <HStack
          gap={2}
          p={3}
          alignItems={"center"}
          justifyContent={"center"}
          w="100%"
        >
          <Button
            variant="plain"
            _hover={{
              color: "#3A7CFD",
            }}
            onClick={() => setFilter("all")}
          >
            <Text fontSize="sm">All</Text>
          </Button>
          <Button
            variant="plain"
            _hover={{
              color: "#3A7CFD",
            }}
            onClick={() => setFilter("active")}
          >
            <Text fontSize="sm">Active</Text>
          </Button>
          <Button
            variant="plain"
            _hover={{
              color: "#3A7CFD",
            }}
            onClick={() => setFilter("completed")}
          >
            <Text fontSize="sm">Completed</Text>
          </Button>
        </HStack>
      </Box>
    </>
  );
};
