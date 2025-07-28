import { Box, BoxProps, HStack, List } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { LuList, LuGripVertical } from "react-icons/lu";

export const TodoList = ({ ...props }: BoxProps) => {
  const { theme } = useTheme();

  type Todo = {
    id: number;
    text: string;
    completed: boolean;
  };

  // mock data for demonstration purposes
  const todoList = [
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a Todo App", completed: true },
    { id: 3, text: "Deploy to Vercel", completed: false },
  ];

  const [parent, todos] = useDragAndDrop<HTMLUListElement, Todo>(todoList, {
    group: "todoList",
    dragHandle: ".drag-handle",
  });

  const TodoListItem = ({
    todo,
  }: {
    todo: { id: number; text: string; completed: boolean };
  }) => (
    <HStack
      mb={2}
      p={2}
      borderRadius={"md"}
      bg={todo.completed ? "green.100" : "red.100"}
    >
      {todo.text}
    </HStack>
  );

  return (
    <Box
      ref={parent}
      divideX="1"
      borderRadius={"md"}
      bg={theme === "light" ? "white" : "gray.800"}
      boxShadow={"0px 35px 50px -15px rgba(0, 0, 0, 0.5)"}
      {...props}
    >
      {todos.map((todo) => (
        <HStack key={todo.id} mb={2} p={2} borderRadius={"md"}>
          <LuGripVertical className="drag-handle" cursor={'pointer'} />
          {todo.text}
        </HStack>
      ))}
    </Box>
  );
};
