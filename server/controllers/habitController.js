import Habit from "../models/Habit.js";

export const createHabit = async (
  req,
  res
) => {

  try {

    const {
  title,
  category,
  userId,
} = req.body;

    const habit = await Habit.create({
      title,
      category,
      userId,
    });

    res.status(201).json(habit);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const getHabits = async (
  req,
  res
) => {

  try {

    const userId = req.query.userId;

const habits = await Habit.find({
  userId,
});

    res.json(habits);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const deleteHabit = async (
  req,
  res
) => {

  try {

    await Habit.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Habit Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const toggleHabit = async (
  req,
  res
) => {

  try {

    const habit = await Habit.findById(
      req.params.id
    );

    if (!habit) {

      return res.status(404).json({
        message: "Habit not found",
      });

    }

    habit.completed = !habit.completed;

    if (habit.completed) {

  habit.streak += 1;

  habit.completionDates.push(
    new Date()
  );

}

    await habit.save();

    res.json(habit);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const updateHabit = async (
  req,
  res
) => {

  try {

    const { title, category } = req.body;

    const habit = await Habit.findById(
      req.params.id
    );

    if (!habit) {

      return res.status(404).json({
        message: "Habit not found",
      });

    }

    habit.title = title || habit.title;

    habit.category =
      category || habit.category;

    await habit.save();

    res.json(habit);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};