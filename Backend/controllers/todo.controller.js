import Todo from "../entities/todo.model.js";

export const createTodo = async (req, res) => {
  const todo = new Todo({
    name: req.body.name,
    completed: req.body.completed,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "Todo Created Successfully !!!", newTodo });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error !!!" });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ message: "Todo Getting Successfully !!!", todos });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Internal Server Error !!!" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Todo Updated Successfully!!!", updatedTodo });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Internal Server Error!!!" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Todo Deleted Successfully!!!" });
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ message: "Error Occuring Deleting : Server Error !!!" });
  }
};
